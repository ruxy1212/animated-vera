<template>
  <div 
    class="fixed top-0 left-1/2 -translate-x-1/2 flex justify-center items-end h-screen z-50" 
    ref="splashContainer"
  >
    <img 
      src="@/assets/images/plant-left.webp" 
      class="h-screen object-cover object-right -mr-[10%]" 
      ref="imageLeft" 
    />
    <img 
      src="@/assets/images/plant-right.webp" 
      class="h-screen object-cover object-left" 
      ref="imageRight" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { gsap } from 'gsap';
import { SPLASH_DURATION, SPLASH_DELAY } from '@/data/constants';

const splashContainer = ref<HTMLDivElement | null>(null);
const imageLeft = ref<HTMLImageElement | null>(null);
const imageRight = ref<HTMLImageElement | null>(null);

const emit = defineEmits<{
  complete: []
}>();

const play = () => {
  if (!splashContainer.value || !imageLeft.value || !imageRight.value) return;

  gsap.to(splashContainer.value, {
    y: '100vh',
    rotationX: 45,
    scale: 1.5,
    duration: SPLASH_DURATION,
    delay: SPLASH_DELAY,
    ease: "power2.inOut",
    onComplete: () => {
      if (splashContainer.value) {
        splashContainer.value.style.display = 'none';
      }
      emit('complete');
    }
  });

  gsap.to(imageLeft.value, {
    rotation: -8,
    x: -80,
    transformOrigin: "bottom right",
    duration: SPLASH_DURATION,
    delay: SPLASH_DELAY,
    ease: "power2.inOut"
  });

  gsap.to(imageRight.value, {
    rotation: 8,
    x: 80,
    transformOrigin: "bottom left",
    duration: SPLASH_DURATION,
    delay: SPLASH_DELAY,
    ease: "power2.inOut"
  });
};

defineExpose({
  play,
  splashContainer,
  imageLeft,
  imageRight
});
</script>
