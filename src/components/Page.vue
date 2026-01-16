<template>
  <main>
    <!-- Blur overlay while images load -->
    <Transition
      leave-active-class="transition duration-200 ease-in"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="!unscrambleIsComplete" 
        class="fixed inset-0 z-100 bg-av-light-green backdrop-blur-md"
      >
        <div class="w-full h-full relative z-1 top-1/3 overflow-hidden" ref="heroTextEl">
          <Unscramble :stop-trigger="imagesLoaded" target-text="VERA SKIN NOURISH" v-model:unscramble-complete="unscrambleIsComplete" />
        </div>
      </div>
    </Transition>
    
    <!-- Header -->
    <AppHeader ref="headerRef" />

    <!-- Main Sections -->
    <div class="relative">
      <HeroSection ref="heroSectionRef" />
      <BenefitsSection ref="benefitsSectionRef" />
      <ProductShowcase ref="showcaseRef" />
    </div>

    <!-- Splash Screen -->
    <SplashScreen ref="splashRef" @complete="onSplashComplete" />

    <!-- Floating Product -->
    <FloatingProduct ref="floatingProductRef" />
  </main>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Components
import AppHeader from '@/components/layout/AppHeader.vue';
import SplashScreen from '@/components/SplashScreen.vue';
import Unscramble from '@/components/Unscramble.vue';
import FloatingProduct from '@/components/ui/FloatingProduct.vue';
// import AutoScale from '@/components/texts/AutoScale.vue';
import { HeroSection, BenefitsSection, ProductShowcase } from '@/components/sections';

// Composables
import { useImagePreloader, useScrollControls } from '@/composables';

// Data
import { floatingPositions } from '@/data/positions';
import { CUSTOM_EASE, ANIMATION_DURATION } from '@/data/constants';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin, MotionPathPlugin);

// Device detection
const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

// Component refs
const headerRef = ref<InstanceType<typeof AppHeader> | null>(null);
const heroSectionRef = ref<InstanceType<typeof HeroSection> | null>(null);
const benefitsSectionRef = ref<InstanceType<typeof BenefitsSection> | null>(null);
const showcaseRef = ref<InstanceType<typeof ProductShowcase> | null>(null);
const splashRef = ref<InstanceType<typeof SplashScreen> | null>(null);
const floatingProductRef = ref<InstanceType<typeof FloatingProduct> | null>(null);

// State refs for navigation (needed for composables)
const floatingEl = ref<HTMLElement | null>(null);
const headerContentRef = ref<HTMLElement | null>(null);
const ingredientsRef = ref<HTMLElement | null>(null);
const secTwoCircle = ref<HTMLElement | null>(null);
const secTwoItemsContainer = ref<HTMLElement | null>(null);
const secThreeContent = ref<HTMLElement | null>(null);

// Unscramble state
const unscrambleIsComplete = ref(false);

// Composables
const { imagesLoaded, loadAllImages } = useImagePreloader();

// Step navigation state
const isAnimating = ref(false);
const currentStep = ref(0);
const splashComplete = ref(false);
const interactionEnabled = ref(false);

// Animate floating element to a specific step
const animateFloatingElement = (targetStep: number) => {
  if (targetStep < 0 || targetStep >= floatingPositions.length || !floatingEl.value) return;
  
  const pos = floatingPositions[targetStep];
  if (!pos) return;
  
  const nTop = isMobile && targetStep === 2 ? '21%' : typeof pos.top === 'string' ? pos.top : `${pos.top}%`;
  const nLeft = isMobile && targetStep === 2 ? '42%' : typeof pos.left === 'string' ? pos.left : `${pos.left}%`;
  
  gsap.to(floatingEl.value, {
    top: nTop,
    left: nLeft,
    xPercent: -50,
    yPercent: -50,
    rotation: pos.rotation,
    opacity: pos.opacity,
    scale: pos.scale,
    duration: ANIMATION_DURATION,
    ease: CUSTOM_EASE
  });
};

