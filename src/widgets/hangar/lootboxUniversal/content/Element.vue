<template>
  <div class="container mini-card">
    <p class="long-title secondary-color">
      {{ title }}
    </p>
    <div class="horizontal">
      <div class="icon">
        <img :src="icon" alt="" />
        <img v-if="overlayIcon" class="overlay-icon" :src="overlayIcon" alt="" />
      </div>
      <div class="content">
        <p class="title secondary-color">
          {{ title }}
        </p>
        <p class="count nowrap">
          <TweenValue :value="value" :processor="logProcessor" />
        </p>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import TweenValue from '@/components/TweenValue.vue';
import { logProcessor } from './utils';

const props = defineProps<{
  title: string,
  value: number,
  icon: string,
  overlayIcon?: string,
}>()

</script>


<style lang="scss" scoped>
.secondary-color {
  color: #ffffffb6;
}

.container {
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 100%;
  overflow: hidden;

  .horizontal {
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 0.3em;
    justify-content: space-between;
    width: 100%;
  }

  .title,
  .long-title {
    font-size: 1.2em;
    text-align: left;
    line-height: 1.2;
    margin: -0.1em 0;
  }

  .long-title {
    display: none;
    margin-bottom: 0.3em;
  }

  .title {
    font-size: 1.2em;
    margin-top: -0.2em;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .count {
    font-size: 3.2em;
    font-weight: 800;
  }

  .icon {
    height: 4em;
    margin: -0.6em;
    margin-left: -0.2em;
    position: relative;

    img {
      height: 100%;
    }

    .overlay-icon {
      position: absolute;
      inset: 0;
      width: 100%;
      object-fit: contain;
    }
  }

}

.container {
  &.small {
    .long-title {
      display: none;
    }

    .icon {
      height: 2.4em;
    }

    .title {
      display: none;
    }

    .count {
      font-size: 1.8em;
      line-height: 0.8;
    }
  }

  &.medium {
    .content {
      max-width: unset;
    }

    .icon {
      height: 2.7em;
      margin: -1em;
      margin-left: -0.4em;
    }

    .title {
      display: none;
    }

    .count {
      font-size: 1.8em;
      line-height: 0.8;
    }

    .long-title {
      display: block;
      font-size: 1em;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      margin-top: -0.6em;
      margin-bottom: 0.6em;
    }
  }

  &.big {
    .content {
      max-width: 75%;
    }

    .icon {
      height: 4em;
      margin-left: -0.2em;
    }

    .count {
      font-size: 2em;
    }
  }

  &.large {
    .content {
      max-width: 70%;
    }

    .icon {
      height: 4.6em;
    }

    .count {
      font-size: 2.4em;
    }

    .title {
      font-size: 1.2em;
      display: block;
    }

    .long-title {
      display: none;
    }
  }

  &.extra {
    .icon {
      height: 4em;
    }

    .title {
      display: none;
    }

    .long-title {
      display: block;
      font-size: 1.5em;
      margin-bottom: 0.6em;
    }
  }
}
</style>