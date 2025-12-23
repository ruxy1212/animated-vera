import { ref } from 'vue';
import { imagesToPreload } from '@/data/constants';

export function useImagePreloader() {
  const imagesLoaded = ref(false);

  const preloadImages = (): Promise<void[]> => {
    return Promise.all(
      imagesToPreload.map(src => new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve anyway to not block
        img.src = src;
      }))
    );
  };

  const loadAllImages = async () => {
    await preloadImages();
    imagesLoaded.value = true;
  };

  return {
    imagesLoaded,
    loadAllImages
  };
}
