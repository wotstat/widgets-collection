<template>
  <InsetsWrapper :insets="15" class="edge-mask" :class="{ ...stateClasses }">
    <div class="main preview-card bongo-cat-widget-root">
      <BongoCat :class="{ ...classes }" />
    </div>
  </InsetsWrapper>
</template>


<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue';
import { useStateClass } from '@/composition/utils/useStateClass';
import { Background, Eye, Mouth, UnderLeg } from './define.widget';
import BongoCat from "./bongo-cat.svg";
import { computed } from 'vue';

const stateClasses = useStateClass()
const props = defineProps<{
  background: Background[],
  underLeg: UnderLeg[],
  leftEye: Eye,
  rightEye: Eye,
  mouth: Mouth,
  left: 'up' | 'down',
  right: 'up' | 'down',
  flipX: boolean,
  flipY: boolean,
}>()

const classes = computed(() => {
  return {
    ...Object.fromEntries(props.background.map((bg) => [`background-${bg}`, true])),
    ...Object.fromEntries(props.underLeg.map((leg) => [`under-leg-${leg}`, true])),
    [`eye-left-${props.leftEye}`]: true,
    [`eye-right-${props.rightEye}`]: true,
    [`mouth-${props.mouth}`]: true,
    [`left-${props.left}`]: true,
    [`right-${props.right}`]: true,
    'flip-x': props.flipX,
    'flip-y': props.flipY,
  }
})

</script>


<style lang="scss" scoped>
.main {
  font-size: 2.5em;
  border-radius: 1em;

  svg {
    margin: -21%;
    margin-bottom: -29%;
  }
}
</style>

<style lang="scss">
.bongo-cat-widget-root {

  .bongo-cat {
    .background {
      .tour-eiffel {
        display: none;
      }
    }

    .cat {
      .under-legs {
        .baguette {
          display: none;
        }
      }

      .body {
        .eyes {

          .l-x,
          .r-x,
          .l-close,
          .r-close,
          .l-normal,
          .r-normal {
            display: none;
          }
        }

        .mouth {

          .dot,
          .normal,
          .x,
          .o {
            display: none;
          }
        }
      }

      .l-up,
      .l-down,
      .r-up,
      .r-down {
        display: none;
      }
    }
  }


  .flip-x {
    transform: scaleX(-1);
  }

  .flip-y {
    transform: scaleY(-1);
  }

  .flip-x.flip-y {
    transform: scale(-1, -1);
  }

  .background-tour-eiffel .bongo-cat .background .tour-eiffel {
    display: block;
  }

  .under-leg-baguette .bongo-cat .cat .under-legs .baguette {
    display: block;
  }

  .eye-left-x .bongo-cat .cat .eyes .l-x,
  .eye-right-x .bongo-cat .cat .eyes .r-x,
  .eye-left-close .bongo-cat .cat .eyes .l-close,
  .eye-right-close .bongo-cat .cat .eyes .r-close,
  .eye-left-normal .bongo-cat .cat .eyes .l-normal,
  .eye-right-normal .bongo-cat .cat .eyes .r-normal {
    display: block;
  }

  .mouth-dot .bongo-cat .cat .mouth .dot,
  .mouth-normal .bongo-cat .cat .mouth .normal,
  .mouth-x .bongo-cat .cat .mouth .x,
  .mouth-o .bongo-cat .cat .mouth .o {
    display: block;
  }

  .left-up .bongo-cat .cat .l-up,
  .left-down .bongo-cat .cat .l-down,
  .right-up .bongo-cat .cat .r-up,
  .right-down .bongo-cat .cat .r-down {
    display: block;
  }


}
</style>