<template>
  <header class="fixed select-none top-3 2xl:top-7 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 2xl:py-4 w-full max-w-7xl">
    <div class="flex justify-between relative text-av-dark-green" ref="headerContent">
      <ul class="hidden md:flex gap-5 font-inter text-xs md:text-sm lg:text-base 2xl:text-xl">
        <li class="font-medium underline">Home</li>
        <li class="opacity-60">Shop</li>
        <li class="opacity-60">About Us</li>
        <li class="opacity-60">Blog</li>
      </ul>
      <div 
        class="static font-didot text-2xl md:text-3xl 2xl:text-5xl md:absolute top-1/2 md:-translate-y-1/2 left-1/2 md:-translate-x-1/2 grid grid-cols-1 grid-rows-1" 
        ref="titleEl"
      >
        <h1 class="col-start-1 row-start-1">
          VERA
        </h1>
        <h1 ref="titleBold" class="col-start-1 row-start-1 font-bold opacity-0">
          VERA
        </h1>
      </div>
      <div class="hidden md:flex gap-5 font-inter text-xs md:text-sm lg:text-base 2xl:text-xl font-medium">
        <div class="flex gap-5">
          <Bag class="w-6 h-6 2xl:w-7 2xl:h-7" />
          <Cart class="w-6 h-6 2xl:w-7 2xl:h-7" />
        </div>
        <span>Profile</span>
      </div>
      <button class="menu flex md:hidden" aria-label="Open Menu">
        <div class="hamburger"></div>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Bag from '@/components/icons/Bag.vue';
import Cart from '@/components/icons/Cart.vue';

const headerContent = ref<HTMLDivElement | null>(null);
const titleEl = ref<HTMLDivElement | null>(null);
const titleBold = ref<HTMLHeadingElement | null>(null);

defineExpose({
  headerContent,
  titleEl,
  titleBold
});
</script>
