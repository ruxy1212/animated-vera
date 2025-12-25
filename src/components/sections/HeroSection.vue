<template>
  <div class="section bg-av-light-green text-av-dark-green w-full">
    <div class="w-full h-full relative z-1 top-1/3 overflow-hidden" ref="heroTextEl">
      <AutoScale text="NOURISH"/>
    </div>
    <div class="absolute left-1/2 top-[47%] md:top-[52%] -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-7xl select-none">
      <div ref="ingredientsContainer" class="opacity-0 lg:px-8">
        <div class="flex justify-between gap-10">
          <IngredientCard 
            v-for="ingredient in topIngredients" 
            :key="ingredient.title"
            v-bind="ingredient"
          />
        </div>
        <div class="flex justify-between pt-[30%] md:pt-[50%] lg:pt-10 px-[5%] gap-10">
          <IngredientCard 
            v-for="ingredient in middleIngredients" 
            :key="ingredient.title"
            v-bind="ingredient"
          />
        </div>
        <div class="flex justify-center md:-mt-[10%]">
          <IngredientCard 
            v-for="ingredient in bottomIngredients" 
            :key="ingredient.title"
            v-bind="ingredient"
          />
        </div>
      </div>
    </div>
    <div class="absolute rounded-full w-1/4 aspect-square bg-white shadow-[0px_0px_65px_33px] shadow-white opacity-50"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import AutoScale from '@/components/texts/AutoScale.vue';
import IngredientCard from '@/components/ui/IngredientCard.vue';
import { ingredients } from '@/data/ingredients';

const heroTextEl = ref<HTMLDivElement | null>(null);
const ingredientsContainer = ref<HTMLDivElement | null>(null);

// Split ingredients for layout
const topIngredients = computed(() => ingredients.slice(0, 2));
const middleIngredients = computed(() => ingredients.slice(2, 4));
const bottomIngredients = computed(() => ingredients.slice(4, 5));

defineExpose({
  heroTextEl,
  ingredientsContainer
});
</script>
