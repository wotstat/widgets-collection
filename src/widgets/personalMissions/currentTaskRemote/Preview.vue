<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.16">
    <Content :header="{ title: 'Г-10', subtitle: 'Фланг разведки', levels: [5, 7] }" :tasks="tasks"
      :styleParams="styleParam" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { ColorScheme, styleParams } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  accent?: string
  badge?: string
  badgeText?: string
  colorScheme?: ColorScheme
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

const styleParam = computed(() => styleParams(props.colorScheme ?? 'orange', props.accent, props.badge, props.badgeText));

</script>


<style lang="scss" scoped></style>