<template>
  <div class="page">
    <div class="page-container">
      <h1>Виджеты от WotStat</h1>

      <According>
        <template #header>
          <h4>Как добавить виджет в игру</h4>
        </template>
        <template #panel>
          <div class="markdown">
            <InstructionGame />
          </div>
        </template>
      </According>

      <According>
        <template #header>
          <h4>Как добавить виджет в OBS (для стримеров)</h4>
        </template>
        <template #panel>
          <div class="markdown">
            <InstructionOBS />
          </div>
        </template>
      </According>

      <br>

      <CollectionList @on-click-to-widget="onClickToWidget" />
    </div>

    <footer>
      <hr>
      <h4>Основной сайт <a href="https://wotstat.info" target="_blank" rel="noopener noreferrer">wotstat.info</a></h4>
    </footer>
  </div>

  <Teleport to="body" v-if="route.path.includes('/preview')">
    <PopupWindow :title @close="onClose">
      <div class="preview">
        <PreviewPopup @onLoaded="onLoaded" />
      </div>
    </PopupWindow>
  </Teleport>
</template>


<script setup lang="ts">
import According from '@/components/According.vue';
import CollectionList from '../collectionList/Index.vue'
import PreviewPopup from '../previewPopup/Index.vue'
import { VueComponent as InstructionGame } from "./instructionGame.md";
import { VueComponent as InstructionOBS } from "./instructionOBS.md";
import { useRoute, useRouter } from 'vue-router';
import PopupWindow from '@/components/PopupWindow.vue';
import { ref, watchEffect } from 'vue';

const router = useRouter()
const title = ref('')
const route = useRoute()

function onClickToWidget(widget: { route: string, title: string }) {
  router.push('/preview' + widget.route)
  title.value = widget.title
}

function onLoaded(attributes: any) {
  title.value = attributes.title
}

function onClose() {
  router.push('/')
}

watchEffect(() => {
  console.log(route)
})

</script>


<style lang="scss" scoped>
.page {
  background-color: #242424;
  padding: 3em 1em;
  min-height: 100vh;
  color: white;

  .page-container {
    max-width: 1200px;
    margin: auto;
  }

  h1 {
    font-size: 50px;
  }

  h4 {
    margin: 0;
  }

  .markdown {
    :deep(.markdown-alert-important) {
      background-color: #302a32
    }

    :deep(img) {
      border-radius: 0.8em;

      &.add-widget {
        max-width: 550px;
        width: 100%;
        min-width: 0;
      }

      &.widget-compare {
        image-rendering: pixelated;
        width: 100%;
        min-width: 0;

        @media (-webkit-device-pixel-ratio: 1) {
          max-width: 866px;
        }

        @media (-webkit-device-pixel-ratio: 2) {
          max-width: 433px;
        }

        @media (-webkit-device-pixel-ratio: 3) {
          max-width: 288px;
        }
      }
    }
  }

  footer {
    margin-top: 300px;

    a {
      font-weight: 500;
      color: #b9f8ff;
      text-decoration: inherit;
    }

    a:hover {
      color: #65f0ff;
    }

    hr {
      border: none;
      min-height: 1px;
      background-color: rgba(107, 107, 107, 0.24);
    }
  }
}

.preview {
  min-width: 100px;
  max-width: 100%;
  height: 700px;
  position: relative;
}
</style>