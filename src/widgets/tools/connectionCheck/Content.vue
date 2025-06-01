<template>
  <div class="main">
    <WidgetCard>
      <div class="secondary">
        <div class="line" :class="props.web">
          <p>widget</p>
          <div class="status"></div>
        </div>

        <div class="line" :class="props.database">
          <p>database</p>
          <div class="status"></div>
        </div>

        <div class="line" :class="props.dataProvider">
          <p>data-provider</p>
          <span class="version" v-if="props.dataProviderVersion != null">v{{ props.dataProviderVersion }}</span>
          <div class="status"></div>
        </div>

        <div class="line" :class="props.relay">
          <p>relay</p>
          <div class="status"></div>
        </div>

        <div class="line" :class="props.remote">
          <p>remote</p>
          <div class="status"></div>
        </div>
      </div>
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';

import { Props } from './define.widget'

const props = defineProps<Props>()


</script>


<style lang="scss" scoped>
.main {
  font-size: 2em;

  .secondary {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .line {
    display: flex;
    align-items: baseline;

    p {
      line-height: 1;
      flex: 1;
    }

    .version {
      line-height: 1;
      font-size: 0.6em;
      margin-right: -0.3em;
      transform: translateY(-0.08em);
    }

    .status {
      width: 0.5em;
      height: 0.5em;
      border-radius: 50%;
      margin-left: 0.5em;
      background-color: rgb(103, 103, 103);
    }

    &.connected {
      .status {
        background-color: rgb(54, 237, 57);
      }
    }

    &.connecting {
      .status {
        background-color: rgb(247, 159, 26);
      }
    }

    &.disconnected {
      .status {
        background-color: rgb(237, 54, 54);
      }
    }
  }
}
</style>