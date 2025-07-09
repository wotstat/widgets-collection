<template>
  <div class="main">
    <div class="header">
      <h1>{{ header.title }}</h1>
      <h2>{{ subtitle }}</h2>
    </div>

    <hr>

    <div class="tasks">
      <div class="task" v-for="task in tasks">
        <div class="image-container" v-if="task.description.iconID">
          <img :src="imageByKeys.get(task.description.iconID)">
        </div>
        <div class="content">
          <h3>{{ task.description.title }}</h3>
          <p>{{ task.description.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import TweenValue from '@/components/TweenValue.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { Props, TaskType } from './define.widget';

import i18n from './i18n.json'
import { useI18n } from '@/composition/useI18n';
import { computed } from 'vue';

const props = defineProps<Props>()

const { t } = useI18n(i18n)

const images = import.meta.glob<string>('../assets/battleConditions/*.png', { eager: true, import: 'default' });
const imageByKeys = new Map<string, string>(Object.entries(images).map(([key, value]) => {
  const imageKey = key.split('/').pop()?.replace('.png', '') ?? '';
  return [imageKey, value];
}));


const taskTypeToLocale = {
  [TaskType.HIT]: t('questTypeHit'),
  [TaskType.KILLS]: t('questTypeKills'),
  [TaskType.ASSIST]: t('questTypeAssist'),
  [TaskType.BATTLE]: t('questTypeBattle'),
  [TaskType.MASTER]: t('questTypeMaster'),
  [TaskType.UNKNOWN]: '???',
}

const subtitle = computed(() => {
  if (typeof props.header.subtitle === 'string') {
    return props.header.subtitle;
  }

  return taskTypeToLocale[props.header.subtitle as TaskType] ?? '';
})

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.5em;
  line-height: 1.2;
  background: linear-gradient(180deg, rgba(24, 24, 24, 0.8) 0%, rgba(24, 24, 24, 0.3) 100%);
  border-radius: 1em;

  .header {
    padding: 1em;

    h1 {
      font-size: 2em;
    }

    h2 {
      font-weight: normal;
      font-size: 0.8em;
    }
  }


  .tasks {
    padding: 1em;
    padding-left: 0;
    display: flex;
    flex-direction: column;
    gap: 1em;

    .task {

      display: flex;

      .image-container {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 4em;
        max-width: 4em;

        // filter: drop-shadow(0px 200em 0 rgb(255, 141, 40));
        // transform: translateY(-200em);

        img {
          height: 4em;
          margin: -1em -0.2em;
        }

      }

      h3 {
        margin-bottom: 0.2em;
        font-size: 0.9em;
      }

      p {
        font-size: 0.7em;
      }
    }
  }
}
</style>