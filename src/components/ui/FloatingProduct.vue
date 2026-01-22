<template>
  <div class="floating-element w-1/2 max-w-100 2xl:max-w-125 z-50" ref="container">
    <img 
      src="@/assets/images/cap.webp" 
      class="relative w-full z-1" 
      ref="capEl"
      :style="{ marginBottom: negativeMargin }" 
    />
    <img 
      src="@/assets/images/no-cap.webp" 
      class="w-full" 
      ref="mainEl" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { gsap } from 'gsap';

const container = ref<HTMLElement | null>(null);
const capEl = ref<HTMLImageElement | null>(null);
const mainEl = ref<HTMLImageElement | null>(null);
const negativeMargin = ref('0px');

const observer = new ResizeObserver((entries) => {
  for (const entry of entries) {
    negativeMargin.value = `-${entry.contentRect.height}px`;
  }
});

const animateIn = () => {
  gsap.fromTo(capEl.value, 
    { y: "-50vh", autoAlpha: 0 },
    { y: 0, autoAlpha: 1, delay: 1.5, duration: 1.5, ease: "power3.out" }
  );

  gsap.fromTo(mainEl.value,
    { y: "50vh", autoAlpha: 0 },
    { y: 0, autoAlpha: 1, delay: 1.5, duration: 1.5, ease: "power3.out" }
  );
};

onMounted(() => {
  if (capEl.value) {
    observer.observe(capEl.value);
  }
});

onUnmounted(() => {
  observer.disconnect();
});

defineExpose({
  container,
  capEl,
  mainEl,
  animateIn
});
</script>
