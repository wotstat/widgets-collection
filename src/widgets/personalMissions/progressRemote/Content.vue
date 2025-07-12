<template>

  <InsetsWrapper :insets="{ top: 3, right: 0, bottom: 0, left: 0 }">
    <div class="main" :style="{ '--accent': `#${props.accent}` }">
      <div class="header">
        <h1>{{ props.targetTank }}</h1>
        <h2>{{ info.title }}</h2>

        <FallbackImg :src="`${STATIC_URL}/vehicles/shop/${info.tag}`" class="tank"
          :fallback="`${STATIC_URL}/vehicles/preview/noImage.png`" :key="info.tag" />
      </div>

      <div class="content">
        <div class="progress-sections">
          <div class="section" v-for="section in sections" :class="section.title.toLowerCase().replace(/ /g, '')">
            <h2>{{ section.title }}</h2>
            <h4>Уровень</h4>
            <div class="value">
              <span class="current">{{ Math.max(0, Math.min(25, section.value)) }}</span><span>/25</span>
            </div>
            <div class="progress" :style="{ '--progress': `${Math.max(0, Math.min(25, section.value)) / 25 * 100}%` }">
            </div>
          </div>
        </div>
      </div>

      <div class="perfect">
        <div class="line">
          <h3>Задачи с отличием</h3>
          <p>
            <span class="current">{{ Math.max(0, Math.min(45, props.perfect)) }}</span><span>/45</span>
          </p>
        </div>
        <div class="progress" :style="{ '--progress': `${Math.max(0, Math.min(45, props.perfect)) / 45 * 100}%` }">
        </div>
      </div>

    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import { Props } from './define.widget';
import { STATIC_URL } from '@/utils/externalUrl';
import FallbackImg from '@/components/shared/FallbackImg.vue';
import InsetsWrapper from '@/components/InsetsWrapper.vue';

const props = defineProps<Props>();

const sections = computed(() => [
  { title: 'VI-VII', value: props.section1 },
  { title: 'VIII-IX', value: props.section2 },
  { title: 'X-XI', value: props.section3 },
]);

const info = computed(() => {
  const tank = props.targetTank;
  if (tank === 'ARMT') return { title: 'США • XI • ЛТ', tag: 'usa-A161_ARMT.png' };
  if (tank === 'TF-2 Clark') return { title: 'США • IX • ТТ', tag: 'usa-A173_TF_2_CLARK.png' };
  if (tank === 'Project Murat') return { title: 'Франция • X • СТ', tag: 'france-F119_Projet_Murat.png' };
  return { title: '', tag: '' };
});

</script>


<style lang="scss" scoped>
.main {
  font-size: 1.3em;
  line-height: 1.2;
  border-radius: 1em;
  display: flex;
  flex-direction: column;
  gap: 1em;

  background: linear-gradient(180deg, rgba(24, 24, 24, 0.8) 0%, rgba(24, 24, 24, 0.3) 100%);
  padding: 1em 0;

  .header {
    padding: 0 1em;
    position: relative;

    h1 {
      font-size: 2em;
      line-height: 1;
      margin-bottom: 0.1em;
    }

    h2 {
      font-weight: normal;
      font-size: 0.8em;
    }

    .tank {
      position: absolute;
      height: 6em;
      bottom: -35%;
      right: 0.5em;
      filter: drop-shadow(0 0.1em 0.2em rgba(0, 0, 0, 0.5));
    }

  }

  .progress-sections {
    display: flex;
    padding: 0 1em;
    gap: 0.5em;

    .section {
      flex: 1;

      border: 0.1em solid rgba(255, 255, 255, 0.3);
      border-radius: 0.5em;
      padding: 0.5em;

      h2 {
        font-size: 1.1em;
      }

      h2,
      h4 {
        text-align: center;
      }

      h4 {
        font-size: 0.6em;
        margin: 0;
        color: rgb(193, 193, 193);
        font-weight: 400;
        text-transform: uppercase;
      }

      .value {
        display: flex;
        justify-content: center;
        align-items: baseline;
        font-size: 1em;
        font-weight: 400;
        color: rgb(224, 224, 224);
        margin-top: 1em;

        .current {
          color: white;
          font-size: 2em;
          font-weight: 900;
        }
      }

      .progress {
        margin-top: 0.2em;
      }
    }
  }

  .perfect {
    padding: 0 1em;

    .line {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h3 {
        font-size: 1em;
        color: rgb(224, 224, 224);
        font-weight: 400;
      }

      p {
        font-size: 1em;
        color: rgb(224, 224, 224);
        font-weight: 400;

        .current {
          color: white;
          font-weight: 900;
          font-size: 1.2em;
        }
      }
    }
  }

  .progress {
    height: 0.2em;
    background-color: rgb(170, 170, 170);
    border-radius: 0.1em;
    margin-top: 0.3em;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: var(--progress, 0%);
      background-color: var(--accent, rgb(255, 165, 0));
      border-radius: 0.1em;
      transition: width 0.3s ease-in-out;
    }
  }
}
</style>