<template>
  <div class="page">
    <header class="overlay-color">
      <h1>WotStat Widgets RC</h1>
      <div class="spacer"></div>
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
        <Inspector :data="inspector" @change="onChange" />
      </div>

      <div class="preview">
        <div class="content">
          <div class="top">
            <input type="text" class="url" v-model="widgetUrl" placeholder="Enter widget URL" />
            <button class="copy" v-if="widgetUrl" @click="copyUrl">
              <CopyIcon />
            </button>
          </div>

          <div class="container" v-if="widgetUrl" ref="resizeContainer">
            <iframe :src="iframeUrl" frameborder="0" allowtransparency="true" ref="widgetIframe" :style="{
              width: `${100 / scale}%`,
              height: `${100 / scale}%`,
              transform: `scale(${scale})`,
              transformOrigin: 'top left'
            }"></iframe>
          </div>

          <p class="info-text" v-if="!widgetUrl">Введите URL до виджета которым хотите управлять. Это не обязательно
            должен быть виджет WotStat, достаточно использовать <a
              href="https://www.npmjs.com/package/wotstat-widgets-sdk" target="_blank">wotstat-widgets-sdk</a></p>

          <div class="bottom" v-if="widgetUrl">

            <div class="scale">
              <select v-model="scale">
                <option :value="1">100%</option>
                <option :value="0.75">75%</option>
                <option :value="0.50">50%</option>
                <option :value="0.25">25%</option>
              </select>
            </div>

            <div class="size">
              <input type="text" inputmode="numeric" placeholder="Width" v-model.number="targetWidth" />
              <span>x</span>
              <input type="text" inputmode="numeric" placeholder="Height" v-model.number="targetHeight" />
            </div>

            <div class="empty" :style="{ width: '65px' }"></div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>


<script setup lang="ts">
import { computedAsync, computedWithControl, useDebounce, useDebounceFn, useElementSize, useLocalStorage, useResizeObserver } from '@vueuse/core';
import { computed, nextTick, onMounted, onUnmounted, ref, watch, watchEffect } from 'vue';
import { RemoteDebugConnection, useWidgetRemoteDebugConnection } from "@/composition/widgetSdk";
import { useInspector, useRegisteredStates } from './useRegistredStates';
import Inspector from './Inspector/Inspector.vue';
import { Entry } from './Inspector/tree';
import { useQueryStorage } from './useQueryStorage';
import ReloadIcon from '@/assets/icons/reload.svg'
import CopyIcon from '@/assets/icons/copy.svg'


const widgetIframe = ref<HTMLIFrameElement | null>(null);
const resizeContainer = ref<HTMLDivElement | null>(null);
const passwordInput = ref<HTMLInputElement | null>(null);

const widgetUrl = useQueryStorage('widget-url', '', { base64: true })
const privateKey = useQueryStorage('private-key', '');
const containerWidth = useQueryStorage('width', 400);
const containerHeight = useQueryStorage('height', 400);
const scale = useQueryStorage('scale', 1);

if (privateKey.value == '') generateNewKey();

const rdc = useWidgetRemoteDebugConnection(widgetIframe);

const channelKey = computedAsync(async () => {
  const encoder = new TextEncoder();
  const data = encoder.encode(privateKey.value);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  const base64String = btoa(String.fromCharCode(...hashArray));
  return base64String.replace(/[^a-zA-Z0-9]/g, '').substring(0, 10);
})
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

const { overrides, inspector, patch, remote } = useInspector(rdc, () => channelKey.value ?? '');

function onChange({ path, value }: { path: string[]; value: unknown }) {
  patch(path.join('/'), value);
}

const sending = ref(false);
async function publish() {
  if (sending.value) return;
  sending.value = true;

  try {
    const response = await fetch(`https://widgets-remote.wotstat.info/state?private-key=${privateKey.value}`, {
      method: 'POST',
      body: JSON.stringify(Object.fromEntries(overrides.value.entries()))
    })

    const data = await response.json();
  }
  catch (error) {
    alert('Error sending data: ' + error);
    console.error('Error sending data:', error);
  }

  sending.value = false;
}

function generateNewKey() {
  privateKey.value = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 6);
}

watchEffect(() => {
  if (!widgetUrl.value || !debounceChannelKey.value) return;

  const url = new URL(widgetUrl.value, window.location.href);
  url.searchParams.set('remote-key', debounceChannelKey.value);
  widgetUrl.value = url.toString();
})

function copyUrl() {
  navigator.clipboard.writeText(widgetUrl.value)
}

const setContainerSize = useDebounceFn((width: number, height: number) => {
  containerHeight.value = height;
  setTimeout(() => containerWidth.value = width, 0)
}, 100)


let firstResize = true;
useResizeObserver(resizeContainer, (entries) => {
  if (!entries.length) return;

  const { width, height } = entries[0].contentRect;
  if (firstResize) {
    firstResize = false;
    targetWidth.value = containerWidth.value / scale.value;
    targetHeight.value = containerHeight.value / scale.value;;
  } else {
    setContainerSize(width, height);
  }
});

const { width: containerWidthRef, height: containerHeightRef } = useElementSize(resizeContainer);

const targetWidth = computed({
  get: () => Math.round(containerWidthRef.value / scale.value),
  set: (value) => {
    if (resizeContainer.value) resizeContainer.value.style.width = `${value * scale.value}px`;
  }
})

const targetHeight = computed({
  get: () => Math.round(containerHeightRef.value / scale.value),
  set: (value) => {
    if (resizeContainer.value) resizeContainer.value.style.height = `${value * scale.value}px`;
  }
})

</script>


<style lang="scss" scoped>
$header-height: 50px;

.page {
  background-color: #1d1d1d;
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

  .spacer {
    flex: 1;
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
      background: field;

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
    margin-left: 10px;
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
    width: 30%;
    max-width: 310px;
    padding: 10px;
    border-radius: 15px;
    margin: 10px;

    h2 {
      font-size: 20px;
      margin-bottom: 10px;
    }
  }

  .preview {
    flex: 1;
    display: flex;
    flex-direction: column;

    button {
      background: field;

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
      }

      .bottom {
        display: flex;
        margin-top: 10px;
        gap: 10px;

        .size {
          background: field;
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
          background: field;
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
      }

      .info-text {
        max-width: 400px;
        text-align: center;
      }

      .container {
        border: solid 5px rgba(255, 255, 255, 0.2);
        resize: both;
        position: relative;
        box-sizing: content-box;

        max-width: 2000px;
        max-height: 100%;
        overflow: hidden;
        resize: both;
        // padding: 5px;
        border-radius: 10px;

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          // border: dashed 1px rgba(255, 255, 255, 0.5);
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