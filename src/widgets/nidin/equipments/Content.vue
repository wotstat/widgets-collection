<template>
  <div class="main preview-card"
    :class="{ 'compact': variant == 'compact', 'has-post-progression': postProgression && props.postProgressionSetup }">
    <p class="name" v-if="showTankName">{{ tankName }}</p>
    <div class="widget-content">
      <div class="equipments-lines">
        <div class="set-line " v-for="(set, i) in sets">

          <div class="left-info">
            <div class="slot-num">
              <component :is="EquipmentNum[i % 2]" class="num" />
            </div>

            <div class="slot-num" v-if="variant == 'compact'">
              <div class="specialization">
                <Specialization :tag="targetSpecialization[i]" :is-on="true" v-if="targetSpecialization[i]" />
              </div>
            </div>
          </div>

          <div class="line">
            <div class="equipment-slot" v-for="slot in set.slots">
              <div class="equipment">
                <Equipment :tag="slot.equipment" :hd="hd" />
              </div>
              <div class="specialization" v-if="variant == 'default'">
                <Specialization :tag="slot.specialization" :slot-equipment-tag="slot.equipment"
                  v-if="slot.specialization" />
              </div>
            </div>
          </div>
          <div class="booster equipment">
            <Equipment :tag="set.booster" :hd="hd" :is-booster="true" />
          </div>
        </div>
      </div>

      <div class="post-progression" v-if="postProgression && postProgressionSetup">
        <div class="pair-line" v-for="pair, i in postProgressionSetup.available">
          <div class="modernization-slot left" :class="{
            'disabled': postProgressionSetup.recommended.at(i) !== pair[0],
            'current': postProgressionSetup.current.at(i) === pair[0] && postProgressionCurrent,
          }">
            <img :src="getIconUrlByTag(pair[0])">
            <IconX class="current-icon incorrect" />
            <IconCheckmark class="current-icon correct" />
          </div>
          <div class="modernization-slot right" :class="{
            'disabled': postProgressionSetup.recommended.at(i) !== pair[1],
            'current': postProgressionSetup.current.at(i) === pair[1] && postProgressionCurrent,
          }">
            <img :src="getIconUrlByTag(pair[1])">
            <IconX class="current-icon incorrect" />
            <IconCheckmark class="current-icon correct" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Equipment from '@/components/equipment/Equipment.vue';

import EquipmentNum1 from '@/components/equipment/assets/equipment/utils/equipment-num-1.svg'
import EquipmentNum2 from '@/components/equipment/assets/equipment/utils/equipment-num-2.svg'
import IconX from '@/assets/icons/x-bold.svg'
import IconCheckmark from '@/assets/icons/checkmark-bold.svg'
import Specialization from '@/components/equipment/Specialization.vue';
import { Props } from './define.widget';
import { computed } from 'vue';

import { getIconUrlByTag } from '@/components/postProgression/index'

const props = defineProps<Props>()

const targetSpecialization = computed(() => props.sets.map(s => s.slots[1]?.specialization))
const EquipmentNum = [EquipmentNum1, EquipmentNum2]

</script>


<style lang="scss" scoped>
.preview-card {
  border-radius: 0.5em;
}

.main {
  font-size: 2.57em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3em;

  &.has-post-progression {
    font-size: 2.08em;
  }

  &.compact {
    font-size: 2.6em;

    &.has-post-progression {
      font-size: 2.15em;
    }
  }

  .name {
    text-align: center;
    font-size: 0.6em;
    font-weight: bold;
    color: rgb(255, 255, 231);
    width: 100%;
    max-width: 80%;
    background: radial-gradient(circle, rgba(0, 0, 0, 0.3) 20%, rgba(0, 0, 0, 0));
    filter: drop-shadow(0 0 0.1em 0.2em rgba(0, 0, 0, 0.5));
  }

  .widget-content {
    display: flex;
    gap: 0.4em;
  }

  .post-progression {
    display: flex;
    flex-direction: column;
    gap: 0.1em;

    .pair-line {
      display: flex;

      .modernization-slot {
        min-height: 0;
        width: 0.94em;
        aspect-ratio: 1;
        position: relative;

        img {
          display: block;
          pointer-events: none;
          width: 100%;
        }

        &.disabled {
          img {
            filter: brightness(0.5);
          }
        }

        &:not(.disabled) {
          img {
            filter: brightness(1.3);
          }
        }

        &.left {
          img {
            border-top-left-radius: 0.1em;
            border-bottom-left-radius: 0.1em;
          }
        }

        &.right {
          img {
            border-top-right-radius: 0.1em;
            border-bottom-right-radius: 0.1em;
          }
        }

        .current-icon {
          display: none;
        }

        &.current {

          .current-icon {
            position: absolute;
            width: 42%;
            height: 42%;
            top: 5%;
            right: 5%;
          }

          &.left {
            .current-icon {
              left: 5%;
              right: auto;
            }
          }

          &.disabled {
            .current-icon.incorrect {
              display: block;
              $shadow: drop-shadow(0 0 0.1em rgba(254, 0, 0, 1));
              filter: drop-shadow(0 0 0.2em rgba(0, 0, 0, 0.4)) $shadow $shadow;
            }
          }

          &:not(.disabled) {
            .current-icon.correct {
              display: block;
              $shadow: drop-shadow(0 0 0.1em rgba(26, 200, 7, 1));
              filter: drop-shadow(0 0 0.2em rgba(0, 0, 0, 0.4)) $shadow $shadow;
            }
          }
        }
      }
    }
  }

  .equipments-lines {
    display: flex;
    flex-direction: column;
    gap: 0.3em;

    .set-line {
      display: flex;
      flex-direction: row;
      gap: 0.4em;
      align-items: stretch;
      justify-content: center;

      .booster,
      .slot-num {
        margin-bottom: 0.8em;
      }

      .line {
        display: flex;
        flex-direction: row;
        gap: 0.05em;

        .equipment-slot {
          display: flex;
          flex-direction: column;
          align-items: center;

          .specialization {
            height: 1.2em;
            width: 1.2em;
            margin: -0.2em;
          }

        }
      }

      .left-info {
        display: flex;
        flex-direction: column;
        max-width: 1.5em;

        justify-content: center;

        .slot-num {
          min-width: 1em;
          width: 1em;
          height: 1em;
          border-radius: 0.3em;
          background-color: rgba(0, 0, 0, 0.45);
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: -0.2em;

          .num {
            width: 30%;
            filter: drop-shadow(0 0.1em 0.2em rgba(0, 0, 0, 0.8));
            color: rgb(255, 255, 231);
          }
        }
      }
    }
  }

  .equipment {
    height: 2em;
    width: 2em;
  }

  &.compact {
    .equipments-lines {

      .booster,
      .slot-num {
        margin-bottom: 0;
      }

      .left-info {
        justify-content: space-between;

        .slot-num {
          min-width: 0.9em;
          width: 0.9em;
          height: 0.9em;
          border-radius: 0.2em;
        }
      }
    }

    .post-progression {
      .pair-line {
        .modernization-slot {
          width: 0.78em;
        }
      }
    }
  }
}
</style>