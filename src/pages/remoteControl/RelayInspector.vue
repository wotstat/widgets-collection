<template>

  <div class="rc-inspector-style">
    <label class="no-ident">
      <span>Emulate relay</span>
      <input type="checkbox" v-model="enabled">
    </label>
    <br>

    <Section :title="`Remote ${key.replace(/^[0,-]*/, '')}`" v-for="([key, value], index) in remoteConnections">
      <template #header>
        <button @click.stop="remove(key)" class="remove-btn">
          <DisconnectIcon />
        </button>
      </template>

      <Inspector :data="inspectorForState(value)" @change="t => onChange({ path: [key, ...t.path], value: t.value })"
        :offset="1" />
    </Section>

    <br>

    <button class="add-new" @click="add">Add remote connection</button>
  </div>
</template>


<script setup lang="ts">
import { RelayDebugConnection } from '@/composition/widgetSdk';
import Inspector from './inspector/Inspector.vue';
import { ref, shallowRef, toRaw, watch, watchEffect } from 'vue';
import Section from './sdkInspector/drawer/Section.vue';
import { Entry } from './inspector/tree';

import DisconnectIcon from '@/assets/icons/x.svg'

const enabled = ref(true);

const { debug } = defineProps<{
  debug: RelayDebugConnection
}>()

const shallowDebug = shallowRef(debug);
watchEffect(() => shallowDebug.value = debug);


const remoteConnections = ref(new Map<string, Map<string, any>>());

watch(enabled, v => {
  if (v) {
    debug.enable()

    for (const [uuid, state] of remoteConnections.value)
      for (const [key, value] of state) debug.sendState(uuid, key, toRaw(value));
  }
  else debug.disable();
}, { immediate: true });

function onChange({ path, value }: { path: string[]; value: unknown }) {

  const uuid = path[0];
  const state = remoteConnections.value.get(uuid);
  if (!state) return

  let key = path[1]
  let i = 2;

  for (i = 2; i < path.length; i++) {
    if (state.has(key)) break
    key += `/${path[i]}`;
  }

  const innerPath = path.slice(i);

  if (innerPath.length === 0) {
    state.set(key, value);
    debug.sendState(uuid, key, toRaw(value));
    return;
  }


  let targetState = state.get(key);
  let innerKey = innerPath[0];
  for (i = 1; i < innerPath.length; i++) {
    if (innerKey in targetState) {
      targetState = targetState[innerKey];
      innerKey = innerPath[i];
      continue
    }
    innerKey += `/${innerPath[i]}`;
  }


  targetState[innerKey] = value;
  debug.sendState(uuid, key, toRaw(state.get(key)));
}

let uuid = 1;
function nextUUID() {
  const result = uuid.toString().padStart(36, '0');
  uuid++;

  const parts = [
    result.slice(0, 8),
    result.slice(8, 12),
    result.slice(12, 16),
    result.slice(16, 20),
    result.slice(20)
  ]

  return parts.join('-');
}

function add() {
  const state = structuredClone(debug.registeredStates.value);
  const targetUuid = nextUUID();
  remoteConnections.value.set(targetUuid, state);
  for (const [key, value] of state) debug.sendState(targetUuid, key, value);

}

function remove(uuid: string) {
  remoteConnections.value.delete(uuid)
  debug.removeClient(uuid);
}

function drawerForType(t: string | number | boolean) {
  if (typeof t === 'string') return { drawer: 'string', meta: {} }
  if (typeof t === 'number') return { drawer: 'number', meta: {} }
  if (typeof t === 'boolean') return { drawer: 'boolean', meta: {} }
  return { drawer: 'unknown', meta: {} }
}

function inspectorForState(value: Map<string, any>) {

  const unwrapped = new Map<string, string | number | boolean>();

  function unwrap(obj: Record<string, any>, prefix: string = '') {
    for (const [key, val] of Object.entries(obj)) {
      if (typeof val === 'object' && val !== null) {
        unwrap(val, prefix == '' ? key : `${prefix}/${key}`);
      } else {
        unwrapped.set(prefix == '' ? key : `${prefix}/${key}`, val);
      }
    }
  }

  unwrap(Object.fromEntries(value));


  return [...unwrapped.entries()].reduce((acc, [key, value]) => {
    const drawer = drawerForType(value);

    acc[key] = {
      value: value,
      meta: {
        drawer: drawer.drawer,
        meta: drawer.meta
      },
    };

    return acc;
  }, {} as Record<string, Entry>);
}

</script>


<style lang="scss" scoped>
.add-new {
  width: 100%;
}

.remove-btn {
  margin-right: 3px;
  background-color: transparent;
  border: none;
  padding: 5px;

  svg {
    display: block;
    width: 15px;
    height: 15px;
    color: rgb(226, 226, 226);
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }
}

button {
  cursor: pointer;
}
</style>