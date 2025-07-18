<template>
  <div class="page">
    <header class="overlay-color">
      <h1>WotStat Widgets RC</h1>
      <div class="spacer"></div>
      <div class="changes-count" v-if="overrides.size > 0" :overridesCount="overrides.size"></div>
      <div class="remote-status" :class="remoteStatus" :remoteStatus="remoteStatus"></div>
      <div class="line" @mouseover="passwordInput!.type = 'text'" @mouseleave="passwordInput!.type = 'password'">
        <p>Remote key:</p>
        <input type="password" ref="passwordInput" v-model="privateKey">
        <button @click="generateNewKey">
          <ReloadIcon />
        </button>
      </div>
      <button class="publish" :class="{ 'sending': sending }" @click="publish">
        <p class="loader" v-if="sending"></p>
        <p v-else>Send</p>
      </button>
    </header>

    <div class="main">

      <div class="inspector overlay-color">
        <h2>Inspector</h2>
        <div class="inspector-select" :class="currentInspector">
          <button @click="currentInspector = 'remote'" v-if="remoteIsConnected" class="remote">Remote</button>
          <button @click="currentInspector = 'relay'" v-if="relayIsConnected" class="relay">Relay</button>
          <button @click="currentInspector = 'sdk'" v-if="sdkIsConnected" class="sdk">Sdk</button>
        </div>
        <div class="inspector-content nice-scrollbar">
          <RemoteInspector v-if="remoteDebug && remoteIsConnected" :patch="patch" :data="inspector"
            v-show="currentInspector == 'remote'" @change:over-element="t => hoveredPath = t" />
          <SdkInspector v-if="sdkDebug && sdkIsConnected" :debug="sdkDebug" v-show="currentInspector == 'sdk'" />
          <RelayInspector v-if="relayDebug && relayIsConnected" :debug="relayDebug"
            v-show="currentInspector == 'relay'" />
        </div>
      </div>

      <div class="preview">
        <div class="content">
          <div class="top" :class="{ 'copy-highlight': copyHighlight }">
            <input type="text" class="url" v-model="widgetUrl" placeholder="Enter widget URL" />
            <button class="copy" v-if="widgetUrl" @click="copyUrl">
              <CopyIcon />
            </button>
          </div>

          <div class="container" v-if="widgetUrl" ref="resizeContainer" :style="{
            width: `${targetWidth * scale}px`,
            height: `${targetHeight * scale}px`,
          }">
            <iframe :src="iframeUrl" :key="iframeUrl" frameborder="0" allowtransparency="true" ref="widgetIframe"
              :style="{
                width: `${100 / scale}%`,
                height: `${100 / scale}%`,
                transform: `scale(${scale})`,
                transformOrigin: 'top left',
                colorScheme: 'dark',
              }" :class="{
                'dragging': isDragging,
              }"></iframe>

            <div class="bbox-rect" v-if="hoveredBbox" :style="{
              left: `${hoveredBbox.x * scale - 5}px`,
              top: `${hoveredBbox.y * scale - 5}px`,
              width: `${hoveredBbox.width * scale + 10}px`,
              height: `${hoveredBbox.height * scale + 10}px`
            }"></div>

            <div class="resize-handle" @pointerdown.stop="onPointerHandlerDown"></div>
          </div>

          <p class="info-text" v-if="!widgetUrl">Введите URL до виджета которым хотите управлять. Это не обязательно
            должен быть виджет WotStat, достаточно использовать <a
              href="https://www.npmjs.com/package/wotstat-widgets-sdk" target="_blank">wotstat-widgets-sdk</a></p>

          <div class="bottom" v-if="widgetUrl">

            <div class="scale">
              <Select v-model="scale" :variants="[
                { value: 1, label: '100%' },
                { value: 0.75, label: '75%' },
                { value: 0.50, label: '50%' },
                { value: 0.25, label: '25%' },
              ]" :offset-x="2.5" />
            </div>

            <div class="size">
              <input type="text" inputmode="numeric" placeholder="Width" v-model.number="targetWidth" />
              <span>x</span>
              <input type="text" inputmode="numeric" placeholder="Height" v-model.number="targetHeight" />
            </div>

            <div class="presets">
              <button @click="setPreset('720p')">720p</button>
              <button @click="setPreset('1080p')">1080p</button>
              <button @click="setPreset('1440p')">1440p</button>
              <button @click="setPreset('2160p')">2160p</button>
            </div>

          </div>
        </div>
      </div>

    </div>

    <ContextMenuRoot />
  </div>
