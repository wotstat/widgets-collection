<template>
  <div class="line">
    <p>{{ label }}</p>
    <button class="setup" @click="isOpen[1](true)" ref="setupButton">настроить</button>
  </div>
  <Teleport to="body" v-if="isOpen[0].value && values">
    <div class="slot-model" ref="slotModel"
      :style="{ '--left': setupButtonBounding.left.value + 'px', '--top': (setupButtonBounding.top.value + setupButtonBounding.height.value / 2) + 'px' }">
      <div class="slot-background">
        <div class="slot-model-content">
          <div class="slot-select nice-scrollbar" :class="{ 'has-scroll': slotSelectHasScroll }" ref="slotSelect">
            <div class="slot interactive selectable" :class="{ selected: selectedSlot == i }"
              v-for="(value, i) in values" @click="selectedSlot = i">
              <Icon v-if="isIconType(value)" :icon="value" class="icon" />
              <p>Слот {{ i + 1 }}</p>
              <IconX class="icon-x" @click.stop="remove(i)" v-if="values.length > min" />
            </div>
            <div class="add" @click="add" v-if="values.length < max">
              <p>Добавить</p>
            </div>
          </div>
          <div class="slot-values-content flex-1">
            <div class="slot-values nice-scrollbar" :class="{ 'has-scroll': slotValuesHasScroll }" ref="slotValues">
              <div class="slot-value interactive selectable" v-for="item in slots" @click="select(item.value)"
                :class="{ selected: item.value == selectedSlotParam?.value }">
                <Icon :icon="item.icon" class="icon" />
                <p>{{ i18n[item.label] ?? item.label }}</p>
              </div>
            </div>
            <div class="modifiers" v-if="selectedSlotParam?.modifications?.length">
              <div class="modifier selectable" v-if="selectedSlotParam" v-for="mod in selectedSlotParam.modifications"
                :class="{ selected: mod.value == selectedSlotValue }" @click="select(mod.value)">
                {{ i18n[mod.label] ?? mod.label }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>


<script setup lang="ts">
import Icon from '@/components/efficiencyIcon/Icon.vue';
import { isIconType } from '@/components/efficiencyIcon/utils';
import { useHasScroll } from '@/composition/utils/useHasScroll';
import { MultiSlotParamSlot } from '@/utils/defineWidget';
import { useElementBounding, useToggle } from '@vueuse/core';
import { onClickOutside } from '@vueuse/core'
import { computed, ref, watch } from 'vue';

import IconX from "@/assets/icons/x.svg";


const props = defineProps<{
  label: string
  min: number
  max: number
  slots: MultiSlotParamSlot[]
  i18n: Record<string, string>
}>()

const values = defineModel<string[]>()

const slotModel = ref<HTMLElement | null>(null)
const slotValues = ref<HTMLElement | null>(null)
const slotSelect = ref<HTMLElement | null>(null)
const setupButton = ref<HTMLElement | null>(null)
const isOpen = useToggle(false)
const setupButtonBounding = useElementBounding(setupButton)
const { hasVerticalScroll: slotValuesHasScroll } = useHasScroll(slotValues)
const { hasVerticalScroll: slotSelectHasScroll } = useHasScroll(slotSelect)
const selectedSlot = ref<number | null>(0)
const selectedSlotValue = computed(() => selectedSlot.value != null && values.value ? values.value[selectedSlot.value] : null)
const selectedSlotParam = computed(() => props.slots.find(t => t.value == selectedSlotValue.value ||
  t.modifications?.map(t => t.value).includes(selectedSlotValue.value ?? '')))

onClickOutside(slotModel, () => isOpen[1](false))
watch(isOpen[0], () => setupButtonBounding.update())

function add() {
  if (!values.value) values.value = []
  values.value.push(props.slots[0].value)
  selectedSlot.value = values.value.length - 1
}

function remove(index: number) {
  values.value!.splice(index, 1)
  if (selectedSlot.value != null && selectedSlot.value >= index) selectedSlot.value--
}

function select(value: string) {
  if (selectedSlot.value != null) values.value![selectedSlot.value] = value
}
</script>


<style lang="scss" scoped>
button.setup {
  width: 140px;
  border-radius: 5px;
  border: 0;
  height: 21.5px;
  cursor: pointer;
  transition: background-color 0.1s;

  &:hover {
    background-color: #7a7a7a;
  }
}

.slot-model {
  $border: 1px solid #424242;

  position: fixed;
  top: var(--top);
  left: var(--left);
  z-index: 1000;

  transform: translate(calc(-100% - 10px), -50%);

  .interactive {
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: #424242;
    }
  }

  .selectable {
    &.selected {
      background-color: rgb(15, 123, 230);
    }
  }

  .slot-background {
    background-color: #2a2a2a;
    border: 1px solid #424242;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    text-wrap: nowrap;
    display: flex;
    overflow: hidden;
    max-height: 400px;

    .slot-model-content {
      width: 100%;
      display: flex;

      .slot-select {
        overflow-y: auto;
        width: 150px;
        margin: 10px;

        &.has-scroll {
          padding-right: 3px;
          margin-right: 3px;
        }

        .slot {
          cursor: pointer;
          border-radius: 5px;
          display: flex;
          align-items: center;
          gap: 5px;
          flex: 1;

          .icon {
            height: 30px;
            margin: 1px;
            margin-right: -3px;
            fill: white;
          }

          .icon-x {
            height: 15px;
            color: white;
            margin-left: auto;
            margin-right: 5px;
            opacity: 0;

            transition-duration: 0.1s;
            transition-property: color, opacity;

            &:hover {
              color: #ff453a;
            }
          }

          &:hover {
            .icon-x {
              opacity: 1;
            }
          }
        }

        .add {
          position: sticky;
          bottom: 0;
          padding: 10px;
          text-align: center;
          background-color: #2a2a2a;
          cursor: pointer;

          p {
            background-color: #424242;
            border-radius: 5px;
            transition: background-color 0.1s;

            &:hover {
              background-color: #686868;
            }
          }
        }
      }

      .slot-values-content {
        display: flex;
        flex-direction: column;
        overflow-y: hidden;
        border-left: $border;

        .slot-values {
          overflow-y: auto;
          margin: 10px;
          margin-bottom: 10px;

          &.has-scroll {
            padding-right: 3px;
            margin-right: 3px;
          }

          .slot-value {
            display: flex;
            align-items: center;
            gap: 5px;

            border-radius: 5px;
            padding-right: 10px;

            .icon {
              height: 40px;
              margin: -4px;
              fill: white;
            }
          }
        }

        .modifiers {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          border-top: $border;
          gap: 5px;

          .modifier {
            padding: 2px 10px;
            border-radius: 5px;
            text-align: center;
            flex: 1;
            cursor: pointer;


            transition: background-color 0.1s;

            &:not(.selected) {
              background-color: #424242;

              &:hover {
                background-color: #686868;
              }
            }

          }
        }
      }
    }
  }
}
</style>