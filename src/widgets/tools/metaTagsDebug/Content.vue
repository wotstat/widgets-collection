<template>


  <DefineOnOff v-slot="{ isOn }">
    <div class="on-off">
      <span class="off" :class="!isOn ? 'active' : ''">OFF</span>
      <span class="on" :class="isOn ? 'active' : ''">ON</span>
    </div>
  </DefineOnOff>

  <DefineLine v-slot="{ isOn, num, name }">
    <div class="line" :class="num == selectedLine ? 'selected' : ''">
      <span class="secondary number">{{ num }}.</span>
      <span class="flex-1 name">{{ name }}</span>
      <OnOff :isOn="isOn" />
    </div>
  </DefineLine>

  <div class="font-container" :style="{
    fontSize: values['insetsPadding'] ? `calc(4vw - ${insets.right + insets.left}%)` : ''
  }">

    <div class="main" :class="{
      'relative-font': values['relativeFont'],
      'absolute-font': !values['relativeFont'],
      'insets-background': values['insetsPadding'] && [insets.top, insets.right, insets.bottom, insets.left].some(v => v != 0)
    }" :style="{
      padding: values['insetsPadding'] ? `${insets.top}% ${insets.right}% ${insets.bottom}% ${insets.left}%` : '',
    }">
      <WidgetCard ref="card">
        <div class="lines nowrap" :style="{
          paddingBottom: values.oscillateHeight ? (1 + Math.sin(time / 1000)) * 20 + '%' : ''
        }">
          <ReuseLine :num="1" :isOn="values.autoHeight" :name="'Auto height'" />
          <ReuseLine :num="2" :isOn="values.hangarOnly" :name="'Hangar only'" />
          <ReuseLine :num="3" :isOn="values.readyToClearData" :name="'Ready to clear data'" />
          <ReuseLine :num="4" :isOn="values.useSniperMode" :name="'Use sniper mode'" />
          <ReuseLine :num="5" :isOn="values.preferredTopLayer" :name="'Preferred top layer'" />
          <ReuseLine :num="6" :isOn="values.unlimitedSize" :name="'Unlimited size'" />
          <div class="line insets" :class="7 == selectedLine ? 'selected' : ''">
            <span class="secondary number">7.</span>
            <span class="flex-1 name">Insets</span>
            <div class="multi-stepper" :class="700 == selectedLine ? 'selected' : ''">
              <div class="value" :class="701 == selectedLine ? 'selected' : ''">{{ insets.top }}</div>
              <div class="value" :class="702 == selectedLine ? 'selected' : ''">{{ insets.right }}</div>
              <div class="value" :class="703 == selectedLine ? 'selected' : ''">{{ insets.bottom }}</div>
              <div class="value" :class="704 == selectedLine ? 'selected' : ''">{{ insets.left }}</div>
            </div>
          </div>
          <hr>
          <ReuseLine :num="8" :isOn="values.relativeFont" :name="'Relative font'" />
          <ReuseLine :num="9" :isOn="values.insetsPadding" :name="'Insets padding'" />
          <ReuseLine :num="10" :isOn="values.oscillateHeight" :name="'Oscillate height'" />
          <hr>
          <p>
            <span class="secondary">Size:</span>
            {{ windowSize.width }}<span class="secondary">x</span>{{ windowSize.height }}
          </p>
          <p>
            <span class="secondary">Card size:</span>
            {{ Math.round(cardSize.width.value * 100) / 100 }}<span class="secondary">x</span>{{
              Math.round(cardSize.height.value * 100) / 100 }}
          </p>
          <p>
            <span class="secondary">Body size:</span>
            {{ Math.round(bodySize.width.value * 100) / 100 }}<span class="secondary">x</span>{{
              Math.round(bodySize.height.value * 100) / 100 }}
          </p>
        </div>
      </WidgetCard>
    </div>
  </div>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import { createReusableTemplate, useElementBounding, useTimestamp, useWindowSize } from '@vueuse/core';
import { Props } from './define.widget';
import { ref } from 'vue';

const [DefineLine, ReuseLine] = createReusableTemplate<{ num: number, isOn: boolean, name: string }>();
const [DefineOnOff, OnOff] = createReusableTemplate<{ isOn: boolean }>();

const props = defineProps<Props>()

const card = ref<HTMLElement | null>(null)
const cardSize = useElementBounding(card)
const bodySize = useElementBounding(document.body)

const windowSize = useWindowSize()
const time = useTimestamp()

</script>


<style lang="scss" scoped>
.main {

  &.relative-font {
    font-size: 1.4em;
  }

  &.absolute-font {
    font-size: 12px;
  }

  &.insets-background {
    background: rgba(31, 156, 252, 0.165);
  }

  .lines {
    line-height: 1.7;

    .line {
      display: flex;
      align-items: center;
      padding: 0 0.2em;

      &.selected {
        background: #007AFF;
        border-radius: 0.3em;
      }
    }

    .name {
      margin-left: 0.3em;
    }
  }

  .multi-stepper {
    display: flex;
    gap: 0.2em;

    &.selected {
      background: #007AFF;
      border-radius: 0.3em;

      .value {
        background: #007AFF;
      }
    }

    .value {
      background: rgba(17, 17, 17, 0.9);
      line-height: 1;
      font-size: 0.8em;
      height: 100%;
      border-radius: 0.3em;
      padding: 0.3em 0.55em;

      &.selected {
        background: #007AFF;
        border-radius: 0.3em;
      }
    }
  }

  .on-off {
    display: flex;
    font-size: 0.7em;
    background: rgba(17, 17, 17, 0.9);
    border-radius: 0.3em;
    line-height: 1;
    height: 100%;

    .on,
    .off {
      padding: 0.4em;
    }

    .on {
      &.active {
        background: #34C759;
      }

      border-top-right-radius: 0.3em;
      border-bottom-right-radius: 0.3em;
    }

    .off {
      &.active {
        background: #FF3B30;
      }

      border-top-left-radius: 0.3em;
      border-bottom-left-radius: 0.3em;
    }

  }
}
</style>