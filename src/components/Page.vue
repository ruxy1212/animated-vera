<template>
  <main>
    <!-- Header -->
    <AppHeader ref="headerRef" />

    <!-- Main Sections -->
    <div class="relative">
      <HeroSection ref="heroSectionRef" />
      <BenefitsSection ref="benefitsSectionRef" />
      <ProductShowcase ref="showcaseRef" />
    </div>

    <!-- Blur overlay while images load -->
    <div 
      v-if="!imagesLoaded" 
      class="fixed inset-0 z-100 bg-av-light-green backdrop-blur-md transition-opacity duration-500"
    ></div>

    <!-- Splash Screen -->
    <SplashScreen ref="splashRef" @complete="onSplashComplete" />

    <!-- Floating Product -->
    <FloatingProduct ref="floatingProductRef" />
  </main>
</template>
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Components
import AppHeader from '@/components/layout/AppHeader.vue';
import SplashScreen from '@/components/SplashScreen.vue';
import FloatingProduct from '@/components/ui/FloatingProduct.vue';
import { HeroSection, BenefitsSection, ProductShowcase } from '@/components/sections';

// Composables
import { useImagePreloader, useScrollControls } from '@/composables';

// Data
import { floatingPositions } from '@/data/positions';
import { CUSTOM_EASE, ANIMATION_DURATION } from '@/data/constants';

// Register GSAP plugins
gsap.registerPlugin(ScrollToPlugin);

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
const secThreeContent = ref<HTMLElement | null>(null);

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
const animateIngredientsIn = () => {
  if (!ingredientsRef.value) return;
  
  const el = ingredientsRef.value;
  const radius = 50;
  const center = { x: -radius, y: 0 };
  const motion = { angle: 0 };

  gsap.set(el, { x: 0, y: 0, scale: 0.3, opacity: 0 });

  const tl = gsap.timeline();
  tl.to(motion, {
    angle: 360,
    delay: 0.8,
    duration: 0.8,
    ease: "none",
    onUpdate() {
      const rad = (motion.angle * Math.PI) / 180;
      gsap.set(el, {
        x: center.x + radius * Math.cos(rad),
        y: center.y + radius * Math.sin(rad)
      });
    }
  }, 0);
  tl.to(el, { scale: 1, delay: 0.8, duration: 0.8, ease: "power3.out" }, 0);
  tl.to(el, { opacity: 1, delay: 0.8, duration: 0.4, ease: "power2.out" }, 0);
};

const animateIngredientsOut = () => {
  if (!ingredientsRef.value) return;
  
  const el = ingredientsRef.value;
  const radius = 50;
  const center = { x: -radius, y: 0 };
  const motion = { angle: 0 };

  gsap.set(el, { x: 0, y: 0, scale: 1, opacity: 1 });

  const tl = gsap.timeline();
  tl.to(motion, {
    angle: -360,
    duration: 0.8,
    ease: "none",
    onUpdate() {
      const rad = (motion.angle * Math.PI) / 180;
      gsap.set(el, {
        x: center.x + radius * Math.cos(rad),
        y: center.y + radius * Math.sin(rad)
      });
    }
  }, 0);
  tl.to(el, { scale: 0.3, duration: 0.8, ease: "power3.out" }, 0);
  tl.to(el, { opacity: 0, duration: 0.4, ease: "power2.in" }, 0.8);
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
    gsap.to(window, { scrollTo: window.innerHeight, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
    if (secTwoCircle.value) {
      gsap.from(secTwoCircle.value, { rotate: 5, delay: 1, duration: 1, ease: CUSTOM_EASE });
    }
    animateFloatingElement(2);
    setTimeout(() => {
      currentStep.value = 2;
      isAnimating.value = false;
    }, 1500);
  }
  // Step 2 -> 3: Scroll to section 3
  else if (currentStep.value === 2 && targetStep === 3) {
    gsap.to(window, { scrollTo: window.innerHeight * 2, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
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
    const targetScroll = Math.max(0, (targetStep - 1) * window.innerHeight);
    gsap.to(window, { scrollTo: targetScroll, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
    
    if (currentStep.value === 3 && targetStep === 2 && headerContentRef.value) {
      gsap.to(headerContentRef.value, { filter: "none", delay: 0.25, duration: 0.85, ease: CUSTOM_EASE });
      if (secTwoCircle.value) {
        gsap.from(secTwoCircle.value, { rotate: 5, delay: 1, duration: 1, ease: CUSTOM_EASE });
      }
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
  if (showcaseRef.value?.contentEl) {
    secThreeContent.value = showcaseRef.value.contentEl;
  }

  // Add scroll handler
  window.addEventListener('scroll', handleScroll, { passive: false });

  // Initial position
  animateFloatingElement(0);
  
  // Load images and start splash
  await loadAllImages();
  playSplash();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>