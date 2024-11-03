<template>
  <div class="page">
    <h1>Admin</h1>
    <input type="password" name="pass" v-model="password">
    <h2>List</h2>
    <div class="list" :class="{
      'connecting': status == 'CONNECTING',
      'connected': status == 'OPEN',
    }">
      <div v-bind="containerProps" style="height: 300px">
        <div v-bind="wrapperProps" class="list">
          <div v-for="item in list" :key="item.index" class="item"
            :class="{ 'selected': selectedChannel == item.data.channel }" @click="selectChannel(item.data.channel)">
            <p>{{ item.data.channel }}</p>
            <p class="count">{{ item.data.clients.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useFetch, useLocalStorage, useVirtualList, useWebSocket } from '@vueuse/core';
import { computed, ref, watchEffect } from 'vue';

const password = useLocalStorage<string>('admin_password', '');

const { data } = useFetch(`${import.meta.env.VITE_RELAY_HTTP_URL}/channel-list`, {
  beforeFetch: ({ url, options, cancel }) => {
    options.headers = {
      ...options.headers,
      'Authorization': `Bearer ${password.value}`,
    }
    return { url, options, cancel };
  },
}).json<{ channels: { channel: string, clients: string[] }[] }>();
const dataList = computed(() => data.value?.channels || []);

const { list, containerProps, wrapperProps } = useVirtualList(dataList, { itemHeight: 70 });


const selectedChannel = ref<string>('');
function selectChannel(channel: string) {
  selectedChannel.value = channel;
}

const wsUrl = computed(() => `${import.meta.env.VITE_RELAY_URL}/silent?channel=${selectedChannel.value}`);
const { status } = useWebSocket(wsUrl, {
  onMessage: (ws, e) => {
    console.log(JSON.parse(e.data));
  },
})

</script>


<style lang="scss" scoped>
.page {
  background-color: #242424;
  padding: 3em 1em;
  min-height: 100vh;
  color: white;

  .list {
    .item {
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1em;
      font-size: 1em;
      background-color: #333;
      height: 50px;
      border-radius: 10px;
      margin: 10px 0;
      border: 1px solid transparent;

      .count {
        font-weight: bold;
        color: #888;
      }

      &.selected {
        background-color: #464646;
      }
    }

    &.connecting {
      .selected {
        border: 1px solid #c3830e;
      }
    }

    &.connected {
      .selected {
        border: 1px solid #0ec359;
      }
    }
  }
}
</style>