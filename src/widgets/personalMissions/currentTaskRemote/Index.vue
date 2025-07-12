<template>
  <WidgetRoot autoScale autoHeight>
    <Content v-if="currentConfig" :header="{ title: currentConfig.title ?? '', subtitle, levels: currentLevels }"
      :tasks="taskGroups" :styleParams="styleParam" :colorizeIcon="query.colorizeIcon" />
  </WidgetRoot>
</template>


<script setup lang="ts">
import { useReactiveRemoteValue, WidgetsRemote } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed } from 'vue';
import { oneOf, Color, useQueryParams } from '@/composition/useQueryParams';
import i18n from './i18n.json'
import { useI18n } from '@/composition/useI18n';

import PersonalMissionsI18n from '../assets/data/localizaiton/personal_missions_details_short.json'
import PersonalMissionsConfig from '../assets/data/pm3/config.json'
import { gettext } from '@/utils/gettextJson';
import { Props, styleParams, TaskType } from './define.widget';
import WidgetRoot from '@/components/WidgetRoot.vue';

const query = useQueryParams({
  accent: Color(),
  badge: Color(),
  badgeText: Color(),
  colorizeIcon: Boolean,
  colorScheme: oneOf(['dark', 'red', 'orange', 'green', 'cyan', 'blue', 'purple', 'custom'] as const, 'dark')
})

const styleParam = computed(() => styleParams(query.colorScheme ?? 'dark', query.accent, query.badge, query.badgeText));


const { t } = useI18n(i18n)

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

const displayTask = useReactiveRemoteValue<'all' | 'main' | 'additional'>(remote, 'Отображать задачи', 'all', {
  type: {
    type: 'select',
    variants: [
      { value: 'all', label: t('allTasks') },
      { value: 'main', label: t('mainTasks') },
      { value: 'additional', label: t('additionalTasks') },
    ]
  },
  elementHelper: '.header'
})


const currentConfig = computed(() => variants.get(currentTask.value) ?? null)

const taskTypeToLocale = {
  [TaskType.HIT]: t('questTypeHit'),
  [TaskType.KILLS]: t('questTypeKills'),
  [TaskType.ASSIST]: t('questTypeAssist'),
  [TaskType.BATTLE]: t('questTypeBattle'),
  [TaskType.MASTER]: t('questTypeMaster'),
  [TaskType.UNKNOWN]: '???',
}

const subtitle = computed(() => !currentConfig.value ? '' : taskTypeToLocale[currentConfig.value.type]);

const taskGroups = computed(() => {
  if (!currentConfig.value) return [];

  const tasks = Object.entries(currentConfig.value.tasks)
    .map(([key, task]) => ({ key, ...task }))
    .sort((a, b) => a.description.containerType === 'header' ? -1 : 1);

  const mainGroup = tasks.filter(task => task.config.isMain)
  const additionalGroup = tasks.filter(task => !task.config.isMain);

  const mainGroups = mainGroup
    .reduce((acc, task) => {
      const gridID = task.config.groupID ?? 1;
      if (!acc[gridID]) acc[gridID] = [];
      acc[gridID].push(task);
      return acc;
    }, {}) as Record<number, Props['tasks']>


  const sortedMainGroups = Object.entries(mainGroups)
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([key, group]) => group)

  if (displayTask.value === 'main') return Object.values(sortedMainGroups);
  if (displayTask.value === 'additional') return [additionalGroup];

  return [...sortedMainGroups, additionalGroup]
})

const currentLevels = computed<[number, number]>(() => {
  if (!currentTask.value) return [0, 0];
  const taskPeriod = currentTask.value.split('_')[2];

  if (taskPeriod === '1') return [6, 7];
  if (taskPeriod === '2') return [8, 9];
  if (taskPeriod === '3') return [10, 11];

  return [0, 0];
});


</script>


<style lang="scss" scoped></style>