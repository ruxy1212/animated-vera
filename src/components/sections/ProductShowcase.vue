<template>
  <div 
    class="relative section h-screen bg-cover bg-bottom bg-no-repeat" 
    :style="{ backgroundImage: `url(${bgImage})` }"
  >
    <div 
      class="absolute top-0 left-0 w-full h-[60vh] pointer-events-none"
      style="background: radial-gradient(ellipse 150% 150% at top center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);"
    ></div>
    <div 
      class="w-full h-full flex flex-col text-center items-center relative z-10 p-8 pt-36 md:pt-24 2xl:pt-32 text-white select-none" 
      ref="contentEl"
    >
      <h2 class="font-didot font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl mb-4">
        VERA SKIN NOURISH
      </h2>
      <p class="text-sm md:text-base xl:text-lg 2xl:text-xl mb-4">
        Simple cosmetic jar mockup, it can be downloaded
      </p>
      <button class="px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-2.5 md:py-3.5 lg:py-4 xl:py-5 2xl:py-8 bg-white text-black text-lg xl:text-xl font-bold">
        Buy Now
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import bgImage from '@/assets/images/podium.png';

const contentEl = ref<HTMLDivElement | null>(null);

defineExpose({
  contentEl
});
</script>
