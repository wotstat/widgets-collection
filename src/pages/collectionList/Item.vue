<template>
  <div class="item">
    <div class="content">
      <h3>{{ name }}</h3>
      <p class="description">{{ description }}</p>
    </div>
    <div class="preview" v-if="hasSlot">
      <slot></slot>
    </div>
  </div>
</template>


<script setup lang="ts">
const props = defineProps<{
  name: string
  description: string
  hasSlot: boolean
}>();
</script>


<style lang="scss" scoped>
.item {
  display: flex;
  height: 100%;
  gap: 10px;

  .content {
    flex: 1;
    overflow: hidden;

    h3 {
      font-weight: bold;
      font-size: 16px;
    }

    .description {
      font-size: 14px;
      color: #dddddd;

      display: -webkit-box;
      max-width: 400px;
      line-clamp: 4;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

  }

  .preview {
    flex: 1;
    min-width: 150px;
    width: 30%;
    user-select: none;

    :deep(.widgets-sdk-styles) {
      .slot {
        cursor: pointer;
        transition-duration: 0.3s;
        transition-property: transform, box-shadow, border-radius;
        will-change: transform, box-shadow, border-radius;

        &:hover {
          box-shadow: 0 5px 10px #13131337;
          border-radius: 1em;
          transform: scale(1.05) rotate3d(1, 1, 1, 5deg);
        }
      }
    }
  }


  @media screen and (max-width: 420px) {
    flex-direction: column;

    .content {
      .description {
        line-clamp: 0;
        -webkit-line-clamp: 0;
      }
    }

    .preview {
      width: 100%;
    }
  }
}
</style>