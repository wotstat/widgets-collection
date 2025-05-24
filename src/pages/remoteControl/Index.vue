<template>
  <header>
    <h1>WotStat Widgets RC</h1>
    <div class="spacer"></div>
    <div class="line">
      <p>Remote key:</p>
      <input type="text">
      <button>
        <ReloadIcon />
      </button>
    </div>
    <button class="publish" :class="{ 'sending': sending }" @click="publish">Send</button>
  </header>

  <div class="main">

    <div class="inspector">
      <h2>Inspector</h2>
      <Inspector :data="inspector" @change="onChange" />
      {{ overrides }}
    </div>

    <div class="preview">
      <h2>Preview</h2>
      <div class="content">
        <input type="text" class="url" v-model="widgetUrl" placeholder="Enter widget URL" />
        <div class="container" v-if="widgetUrl">
          <iframe :src="widgetUrl" frameborder="0" allowtransparency="true" ref="widgetIframe"></iframe>
        </div>
      </div>
    </div>

  </div>
</template>


<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core';
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { RemoteDebugConnection, useWidgetRemoteDebugConnection } from "@/composition/widgetSdk";
import { useInspector, useRegisteredStates } from './useRegistredStates';
import Inspector from './Inspector/Inspector.vue';
import { Entry } from './Inspector/tree';
import { useQueryStorage } from './useQueryStorage';
import ReloadIcon from '@/assets/icons/reload.svg'


const widgetIframe = ref<HTMLIFrameElement | null>(null);

const widgetUrl = useQueryStorage('widget-url', '', { base64: false, clearOnUnmount: false })
const rdc = useWidgetRemoteDebugConnection(widgetIframe);

const { overrides, inspector, patch } = useInspector(rdc);

function onChange({ path, value }: { path: string[]; value: unknown }) {
  console.log('onChange', path.join('/'), value);
  patch(path.join('/'), value);
}

const sending = ref(false);
async function publish() {
  if (sending.value) return;
  sending.value = true;

  const response = await fetch(`https://widgets-remote.wotstat.info/state?channel=${'demo'}`, {
    method: 'POST',
    body: JSON.stringify(Object.fromEntries(overrides.value.entries()))
  })

  const data = await response.json();
  console.log('send', data);
  sending.value = false;
}



</script>


<style lang="scss" scoped>
$header-height: 50px;

header {
  width: 100%;
  display: flex;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  height: $header-height;
  padding: 0 10px;

  .spacer {
    flex: 1;
  }

  .line {
    display: flex;

    p {
      margin-right: 5px;
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
  background-color: rgba(124, 154, 255, 0.2);

  display: flex;

  .inspector {
    width: 30%;
    max-width: 300px;
    padding: 10px;
  }

  .preview {
    flex: 1;
    background-color: rgba(216, 255, 212, 0.2);
    display: flex;
    flex-direction: column;

    .content {
      width: 100%;
      flex: 1;
      background-color: rgba(58, 35, 190, 0.2);

      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;

      .url {
        min-width: 100px;
        max-width: 400px;
        margin-bottom: 10px;
        height: 40px;
        border-radius: 20px;
        font-size: 16px;
        padding: 10px 15px;
        field-sizing: content;
      }

      .container {
        background-color: rgba(255, 212, 221, 0.2);
        border: solid 5px rgba(255, 0, 0, 0.5);
        resize: both;
        position: relative;

        height: 200px;
        max-width: 2000px;
        max-height: 100%;
        overflow: hidden;
        resize: both;
        padding: 10px;
        border-radius: 10px;

        iframe {
          width: 100%;
          height: 100%;
          border: none;
          border: dashed 1px rgba(255, 255, 255, 0.5);
        }
      }
    }
  }
}
</style>