// Ingredients animation helpers
const animateIngredientItem = (el: Element, delay: number, isIn: boolean) => {
  gsap.set(el, { clearProps: "x,y" });
  const container = ingredientsRef.value;
  if (!container) return;

  const containerRect = container.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  
  // Center of the container (screen center)
  const centerX = containerRect.width / 2;
  const centerY = containerRect.height / 2;
  
  // Element's natural position relative to container
  const elCenterX = elRect.left - containerRect.left + elRect.width / 2;
  const elCenterY = elRect.top - containerRect.top + elRect.height / 2;
  
  // Offset from center to element's position (this is what we animate FROM on entry)
  const offsetX = centerX - elCenterX;
  const offsetY = centerY - elCenterY;
  
  // Direction vector from center to element's final position (normalized)
  const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
  const dirX = -offsetX / distance;
  const dirY = -offsetY / distance;
  
  // Perpendicular vector (rotated 90° counterclockwise for anticlockwise arc)
  // For anticlockwise: perpendicular is (-dirY, dirX)
  const perpX = -dirY;
  const perpY = dirX;
  
  // Arc offset amount
  const arcAmount = distance * 0.3;
  
  // Midpoint along the path, offset perpendicular for arc curve
  const midX = offsetX * 0.5 + perpX * arcAmount;
  const midY = offsetY * 0.5 + perpY * arcAmount;

  if (isIn) {
    // Start at center, animate to natural position with anticlockwise arc
    gsap.set(el, { x: offsetX, y: offsetY, scale: 0.3, opacity: 0 });
    const tl = gsap.timeline({ delay });
    tl.to(el, { 
      x: 0, 
      y: 0, 
      duration: 0.5, 
      ease: "power2.out",
      motionPath: {
        path: [
          { x: offsetX, y: offsetY },
          { x: midX, y: midY },
          { x: 0, y: 0 }
        ],
        curviness: 1.5
      }
    }, 0);
    tl.to(el, { scale: 1, duration: 0.5, ease: "power3.out" }, 0);
    tl.to(el, { opacity: 1, duration: 0.25, ease: "power2.out" }, 0);
  } else {
    // Start at natural position, animate back to center with clockwise arc
    gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1 });
    const tl = gsap.timeline({ delay });
    tl.to(el, { 
      x: offsetX, 
      y: offsetY, 
      duration: 0.5, 
      ease: "power2.in",
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: midX, y: midY },
          { x: offsetX, y: offsetY }
        ],
        curviness: 1.5
      }
    }, 0);
    tl.to(el, { scale: 0.3, duration: 0.5, ease: "power3.out" }, 0);
    tl.to(el, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.25);
  }
};

const animateIngredientsIn = () => {
  if (!ingredientsRef.value) return;
  
  gsap.set(ingredientsRef.value, { opacity: 1 });
  let items = ingredientsRef.value.querySelectorAll(':scope > div > div');

  const order = [0, 2, 4, 3, 1];
  order.forEach((i, n) => {
    const item = items[i];
    if (!item) return;

    animateIngredientItem(item, 0.5 + n * 0.125, true);
  });
};

const animateIngredientsOut = () => {
  if (!ingredientsRef.value) return;
  
  const items = Array.from(ingredientsRef.value.querySelectorAll(':scope > div > div'));
  const order = [1, 3, 4, 2, 0];
  order.forEach((i, n) => {
    const item = items[i];
    if (!item) return;
    animateIngredientItem(item, n * 0.125, false);
  });
};

// Animate section 2 items container with arc motion
const animateSecTwoItemsIn = () => {
  if (!secTwoItemsContainer.value) return;
  
  // Start from y: 20, opacity: 0 with an arc motion
  gsap.fromTo(secTwoItemsContainer.value, 
    { y: 0, opacity: 0 },
    { 
      y: 0,
      opacity: 1,
      duration: 2.0, 
      delay: 0.5,
      ease: "power2.out",
      motionPath: {
        path: [
          { x: 0, y: 0 },
          { x: 15, y: 20 },
          { x: 0, y: 40 },
          { x: -15, y: 20 },
          { x: 0, y: 0 }
        ],
        curviness: 1.2
      }
    }
  );
};