</template>


<script setup lang="ts">
import { computedAsync, useDebounce, useDebounceFn, useElementSize, useEventListener, useResizeObserver, watchOnce } from '@vueuse/core';
import { computed, ref, watch, watchEffect } from 'vue';
import { useWidgetRelayDebugConnection, useWidgetRemoteDebugConnection, useWidgetSdkDebugConnection } from "@/composition/widgetSdk";
import { useRemoteInspector } from './useRegistredStates';
import { useQueryStorage } from './useQueryStorage';
import ReloadIcon from '@/assets/icons/reload.svg'
import CopyIcon from '@/assets/icons/copy.svg'
import SdkInspector from './sdkInspector/SdkInspector.vue';
import RemoteInspector from './RemoteInspector.vue';
import RelayInspector from './RelayInspector.vue';
import ContextMenuRoot from '@/components/contextMenu/ContextMenuRoot.vue';
import Select from '@/components/Select.vue';
import { channelKey as generatePublicKey } from './channelKey';



const widgetIframe = ref<HTMLIFrameElement | null>(null);
const resizeContainer = ref<HTMLDivElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const widgetUrl = useQueryStorage('widget-url', '', { base64: true, history: 'push', debounceMs: 500 })
const privateKey = useQueryStorage('private-key', '');
const containerWidth = useQueryStorage('width', 400);
const containerHeight = useQueryStorage('height', 400);
const scale = useQueryStorage('scale', 1);

const currentInspector = ref<'remote' | 'sdk' | 'relay'>('remote');


const { debug: remoteDebug, isConnected: remoteIsConnected, bbox } = useWidgetRemoteDebugConnection(widgetIframe);
const { debug: sdkDebug, isConnected: sdkIsConnected } = useWidgetSdkDebugConnection(widgetIframe)
const { debug: relayDebug, isConnected: relayIsConnected } = useWidgetRelayDebugConnection(widgetIframe)

const hoveredPath = ref<string | null>(null);
const hoveredBbox = computed(() => {
  if (!hoveredPath.value || !remoteDebug.value) return null;
  return bbox.value?.get(hoveredPath.value) ?? null;
})

watchEffect(() => {
  const tabs = [remoteIsConnected, relayIsConnected, sdkIsConnected]
  const targets = ['remote', 'relay', 'sdk'] as const;

  if (!tabs[targets.indexOf(currentInspector.value)].value) {
    currentInspector.value = targets[tabs.findIndex(tab => tab.value)] ?? 'remote';
  }
})


const channelKey = computedAsync(async () => await generatePublicKey(privateKey.value))
const debounceChannelKey = useDebounce(channelKey, 500);

const iframeUrl = computed(() => {
  if (!widgetUrl.value) return '';
  if (widgetUrl.value.includes('remote-key=')) {
    const url = new URL(widgetUrl.value, window.location.href);
    url.searchParams.delete('remote-key');
    return url.toString();
  }
  return widgetUrl.value;
});

const { overrides, inspector, patch, sending, publish, remoteStatus } = useRemoteInspector(remoteDebug, () => channelKey.value ?? '', () => privateKey.value ?? '');

useEventListener(window, 'keypress', (event: KeyboardEvent) => {
  if (event.code === 'Enter' && event.ctrlKey && !sending.value) {
    event.preventDefault();
    event.stopPropagation();
    publish();
  }
});


if (privateKey.value == '') generateNewKey();
function generateNewKey() {
  privateKey.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 6);
}

watchEffect(() => {
  if (!widgetUrl.value || !debounceChannelKey.value) return;

  const url = new URL(widgetUrl.value, window.location.href);
  url.searchParams.set('remote-key', debounceChannelKey.value);
  widgetUrl.value = url.toString();
})

const copyHighlight = ref(false);
function copyUrl() {
  navigator.clipboard.writeText(widgetUrl.value)
  copyHighlight.value = true;
  setTimeout(() => copyHighlight.value = false, 300);
}

const setContainerSize = useDebounceFn((width: number, height: number) => {
  containerHeight.value = height;
  setTimeout(() => containerWidth.value = width, 0)
}, 100)

const targetWidth = ref(containerWidth.value);
const targetHeight = ref(containerHeight.value);

