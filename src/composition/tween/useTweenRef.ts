import { ref, Ref, watch } from "vue";

export function useTweenRef(value: Ref<number>, duration: number = 300) {
  const tweenRef = ref(value.value)

  let tweenTarget = tweenRef.value
  let handler: number = 0;
  let tweenStart: number;

  function doTween() {
    if (tweenRef.value == tweenTarget) return handler = 0

    if (handler == 0) {
      tweenStart = performance.now();
    }

    handler = requestAnimationFrame(doTween);
  }

  watch(value, (newValue) => {
    tweenTarget = newValue;

    if (handler) {
      cancelAnimationFrame(handler);
    } else {
      doTween();
    }
  })

  return tweenRef;
}

export function useTweenComputed(effect: () => number) {
  const tweenRef = ref(effect());


  watch(() => effect(), (newValue) => {
    tweenRef.value = newValue;
  })

  return tweenRef;

}