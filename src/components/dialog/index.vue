<script lang="ts" setup>
import { type CSSProperties, computed, nextTick, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  visible: boolean
  width?: number
  closeButton?: boolean
  closeOnClickMask?: boolean
  closeOnEsc?: boolean
  contentStyle?: CSSProperties
}>(), {
  width: 480,
  closeButton: true,
  closeOnClickMask: true,
  closeOnEsc: true,
})

const emit = defineEmits<{
  (event: 'update:visible', payload: boolean): void
  (event: 'closed'): void
}>()

const modalRef = ref<HTMLDivElement>()

const contentVisible = ref(false)

const contentStyle = computed(() => {
  return {
    width: `${props.width}px`,
    ...(props.contentStyle || {}),
  }
})

watch(() => props.visible, () => {
  if (props.visible)
    nextTick(() => modalRef.value!.focus())
})

const close = () => {
  emit('update:visible', false)
  emit('closed')
}

const onEsc = () => {
  if (props.visible && props.closeOnEsc)
    close()
}

const onClickMask = () => {
  if (props.closeOnClickMask)
    close()
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-show="visible" ref="modalRef" class="modal_mask_common modal" tabindex="-1" @keyup.esc="onEsc()">
        <div class="modal_mask_common absolute bg-black/[.25] " @click="onClickMask()" />
        <Transition
          name="modal-zoom"
          @afterLeave="contentVisible = false"
          @before-enter="contentVisible = true"
        >
          <div v-show="visible" class="modal-content" :style="contentStyle">
            <span v-if="closeButton" class="close-btn" @click="close()"><IconClose /></span>
            <slot v-if="contentVisible" />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
@import url('./index.css');

.modal-fade-enter-active {
  animation: modal-fade-enter .25s both ease-in;
}
.modal-fade-leave-active {
  animation: modal-fade-leave .25s both ease-out;
}
.modal-zoom-enter-active {
  animation: modal-zoom-enter .25s both cubic-bezier(.4, 0, 0, 1.5);
}
.modal-zoom-leave-active {
  animation: modal-zoom-leave .25s both;
}

@keyframes modal-fade-enter {
  from {
    opacity: 0;
  }
}
@keyframes modal-fade-leave {
  to {
    opacity: 0;
  }
}
@keyframes modal-zoom-enter {
  from {
    transform: scale3d(.3, .3, .3);
  }
}
@keyframes modal-zoom-leave {
  to {
    transform: scale3d(.3, .3, .3);
  }
}
</style>
