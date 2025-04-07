<template>
  <div class="main">
    <WidgetCard>
      <div class="background-elements">
        <div class="c1"></div>
        <div class="c2"></div>
      </div>
      <div class="flex line containers">
        <div class="container mini-card" v-for="container in data.containers.slice(3, 3 + 2)">
          <p class="long-title secondary-color">
            {{ lootboxNames.data.find(t => t.tag == container.tag)?.nameRU ?? 'Контейнер' }}
          </p>
          <div class="horizontal">
            <img class="icon" :src="containersImages[`./assets/containers/${container.tag}.png`] ?? NoImageLB" alt="" />
            <div class="content">
              <p class="title secondary-color">
                {{ lootboxNames.data.find(t => t.tag == container.tag)?.nameRU ?? 'Контейнер' }}
              </p>
              <p class="count nowrap">{{ logProcessor(container.count) }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p>
      <p>test</p> -->
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import { ContainersData } from './define.widget';
import NoImageLB from './assets/containers/noImageLB.png'
import { queryAsync } from '@/utils/db';

const containersImages = import.meta.glob<string>('./assets/containers/*.png', { eager: true, import: 'default' })

const props = defineProps<{
  data: ContainersData
}>()
const lootboxNames = queryAsync<{ tag: string, nameRU: string }>(`select * from LootboxesLocalization`)

function logProcessor(value: number) {
  if (value < 1e5) return value.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  if (value < 1e6) return (value / 1e3).toFixed(1) + 'k';
  if (value < 1e9) return (value / 1e6).toFixed(1) + 'M';
  if (value < 1e12) return (value / 1e9).toFixed(1) + 'B';
  return (value / 1e12).toFixed(1) + 'T';
}

</script>


<style lang="scss" scoped>
.secondary-color {
  color: #ffffffb6;
}

.main {
  font-size: 1em;

  .card {
    position: relative;
    border-radius: 2em;
    background-color: rgb(28, 28, 28);
    border: 0.1em solid rgba(255, 255, 255, 0.05);
    padding: 0.9em;
  }

  .mini-card {
    box-shadow: inset 0 0 0.4em rgb(255 255 255 / 2%), 0 0 0.5em 0px rgb(0 0 0 / 2%);
    background-color: rgba(255, 255, 255, 0.04);
    border: 0.03em solid rgba(255, 255, 255, 0.05);
    padding: 0.4em;
    font-size: 2em;
    border-radius: 0.5em;
  }


  .containers {

    display: grid;
    grid-template-columns: 100%;
    gap: 0.5em;


    .container {
      line-height: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 100%;
      overflow: hidden;

      .horizontal {
        display: flex;
        gap: 0.5em;
        align-items: center;
      }

      .content {
        display: flex;
        flex-direction: column;
        gap: 0.2em;
        justify-content: space-between;
        width: 100%;
      }

      .title,
      .long-title {
        font-size: 0.6em;
        text-align: left;
        line-height: 1.2;
        margin: -0.1em 0;
      }

      .long-title {
        display: none;
        margin-bottom: 0.6em;
      }

      .title {
        font-size: 0.7em;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .count {
        font-size: 1.6em;
        font-weight: bold;
      }

      .icon {
        height: 2em;
        margin: -0.3em;
        margin-left: -0.1em;
      }
    }

    &:has(> :nth-child(n+1)) {
      .container .icon {
        height: 2em;
      }

      .title {
        display: none;
      }

      .long-title {
        display: block;
        font-size: 0.75em;
        margin-bottom: 0.4em;
      }
    }

    &:has(> :nth-child(n+2)) {

      .content {
        max-width: 70%;
      }

      .container .icon {
        height: 2.3em;
      }

      .count {
        font-size: 1.2em;
      }

      .title {
        font-size: 0.6em;
        display: block;
      }

      .long-title {
        display: none;
      }

    }

    &:has(> :nth-child(n+3)) {
      .content {
        max-width: 75%;
      }

      .container .icon {
        height: 2em;
        margin-left: -0.1em;
      }

      .count {
        font-size: 1em;
      }
    }

    &:has(> :nth-child(n+4)) {
      grid-template-columns: repeat(2, 1fr);

      .content {
        max-width: unset;
      }

      .container .icon {
        height: 1.1em;
      }

      .title {
        display: none;
      }

      .count {
        font-size: 0.9em;
        line-height: 0.8;
      }

      .long-title {
        display: block;
        font-size: 0.5em;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        margin-top: -0.3em;
        margin-bottom: 0.6em;
      }
    }

    &:has(> :nth-child(n+7)) {

      .long-title {
        display: none;
      }

      .container .icon {
        height: 1.2em;
      }

      .title {
        display: none;
      }
    }

  }
}

.background-elements {
  position: absolute;
  inset: 0;
  border-radius: 1em;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  opacity: 0.3;

  .c1 {
    position: absolute;
    background-color: rgba(255, 0, 174, 0.1);

    filter: blur(7em);
    border-radius: 200em;

    top: -20%;
    right: -10%;
    width: 80%;
    height: 90%;
  }


  .c2 {
    position: absolute;
    background-color: rgba(0, 255, 8, 0.1);

    filter: blur(7em);
    border-radius: 200em;

    bottom: -40%;
    left: 0%;
    width: 80%;
    height: 90%;
  }
}
</style>