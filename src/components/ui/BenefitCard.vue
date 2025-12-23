<template>
  <div class="flex items-center gap-1.5">
    <img 
      :alt="title" 
      :src="image" 
      class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" 
    />
    <div class="flex flex-col gap-1.5">
      <h3 class="text-base md:text-lg 2xl:text-xl font-semibold">
        {{ title }}
      </h3>
      <p class="text-xs md:text-sm lg:text-base 2xl:text-lg">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
}>();
</script>
