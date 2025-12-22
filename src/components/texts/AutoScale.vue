<template>
  <div ref="container" class="w-full items-center justify-center">
    <h1 ref="textElement" class="font-didot font-bold">{{text}}</h1>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted, onUnmounted } from 'vue'
  import { autoTextSize } from 'auto-text-size'

  defineProps<{ text: string }>()

  const container = ref<HTMLDivElement | null>(null);
  const textElement = ref<HTMLHeadingElement | null>(null);
  let updateTextSize: ReturnType<typeof autoTextSize> | undefined;
  onMounted(() => {
    if (container.value && textElement.value) {
      updateTextSize = autoTextSize({
        innerEl: textElement.value,
        containerEl: container.value,
        mode: 'oneline', // Adjust mode as needed: 'oneline', 'multiline', 'box', or 'boxoneline'
        minFontSizePx: 158,
        maxFontSizePx: 400,
      });
      updateTextSize(); // Initial resize
    }
  });

  onUnmounted(() => {
    if (updateTextSize) {
      updateTextSize.disconnect(); // Clean up resize observer
    }
  });
</script>