useEventListener(window, 'popstate', () => {
  targetWidth.value = containerWidth.value;
  targetHeight.value = containerHeight.value;
});

const isDragging = ref(false);
useEventListener(window, 'pointermove', onHandlerMove);
useEventListener(window, 'pointerup', () => isDragging.value = false);
function onPointerHandlerDown(event: PointerEvent) {
  isDragging.value = true;
}

function onHandlerMove(event: PointerEvent) {
  if (!resizeContainer.value) return;
  if (!isDragging.value) return;

  event.stopPropagation();
  event.preventDefault();

  const rect = resizeContainer.value.getBoundingClientRect();
  const newWidth = Math.max(100, event.clientX - rect.left);
  const newHeight = Math.max(100, event.clientY - rect.top);
  targetWidth.value = Math.round(newWidth) / scale.value;
  targetHeight.value = Math.round(newHeight) / scale.value;
}

function setPreset(preset: '720p' | '1080p' | '1440p' | '2160p') {
  switch (preset) {
    case '720p':
      targetWidth.value = 1280;
      targetHeight.value = 720;
      break;
    case '1080p':
      targetWidth.value = 1920;
      targetHeight.value = 1080;
      break;
    case '1440p':
      targetWidth.value = 2560;
      targetHeight.value = 1440;
      break;
    case '2160p':
      targetWidth.value = 3840;
      targetHeight.value = 2160;
      break;
  }

  const w = targetWidth.value;
  const h = targetHeight.value;
  const maxWidth = window.innerWidth - 300;
  const maxHeight = window.innerHeight - 100;

  let targetMaxScale = 1;

  if (w > maxWidth || h > maxHeight) {
    targetMaxScale = Math.min(maxWidth / w, maxHeight / h);
  }

  const nearestLessScale = [1, 0.75, 0.5, 0.25].find(s => s <= targetMaxScale) ?? 1;
  scale.value = nearestLessScale;
}

watch(() => [targetWidth.value, targetHeight.value], ([width, height]) => setContainerSize(width, height));

</script>


<style lang="scss" scoped>
@use './inspectorStyle.scss' as inspectorStyle;
$header-height: 50px;

.page {
  background-color: #1d1d1d;
  color: white;
}

.overlay-color {
  background-color: rgb(255, 255, 255, 0.07);
}