// Step navigation
const goToStep = (targetStep: number) => {
  if (!interactionEnabled.value || isAnimating.value || targetStep === currentStep.value || targetStep < 0 || targetStep >= floatingPositions.length) {
    return;
  }

  isAnimating.value = true;
  
  // Step 0 -> 1: Animate floating element and show ingredients
  if (currentStep.value === 0 && targetStep === 1) {
    animateFloatingElement(1);
    animateIngredientsIn();
    setTimeout(() => {
      currentStep.value = 1;
      isAnimating.value = false;
    }, 1500);
  }
  // Step 1 -> 2: Scroll to section 2
  else if (currentStep.value === 1 && targetStep === 2) {
    const sectionEl = benefitsSectionRef.value?.$el as HTMLElement;
    const scrollTarget = sectionEl ? sectionEl.offsetTop : window.innerHeight;
    gsap.to(window, { scrollTo: scrollTarget, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
    if (secTwoCircle.value) {
      gsap.from(secTwoCircle.value, { rotate: 5, delay: 1, duration: 1, ease: CUSTOM_EASE });
    }
    animateSecTwoItemsIn();
    animateFloatingElement(2);
    setTimeout(() => {
      currentStep.value = 2;
      isAnimating.value = false;
    }, 1500);
  }
  // Step 2 -> 3: Scroll to section 3
  else if (currentStep.value === 2 && targetStep === 3) {
    const sectionEl = showcaseRef.value?.$el as HTMLElement;
    const scrollTarget = sectionEl ? sectionEl.offsetTop : window.innerHeight * 2;
    gsap.to(window, { scrollTo: scrollTarget, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
    if (headerContentRef.value) {
      gsap.to(headerContentRef.value, { filter: 'brightness(0) invert(1)', delay: 0.75, duration: 0.75, ease: CUSTOM_EASE });
    }
    if (secThreeContent.value) {
      gsap.from(secThreeContent.value, { opacity: 0.7, y: -20, duration: 1.0, delay: 1.0, ease: "power2.out" });
    }
    animateFloatingElement(3);
    setTimeout(() => {
      currentStep.value = 3;
      isAnimating.value = false;
    }, 1500);
  }
  // Going backwards
  else if (targetStep < currentStep.value) {
    // Calculate scroll target based on target step
    let targetScroll = 0;
    if (targetStep === 2) {
      const sectionEl = benefitsSectionRef.value?.$el as HTMLElement;
      targetScroll = sectionEl ? sectionEl.offsetTop : window.innerHeight;
    } else if (targetStep === 1) {
      const sectionEl = heroSectionRef.value?.$el as HTMLElement;
      targetScroll = sectionEl ? sectionEl.offsetTop : 0;
    }
    // Step 1 -> 0 doesn't require scroll
    
    if (currentStep.value !== 1 || targetStep !== 0) {
      gsap.to(window, { scrollTo: targetScroll, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
    }
    
    if (currentStep.value === 3 && targetStep === 2 && headerContentRef.value) {
      gsap.to(headerContentRef.value, { filter: "none", delay: 0.25, duration: 0.85, ease: CUSTOM_EASE });
      if (secTwoCircle.value) {
        gsap.from(secTwoCircle.value, { rotate: 5, delay: 1, duration: 1, ease: CUSTOM_EASE });
      }
      animateSecTwoItemsIn();
    }
    
    if (currentStep.value === 1 && targetStep === 0) {
      animateIngredientsOut();
    }
    
    animateFloatingElement(targetStep);
    setTimeout(() => {
      currentStep.value = targetStep;
      isAnimating.value = false;
    }, 1500);
  }
};

const nextStep = () => goToStep(currentStep.value + 1);
const prevStep = () => goToStep(currentStep.value - 1);

// Use scroll controls composable
useScrollControls({
  onScrollDown: nextStep,
  onScrollUp: prevStep,
  isEnabled: interactionEnabled,
  isAnimating
});

// Handle scroll during splash
const handleScroll = (e: Event) => {
  e.preventDefault();
  if (!splashComplete.value) {
    window.scrollTo(0, 0);
  }
};

// Splash complete handler
const onSplashComplete = () => {
  splashComplete.value = true;
  interactionEnabled.value = true;
};

// Splash screen animation
const playSplash = () => {
  if (!splashRef.value || !headerRef.value || !heroSectionRef.value || !floatingProductRef.value) return;

  // Play splash animation
  splashRef.value.play();
  
  // Animate header title
  if (headerRef.value.titleEl) {
    gsap.to(headerRef.value.titleEl, { fontWeight: 700, delay: 2, duration: 1.0 });
  }
  
  // Fade hero text
  if (heroSectionRef.value.heroTextEl) {
    gsap.to(heroSectionRef.value.heroTextEl, { opacity: 0.08, duration: 1.0, delay: 2 });
  }
  
  // Animate floating product in
  floatingProductRef.value.animateIn();
};

onMounted(async () => {
  // Set up element refs after components mount
  if (floatingProductRef.value?.container) {
    floatingEl.value = floatingProductRef.value.container;
  }
  if (headerRef.value?.headerContent) {
    headerContentRef.value = headerRef.value.headerContent;
  }
  if (heroSectionRef.value?.ingredientsContainer) {
    ingredientsRef.value = heroSectionRef.value.ingredientsContainer;
  }
  if (benefitsSectionRef.value?.circleEl) {
    secTwoCircle.value = benefitsSectionRef.value.circleEl;
  }
  if (benefitsSectionRef.value?.itemsContainer) {
    secTwoItemsContainer.value = benefitsSectionRef.value.itemsContainer;
  }
  if (showcaseRef.value?.contentEl) {
    secThreeContent.value = showcaseRef.value.contentEl;
  }

  // Add scroll handler
  window.addEventListener('scroll', handleScroll, { passive: false });

  // Initial position
  animateFloatingElement(0);
  
  // Load images
  await loadAllImages();
});

// Watch for unscramble completion to start splash animation
watch(unscrambleIsComplete, (isComplete) => {
  if (isComplete) {
    playSplash();
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>