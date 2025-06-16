<template>
  <WidgetRoot auto-height auto-scale>
    <Content :web="widget" :database :dataProvider :dataProviderVersion :relay :remote />
  </WidgetRoot>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { onMounted, ref, watchEffect } from 'vue';
import { useGunMarkCalculator } from '@/composition/shared/useGunMarkCalculator';
import { Status } from './define.widget';
import WidgetRoot from '@/components/WidgetRoot.vue';
import { useReactiveState, useWidgetSdk, WidgetsRemote } from '@/composition/widgetSdk';
import { useWidgetRelay } from '@/composition/useWidgetRelay';
import { CLICKHOUSE_URL, REMOTE_URL, WIDGETS_URL } from '@/utils/externalUrl';


const widget = ref<Status>('connecting')
const database = ref<Status>('connecting')
const dataProvider = ref<Status>('connecting')
const dataProviderVersion = ref<number | null>(null)
const relay = ref<Status>('connecting')
const remote = ref<Status>('connecting')

const { sdk, status } = useWidgetSdk()
useReactiveState(sdk.data.game.dataProviderVersion, v => dataProviderVersion.value = v)
watchEffect(() => {
  dataProvider.value = status.value
  if (status.value === 'connecting') dataProviderVersion.value = null
})

const widgetRelay = useWidgetRelay('connection-check')
widgetRelay.relay.status.watch((status) => relay.value = status)

const widgetRemote = new WidgetsRemote({ channel: 'connection-check', url: REMOTE_URL })
widgetRemote.status.watch((status) => remote.value = status)


async function checkWeb() {
  try {
    const result = await fetch(WIDGETS_URL)
    const text = await result.text()

    if (text.includes('<div id="app"></div>')) {
      widget.value = 'connected'
    } else {
      widget.value = 'disconnected'
    }

  } catch (error) {
    console.log('Web check failed:', error);
    widget.value = 'disconnected'
  }
}

async function checkDb() {
  try {
    const result = await fetch(`${CLICKHOUSE_URL}/?user=public&default_format=JSON&add_http_cors_header=1`, {
      method: 'POST',
      body: 'SELECT 1;'
    })

    const content = await result.json()

    if (content.data[0]['1'] === 1) {
      database.value = 'connected'
    } else {
      database.value = 'disconnected'
    }

  } catch (error) {
    console.log('Database check failed:', error);
    database.value = 'disconnected'
  }
}

onMounted(() => {
  checkWeb()
  checkDb()
})


</script>


<style lang="scss" scoped></style>