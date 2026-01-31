<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.16">
    <Content :header="{ title: 'Г-10', subtitle: 'Фланг разведки', levels: [5, 7], task: 'pm3_8_1_1' }" :tasks="tasks"
      :styleParams="styleParam" :colorizeIcon="colorizeIcon ?? false" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { BackgroundScheme, ColorScheme, styleParams } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  accent?: string
  accentShadow?: string
  badge?: string
  badgeText?: string
  colorScheme?: ColorScheme
  colorizeIcon?: boolean
  backColorFrom?: string,
  backColorTo?: string,
  backgroundScheme?: BackgroundScheme
  headerMode?: 'full' | 'compact' | 'hide'
}>();

const tasks = [
  [
    {
      "key": "battlesSeries",
      "type": "valueProgress",
      "config": {
        "goal": 5,
        "isMain": true,
        "isAward": false,
        "isCumulative": true,
        "visibleScope": [
          "battle",
          "hangar"
        ]
      },
      "description": {
        "displayType": "limited",
        "isInOrGroup": false,
        "containerType": "header",
        "description": "Уложиться в <b>5</b> боёв",
        "title": null
      }
    },
    {
      "key": "assist",
      "type": "valueProgress",
      "config": {
        "goal": 15000,
        "isMain": true,
        "isAward": true,
        "isCumulative": true,
        "visibleScope": [
          "hangar",
          "battle"
        ],
        "params": {
          "assistTypes": [
            "track",
            "radio"
          ]
        }
      },
      "description": {
        "iconID": "assist",
        "limiterID": null,
        "isInOrGroup": false,
        "containerType": "body",
        "description": "Суммарно <b>15000</b> ассиста за бой",
        "title": "Содействие"
      }
    }
  ],
  [
    {
      "key": "battlesSeriesAdv",
      "type": "valueProgress",
      "config": {
        "goal": 5,
        "isMain": false,
        "isAward": false,
        "isCumulative": true,
        "visibleScope": [
          "battle",
          "hangar"
        ]
      },
      "description": {
        "displayType": "limited",
        "isInOrGroup": false,
        "containerType": "header",
        "description": "Уложиться в <b>5</b> боёв",
        "title": null
      }
    },
    {
      "key": "assistAdv",
      "type": "valueProgress",
      "config": {
        "goal": 20000,
        "isMain": false,
        "isAward": true,
        "isCumulative": true,
        "visibleScope": [
          "hangar",
          "battle"
        ],
        "params": {
          "assistTypes": [
            "track",
            "radio"
          ]
        }
      },
      "description": {
        "iconID": "assist",
        "limiterID": null,
        "isInOrGroup": false,
        "containerType": "body",
        "description": "Суммарно <b>20000</b> ассиста",
        "title": "Содействие"
      }
    }
  ]
] as any

const styleParam = computed(() => ({
  ...styleParams(props.colorScheme ?? 'orange', props.accent, props.accentShadow, props.badge, props.badgeText),
  backgroundScheme: props.backgroundScheme ?? 'default',
  backColorFrom: props.backColorFrom ?? '1c1c1c',
  backColorTo: props.backColorTo ?? '1a1a1a69',
  headerMode: props.headerMode ?? 'full'
}));

</script>


<style lang="scss" scoped></style>