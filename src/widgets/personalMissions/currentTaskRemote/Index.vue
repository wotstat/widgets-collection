<template>
  <WidgetWrapper autoScale autoHeight>
    <Content v-if="currentConfig" :header="{ title: currentConfig.title ?? '', subtitle: currentConfig.type }"
      :tasks="currentConfig.tasks" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { useReactiveRemoteValue, useReactiveState, useWidgetSdk, WidgetsRemote } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch, watchEffect } from 'vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

import PersonalMissionsI18n from '../assets/data/localizaiton/personal_missions_details.json'
import PersonalMissionsConfig from '../assets/data/pm3/config.json'
import { gettext } from '@/utils/gettextJson';
import { TaskType } from './define.widget';

const { } = useQueryParams({
  // skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})


const nameToType = (name: string): TaskType => {
  if (name.length === 0) return TaskType.UNKNOWN;
  const letter = name[0].toUpperCase();
  switch (letter) {
    case 'А': return TaskType.HIT;
    case 'Б': return TaskType.KILLS;
    case 'В': return TaskType.ASSIST;
    case 'Г': return TaskType.BATTLE;
    case 'Д': return TaskType.MASTER;
    default: return TaskType.UNKNOWN;
  }
}

const translate = <T extends undefined | null | string>(
  key: string,
  params: Record<string, any> = {},
  defaultValue: T | ((key: string) => string) = k => k) => {
  return gettext(PersonalMissionsI18n, key, params, defaultValue);
}

const translatedConfig = Object.fromEntries(
  Object.entries(PersonalMissionsConfig).map(([key, value]) => {
    return [key, {
      tasks: Object.fromEntries(Object.entries(value).map(([targetKey, targetValue]) => {
        return [targetKey, {
          ...targetValue,
          description: {
            ...targetValue.description,
            description: translate(`${key}_description_${targetKey}`, {
              ...targetValue.config,
              ...targetValue.config.params
            }),
            title: translate(`${key}_title_${targetKey}`, {
              ...targetValue.config,
              ...targetValue.config.params,
            }, null),
          }
        }];
      })),
      title: translate(key),
      type: nameToType(translate(key))
    }];
  })
)

function filterPM(searchString: string) {
  const filteredKeys = Object.keys(translatedConfig).filter(k => k.startsWith(searchString));
  return new Map(filteredKeys.map(k => [k, translatedConfig[k]]))
}

const comp1 = filterPM('pm3_8_')
const comp2 = filterPM('pm3_9_')
const comp3 = filterPM('pm3_10_')
const variants = new Map(Object.entries(translatedConfig))

const remote = new WidgetsRemote()
const currentTask = useReactiveRemoteValue(remote, 'Задача', 'pm3_8_1_1' as string, {
  type: {
    type: 'select',
    variants: [
      ...[...comp1.entries()].map(([key, value]) => ({ value: key, label: 'ARMT/' + value.title?.split('-').at(0) + '/' + value.title })),
      ...[...comp2.entries()].map(([key, value]) => ({ value: key, label: 'TF-2 Clark/' + value.title?.split('-').at(0) + '/' + value.title })),
      ...[...comp3.entries()].map(([key, value]) => ({ value: key, label: 'Projet Murat/' + value.title?.split('-').at(0) + '/' + value.title })),
    ]
  },
  elementHelper: '.header'
})

const currentConfig = computed(() => variants.get(currentTask.value) ?? null)

watchEffect(() => {
  console.log(currentConfig.value);
})

const { sdk } = useWidgetSdk();

</script>


<style lang="scss" scoped></style>