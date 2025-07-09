<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="0.8">
    <Content :header="{ title: 'Г-8', subtitle: 1 }" :tasks="tasks" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
}>();

const tasks = {
  "assistedKills": {
    "type": "valueProgress",
    "config": {
      "goal": 1,
      "isMain": true,
      "isAward": false,
      "visibleScope": [
        "battle",
        "hangar"
      ],
      "params": {
        "assistTypes": [
          "radio"
        ]
      }
    },
    "description": {
      "iconID": "assist_radio",
      "limiterID": null,
      "isInOrGroup": false,
      "containerType": "body",
      title: "Разведданные",
      description: "Передать разведданные для уничтожения машины противника."
    }
  },
  "alive": {
    "type": "binaryProgress",
    "config": {
      "isMain": true,
      "isAward": false,
      "visibleScope": [
        "hangar",
        "battle"
      ]
    },
    "description": {
      "iconID": "survive",
      "limiterID": null,
      "isInOrGroup": false,
      "containerType": "body",
      title: "Результат",
      description: "Выжить в бою."
    }
  },
  "battlesSeries": {
    "type": "valueProgress",
    "config": {
      "goal": 5,
      "isMain": true,
      "isAward": true,
      "isCumulative": true,
      "visibleScope": [
        "hangar",
        "battle"
      ]
    },
    "description": {
      "displayType": "counter",
      "isInOrGroup": false,
      "containerType": "header",
      description: "Выполнить в 5 боях",
      title: null
    }
  }
} as const

</script>


<style lang="scss" scoped></style>