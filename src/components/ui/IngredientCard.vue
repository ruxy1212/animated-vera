<template>
  <div class="flex justify-center items-center flex-col max-w-60">
    <img 
      :src="image" 
      :alt="title" 
      class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" 
    />
    <h3 class="text-base md:text-lg 2xl:text-xl font-semibold text-center">
      {{ title }}
    </h3>
    <p class="text-center text-xs md:text-sm lg:text-base 2xl:text-lg">
      {{ description }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  description: string;
}>();
</script>
