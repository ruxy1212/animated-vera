import { onMounted, onUnmounted, type Ref } from 'vue';

interface ScrollControlsOptions {
  onScrollDown: () => void;
  onScrollUp: () => void;
  isEnabled: Ref<boolean>;
  isAnimating: Ref<boolean>;
}

export function useScrollControls(options: ScrollControlsOptions) {
  const { onScrollDown, onScrollUp, isEnabled, isAnimating } = options;
  
  let touchStartY = 0;
  let wheelTimeout: ReturnType<typeof setTimeout> | undefined;

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (!isEnabled.value || isAnimating.value) return;
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0) onScrollDown();
      else if (e.deltaY < 0) onScrollUp();
    }, 50);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!isEnabled.value || isAnimating.value) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      onScrollDown();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      onScrollUp();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartY = e.touches[0]?.clientY || 0;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!isEnabled.value || isAnimating.value) return;
    const touchEndY = e.changedTouches[0]?.clientY || 0;
    const deltaY = touchStartY - touchEndY;
    if (Math.abs(deltaY) > 30) {
      if (deltaY > 0) onScrollDown();
      else onScrollUp();
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
  };

  const setupListeners = () => {
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
  };

  const cleanupListeners = () => {
    clearTimeout(wheelTimeout);
    window.removeEventListener('wheel', handleWheel);
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
    document.removeEventListener('touchmove', handleTouchMove);
  };

  onMounted(setupListeners);
  onUnmounted(cleanupListeners);

  return {
    setupListeners,
    cleanupListeners
  };
}
