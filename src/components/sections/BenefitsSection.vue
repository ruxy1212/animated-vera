<template>
  <div class="section bg-white">
    <div class="grid md:grid-cols-2 h-screen w-screen overflow-hidden select-none">
      <div class="flex flex-col justify-center items-end px-6 pb-32 md:py-12 relative z-10 gap-7" ref="itemsContainer">
        <div 
          v-for="(item, index) in benefits" 
          :key="index"
          ref="benefitItems"
          class="will-change-transform duration-300"
        >
          <BenefitCard v-bind="item" :is-reversed="index % 2 !== 0" />
        </div>
      </div>
      
      <!-- Column 2: Circle -->
      <div class="flex items-center justify-start overflow-visible py-20 pr-20 pl-16 order-first md:order-last">
        <div 
          ref="circleEl"
          class="relative w-full aspect-square bg-av-light-green rounded-full"
        >
          <img 
            ref="handImage"
            class="absolute right-0 bottom-0 scale-125 -translate-[8%]" 
            src="@/assets/images/hand.webp" 
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { gsap } from 'gsap';
import BenefitCard from '@/components/ui/BenefitCard.vue';
import { benefits } from '@/data/benefits';

const itemsContainer = ref<HTMLDivElement | null>(null);
const benefitItems = ref<HTMLDivElement[] | null>(null);
const circleEl = ref<HTMLDivElement | null>(null);
const handImage = ref<HTMLImageElement | null>(null);

const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

const calculateItemPositions = async () => {
  await nextTick();
  
  if (!circleEl.value || !benefitItems.value) return;

  const circleRect = circleEl.value.getBoundingClientRect();
  const r = circleRect.width / 2;
  const cy = circleRect.top + r;

  const IDEAL_GAP = 80;

  benefitItems.value.forEach((el) => {
    const rect = el.getBoundingClientRect();
    const y = rect.top + rect.height / 2 - cy;
    const clampedY = gsap.utils.clamp(-r, r, y);
    const circleLeftEdge = circleRect.left + r - Math.sqrt(r * r - clampedY * clampedY);
    const currentGap = circleLeftEdge - rect.right;
    const deltaX = currentGap - IDEAL_GAP;
    gsap.set(el, { x: Math.max(Math.min(deltaX, isMobile ? 10 : 80), isMobile ? -10 : -80) });
  });
};

onMounted(() => {
  calculateItemPositions();
});

defineExpose({
  itemsContainer,
  benefitItems,
  circleEl,
  handImage,
  calculateItemPositions
});
</script>