header {
  width: 100%;
  display: flex;
  align-items: center;
  height: $header-height;
  padding: 0 10px 0 13px;
  gap: 10px;

  .spacer {
    flex: 1;
  }

  .changes-count,
  .remote-status {
    width: 10px;
    height: 10px;
    border-radius: 100px;

    &:hover {
      position: relative;

      &::after {
        content: attr(remoteStatus);
        position: absolute;
        top: 20px;
        left: -10px;
        background-color: rgb(45, 45, 45);
        border: solid 1px rgba(255, 255, 255, 0.2);
        padding: 2px 5px;
        border-radius: 5px;
        font-size: 12px;
        text-wrap: nowrap;
        white-space: nowrap;
      }
    }
  }

  .changes-count {
    background-color: #53a3ff;

    &:hover {
      &::after {
        content: 'overrides: ' attr(overridesCount);
      }
    }
  }

  .remote-status {

    &.connected {
      background-color: #59d05d;
    }

    &.disconnected {
      background-color: #f44336;
    }

    &.connecting {
      background-color: #ff9800;
    }
  }

  .line {
    display: flex;
    height: 100%;
    align-items: center;

    p {
      margin-right: 5px;
    }

    input {
      text-decoration: dashed;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      border-radius: 5px;
      margin-left: 3px;
      cursor: pointer;
      border-bottom: solid 1px rgba(129, 129, 129, 0.2431372549);
      background: rgb(59, 59, 59);

      width: 26.5px;
      height: 26.5px;
      padding: 0;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }

      svg {
        display: block;
      }

      svg {
        width: 15px;
        height: 15px;
        margin-bottom: -10%;
      }
    }
  }

  button.publish {
    width: 55px;
    background-color: #4c8cff;
    border: none;
    padding: 6px 10px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;

    &:hover {
      background-color: #3a6bbf;
    }

    &.sending {
      background-color: #3a6bbf;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
}

.main {
  width: 100%;
  height: calc(100vh - $header-height);

  display: flex;

  .inspector {
    width: 310px;
    min-width: 310px;
    padding: 10px;
    border-radius: 15px;
    margin: 10px;
    display: flex;
    flex-direction: column;

    h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }

    .inspector-select {
      display: flex;
      gap: 5px;
      margin-bottom: 10px;

      button {
        flex: 1;
        border: none;
        border-radius: 8px;
        height: 30px;
        cursor: pointer;
        transition: all 0.2s ease;
        background-color: rgb(59, 59, 59);
      }

      input {
        background-color: rgb(59, 59, 59);
      }

      &.sdk>.sdk,
      &.remote>.remote,
      &.relay>.relay {
        background-color: #4c8cff;
        color: white;
        flex: 2;
        font-weight: 600;
      }
    }

    .inspector-content {
      margin: 0 -5px;
      padding: 0 5px;
      overflow-y: auto;
      overflow-x: visible;
      min-height: 0;
    }

    :deep() {
      @include inspectorStyle.inspector-style;
    }
  }

  .preview {
    flex: 1;
    display: flex;
    flex-direction: column;

    button {
      background: rgb(59, 59, 59);

      &:hover {
        background-color: #464646;
      }

    }

    .content {
      width: 100%;
      flex: 1;

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      overflow: hidden;

      .top {
        display: flex;
        gap: 5px;
        margin-bottom: 10px;

        .url {
          min-width: 100px;
          max-width: 400px;
          height: 40px;
          border-radius: 20px;
          font-size: 16px;
          padding: 10px 15px;
          field-sizing: content;
        }

        .copy {
          width: 40px;
          height: 40px;
          border-radius: 100px;
          border: none;
          padding: 11px;
          cursor: pointer;

          svg {
            display: block;
          }
        }

        .url {
          transition: background-color 0.15s ease;
        }

        &.copy-highlight {
          .url {
            background-color: #30D158;
          }
        }
      }

      .bottom {
        display: flex;
        margin-top: 10px;
        gap: 10px;

        .size {
          background: rgb(59, 59, 59);
          border-radius: 50px;

          input {
            padding: 10px 15px;
            background: transparent;
            border: none;
            width: 55px;
            font-size: 16px;
            height: 40px;
          }

          span {
            font-size: 12px;
          }

          input:first-child {
            text-align: right;
            padding-right: 3px;
          }

          input:last-child {
            text-align: left;
            padding-left: 3px;
          }
        }

        .scale {
          background: rgb(59, 59, 59);
          border-radius: 50px;

          select {
            background: transparent;
            padding: 10px 0px 10px 5px;
            margin-right: 5px;
            width: 65px;
            font-size: 16px;
            border: none;
            text-align: right;
          }
        }

        .presets {

          background: rgb(59, 59, 59);
          border-radius: 50px;
          display: flex;

          button {
            padding: 0 10px;
            margin: 0 -3px;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            font-size: 16px;

            background-color: transparent;


            &:hover {
              background-color: rgba(255, 255, 255, 0.05);
            }

            &:first-child {
              margin-left: 0;
            }

            &:last-child {
              margin-right: 0;
            }
          }
        }
      }

      .info-text {
        max-width: 400px;
        text-align: center;
      }

      .container {
        border: solid 5px rgba(255, 255, 255, 0.2);
        position: relative;
        box-sizing: content-box;

        max-width: 2000px;
        max-height: 100%;
        border-radius: 10px;

        .bbox-rect {
          position: absolute;
          border: solid 2px #4c8cff;
          border-radius: 5px;
          pointer-events: none;
          user-select: none;
          z-index: 1000;
        }

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          user-select: none;
          overflow: hidden;

          &.dragging {
            pointer-events: none;
          }
        }

        .resize-handle {
          position: absolute;
          right: -5px;
          bottom: -5px;
          width: 20px;
          height: 20px;
          cursor: se-resize;
          border-bottom-right-radius: 10px;

          border-right: solid 5px rgba(255, 255, 255, 1);
          border-bottom: solid 5px rgba(255, 255, 255, 1);
          z-index: 2000;
        }
      }
    }
  }
}

.loader {
  width: 34.23px;
  height: 16px;
  --_g: no-repeat radial-gradient(circle closest-side, #ffffff 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 45%;
  animation: l3 1s infinite linear;
  margin: auto;
}

@keyframes l3 {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%
  }

  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%
  }

  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%
  }

  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%
  }
}
</style>