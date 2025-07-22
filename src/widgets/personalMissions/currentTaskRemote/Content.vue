<template>
  <DefineGroup v-slot="{ tasks }">
    <div class="container-header">
      <div class="badge" v-if="tasks.some(t => !t.config.isMain)">С отличием</div>
      <div class="badge" v-for="task in tasks.filter(t => t.description.containerType === 'header')"
        v-html="task.description.description"></div>
    </div>

    <div class="task" v-for="task in tasks.filter(t => t.description.containerType === 'body')">
      <div class="image-container" v-if="task.description.iconID">
        <img :src="imageByKeys.get(task.description.iconID)">
      </div>
      <div class="content">
        <div class="flex">
          <h3 v-html="task.description.title"></h3>
          <h3 class="badge" v-if="task.description.description.match(perBattle)">За бой</h3>
        </div>
        <p v-html="task.description.description.replaceAll(perBattle, '')"></p>
      </div>
    </div>
  </DefineGroup>

  <div class="main" :class="{
    animated, 'colorize-icon': colorizeIcon,
    [`background-scheme-${props.styleParams.backgroundScheme}`]: true,
    [`header-mode-${props.styleParams.headerMode}`]: true
  }" :style="{
    '--accent': '#' + props.styleParams.accent,
    '--badge': '#' + props.styleParams.badge,
    '--badge-text': '#' + props.styleParams.badgeText,
    '--color-from': `#${props.styleParams.backColorFrom}`,
    '--color-to': `#${props.styleParams.backColorTo}`
  }">
    <div class="background" :style="{ '--task-height': `${tasksHeight}px` }"></div>

    <div class="header">
      <h1>{{ header.title }}</h1>
      <h2>{{ header.subtitle }}</h2>
      <div class="levels wg-font">
        {{ roman(header.levels[0]) }} - {{ roman(header.levels[1]) }}
      </div>
    </div>

    <div class="content" :style="{
      height: enterHeight > 0 ? Math.max(leaveHeight, enterHeight) + 'px' : 'auto',
    }">
      <div class="content-mask" :style="{ height: `calc(${tasksHeight}px)` }">
        <Transition @enter="t => enterHeight = t.clientHeight" @before-leave="t => leaveHeight = t.clientHeight"
          @after-leave="() => { enterHeight = -1; animated = false }" @before-enter="() => { animated = true }">
          <div class="tasks" :key="header.title" ref="tasksElement">
            <template v-for="(group, i) in tasks.filter(g => g.length > 0)">
              <div class="group">
                <Group :tasks="Object.values(group)" />
              </div>
              <div class="separator"></div>
            </template>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue';
import { Props } from './define.widget';
import { createReusableTemplate, useElementBounding } from '@vueuse/core';
import { roman } from '@/utils/romanNumbers';


const leaveHeight = ref(0);
const enterHeight = ref(-1);
const animated = ref(false)

const tasksElement = ref<HTMLElement | null>(null);
const { height: tasksHeight } = useElementBounding(tasksElement);

const perBattle = /,?\s?за бой/g

const props = defineProps<Props>()

const [DefineGroup, Group] = createReusableTemplate<{ tasks: Props['tasks'][number] }>()

const images = import.meta.glob<string>('../assets/battleConditions/*.png', { eager: true, import: 'default' });
const imageByKeys = new Map<string, string>(Object.entries(images).map(([key, value]) => {
  const imageKey = key.split('/').pop()?.replace('.png', '') ?? '';
  return [imageKey, value];
}));

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.5em;
  line-height: 1.2;
  border-radius: 1em;

  overflow: hidden;
  position: relative;

  .background {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    z-index: -1;
    border-radius: 1em;
    height: calc(var(--task-height) + 5.1em);

    background: linear-gradient(180deg, rgba(24, 24, 24, 0.8) 0%, rgba(24, 24, 24, 0.3) 100%);
  }

  &.background-scheme-color .background {
    background: var(--wotstat-background, #fff);
  }

  &.background-scheme-gradient .background {
    background: linear-gradient(180deg, var(--color-from) 0%, var(--color-to) 100%);
  }


  .header {
    padding: 1em;
    position: relative;

    h1 {
      font-size: 2em;
      line-height: 1;
      margin-bottom: 0.1em;
    }

    h2 {
      font-weight: normal;
      font-size: 0.8em;
    }

    .levels {
      position: absolute;
      top: 1em;
      right: 1em;
      border: 0.1em solid rgba(255, 255, 255, 0.3);
      border-radius: 1em;
      padding: 0.2em 0.5em;
      font-size: 0.7em;
    }
  }

  &.header-mode-full {
    .background {
      height: calc(var(--task-height) + 5.1em);
    }
  }

  &.header-mode-compact {
    .background {
      height: calc(var(--task-height) + 2.6em);
    }

    .header {
      padding: 0.7em;
      padding-bottom: 0.7em;

      h1 {
        font-size: 1.3em;
        margin-bottom: 0;
        margin-left: 0.4em;
      }

      h2 {
        display: none;
      }

      .levels {
        top: 1em;
        right: 1em;
      }
    }
  }

  &.header-mode-hide {
    padding-top: 1em;

    .background {
      height: calc(var(--task-height) + 1em);
    }

    .header {
      display: none;
    }
  }


  .content-mask {
    overflow: hidden;
    position: relative;
  }

  .tasks {
    padding: 1em;
    padding-top: 0;
    display: flex;
    flex-direction: column;

    .separator {
      height: 0.1em;
      border-radius: 1em;
      background-color: rgba(255, 255, 255, 0.3);
      margin: 0.5em 0;

      &:last-child {
        display: none;
      }
    }

    .group {
      display: flex;
      flex-direction: column;
      gap: 1em;

      .container-header {
        display: flex;
        justify-content: start;
        gap: 0.3em;
        margin-bottom: -0.5em;

        &:not(:has(:nth-child(n+1))) {
          display: none;
        }
      }

      .task {
        display: flex;
        margin-left: -1em;

        .image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.5em;
          min-width: 3em;
          max-width: 3em;

          img {
            height: 3.5em;
            margin: -1em -0.2em;
            pointer-events: none;
          }
        }

        h3 {
          margin-bottom: 0.2em;
          font-size: 0.75em;
          color: var(--accent, #fff);
        }

        p {
          font-size: 0.75em;
          color: rgb(215, 215, 215);
        }

        .badge {
          padding: 0.1em 0.5em;
          font-size: 0.6em;
          margin-left: 0.5em;
          color: var(--badge-text, #fff);
        }
      }
    }
  }

  .badge {
    background-color: var(--badge, #000);
    color: var(--badge-text, #fff);
    padding: 0.2em 0.5em;
    border-radius: 1em;
    font-size: 0.7em;

    :deep(b) {
      font-size: 1em;
      font-weight: normal;
      color: currentColor;
    }

  }

  :deep(b) {
    font-size: 1.1em;
    line-height: 0;
    color: var(--accent, #fff);
  }

  &.colorize-icon {
    .image-container {
      filter: drop-shadow(0px 200em 0 var(--accent, #fff));
      transform: translateY(-199.98em);
    }
  }

  &.animated {

    .content-mask {
      transition: height 0.5s ease-in-out;
    }

    .background {
      transition: height 0.5s ease-in-out;
    }
  }



  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease-in-out;
    position: absolute;
  }

  .v-enter-from {
    opacity: 0;
    transform: translateX(20em);
  }

  .v-leave-to {
    opacity: 0;
    transform: translateX(-20em);
  }

}
</style>