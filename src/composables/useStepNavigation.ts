import { ref, type Ref } from 'vue';
import { gsap } from 'gsap';
import { floatingPositions } from '@/data/positions';
import { ANIMATION_DURATION, CUSTOM_EASE } from '@/data/constants';

interface StepNavigationOptions {
  floatingEl: Ref<HTMLElement | null>;
  headerRef: Ref<HTMLElement | null>;
  ingredientsRef: Ref<HTMLElement | null>;
  secTwoCircle: Ref<HTMLElement | null>;
  secThreeContent: Ref<HTMLElement | null>;
  isMobile: boolean;
}

export function useStepNavigation(options: StepNavigationOptions) {
  const { floatingEl, headerRef, ingredientsRef, secTwoCircle, secThreeContent, isMobile } = options;

  const isAnimating = ref(false);
  const currentStep = ref(0);
  const splashComplete = ref(false);
  const interactionEnabled = ref(false);

  const animateFloatingElement = (targetStep: number) => {
    if (targetStep < 0 || targetStep >= floatingPositions.length) return;
    
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

  const goToStep = (targetStep: number) => {
    if (!interactionEnabled.value || isAnimating.value || targetStep === currentStep.value || targetStep < 0 || targetStep >= floatingPositions.length) {
      return;
    }

    isAnimating.value = true;
    
    // Step 0 -> 1: Just animate floating element, don't scroll
    if (currentStep.value === 0 && targetStep === 1) {
      animateFloatingElement(1);
      animateIngredientsIn();
      setTimeout(() => {
        currentStep.value = 1;
        isAnimating.value = false;
      }, 1500);
    }
    // Step 1 -> 2: Scroll to section 2 and animate element
    else if (currentStep.value === 1 && targetStep === 2) {
      gsap.to(window, { scrollTo: window.innerHeight, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
      gsap.from(secTwoCircle.value, { rotate: 5, delay: 1, duration: 1, ease: CUSTOM_EASE });
      animateFloatingElement(2);
      setTimeout(() => {
        currentStep.value = 2;
        isAnimating.value = false;
      }, 1500);
    }
    // Step 2 -> 3: Scroll to section 3 and animate element
    else if (currentStep.value === 2 && targetStep === 3) {
      gsap.to(window, { scrollTo: window.innerHeight * 2, duration: ANIMATION_DURATION, ease: CUSTOM_EASE });
      gsap.to(headerRef.value, { filter: 'brightness(0) invert(1)', delay: 0.75, duration: 0.75, ease: CUSTOM_EASE });
      gsap.from(secThreeContent.value, { opacity: 0.7, y: -20, duration: 1.0, delay: 1.0, ease: "power2.out" });
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
      
      if (currentStep.value === 3 && targetStep === 2) {
        gsap.to(headerRef.value, { filter: "none", delay: 0.25, duration: 0.85, ease: CUSTOM_EASE });
        gsap.from(secTwoCircle.value, { rotate: 5, delay: 1, duration: 1, ease: CUSTOM_EASE });
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

  const enableInteraction = () => {
    splashComplete.value = true;
    interactionEnabled.value = true;
  };

  return {
    isAnimating,
    currentStep,
    splashComplete,
    interactionEnabled,
    animateFloatingElement,
    goToStep,
    nextStep,
    prevStep,
    enableInteraction
  };
}
