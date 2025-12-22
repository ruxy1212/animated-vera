<template>
  <main>
    <header class="fixed select-none top-3 2xl:top-7 left-1/2 -translate-x-1/2 z-50 px-6 py-2.5 2xl:py-4 w-full max-w-7xl">
      <div class="flex justify-between relative text-av-dark-green" ref="headerRef">
        <ul class="hidden md:flex gap-5 font-inter text-xs md:text-sm lg:text-base 2xl:text-xl">
          <li class="font-medium underline">Home</li>
          <li class="opacity-60">Shop</li>
          <li class="opacity-60">About Us</li>
          <li class="opacity-60">Blog</li>
        </ul>
        <div class="static font-didot text-2xl md:text-3xl 2xl:text-5xl md:absolute top-1/2 md:-translate-y-1/2 left-1/2 md:-translate-x-1/2" ref="headerTitle">VERA</div>
        <div class="hidden md:flex gap-5 font-inter text-xs md:text-sm lg:text-base 2xl:text-xl font-medium">
          <div class="flex gap-5">
            <Bag class="w-6 h-6 2xl:w-7 2xl:h-7" />
            <Cart class="w-6 h-6 2xl:w-7 2xl:h-7" />
          </div>
          <span>Profile</span>
        </div>
        <button class="menu flex md:hidden" aria-label="Open Menu">
          <div class="hamburger"></div>
        </button>
      </div>
    </header>
    <div class="relative">
      <div class="section bg-av-light-green text-av-dark-green w-full">
        <div class="w-full h-full relative z-1 top-1/3 overflow-hidden" ref="heroText">
          <AutoScale text="NOURISH"/>
        </div>
        <div class="absolute left-1/2 top-[47%] md:top-[52%] -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-7xl">
          <div ref="ingredientsRef" class="opacity-0">
            <div class="flex justify-between gap-10">
              <div class="flex justify-center items-center flex-col max-w-60">
                <img src="@/assets/images/sm-aloe-one.png" alt="Aloe Vera Extract" class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" />
                <h3 class="text-base md:text-lg 2xl:text-xl font-semibold text-center">Aloe Vera Extract</h3>
                <p class="text-center text-xs md:text-sm lg:text-base 2xl:text-lg">Provides hydration, soothes irritation, and promotes healing.</p>
              </div>
              <div class="flex justify-center items-center flex-col max-w-60">
                <img src="@/assets/images/sm-squalane-two.png" alt="Squalane" class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" />
                <h3 class="text-base md:text-lg 2xl:text-xl font-semibold text-center">Squalane</h3>
                <p class="text-center text-xs md:text-sm lg:text-base 2xl:text-lg">Helps maintain skin's moisture balance and improves skin texture.</p>
              </div>
            </div>
            <div class="flex justify-between pt-[30%] md:pt-[50%] lg:pt-10 px-[5%] gap-10">
              <div class="flex justify-center items-center flex-col max-w-60">
                <img src="@/assets/images/sm-vitamin-three.png" alt="Vitamin E" class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" />
                <h3 class="text-base md:text-lg 2xl:text-xl font-semibold text-center">Vitamin E</h3>
                <p class="text-center text-xs md:text-sm lg:text-base 2xl:text-lg">Acts as an antioxidant, protecting the skin from free radical damage and promoting healing.</p>
              </div>
              <div class="flex justify-center items-center flex-col max-w-60">
                <img src="@/assets/images/sm-green-five.png" alt="Green Tea Extract" class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" />
                <h3 class="text-base md:text-lg 2xl:text-xl font-semibold text-center">Green Tea Extract</h3>
                <p class="text-center text-xs md:text-sm lg:text-base 2xl:text-lg">Contains antioxidants and anti-inflammatory properties that calm and protect the skin.</p>
              </div>
            </div>
            <div class="flex justify-center md:-mt-[10%]">
              <div class="flex justify-center items-center flex-col max-w-60">
                <img src="@/assets/images/sm-shea-four.png" alt="Shea Butter" class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" />
                <h3 class="text-base md:text-lg 2xl:text-xl font-semibold text-center">Shea Butter</h3>
                <p class="text-center text-xs md:text-sm lg:text-base 2xl:text-lg">Offers rich emollients, deeply moisturizing and nourishing the skin.</p>
              </div>
            </div>
          </div>
        </div>
        <div class="absolute rounded-full w-1/4 aspect-square bg-white shadow-[0px_0px_65px_33px] shadow-white opacity-50"></div>
      </div>
      <div class="section bg-white">
        <div class="grid md:grid-cols-2 h-screen w-screen overflow-hidden">
          <div class="flex flex-col justify-center items-end px-6 py-12 relative z-10 gap-7" ref="secTwoContainer">
            <div 
              v-for="(item, index) in secTwo" 
              :key="index"
              ref="secTwoItems"
              class="will-change-transform duration-300"
            >
              <div class="flex items-center gap-1.5">
                <img :alt="item.title" :src="item.image" class="w-14 md:w-16 lg:w-20 xl:w-24 2xl:w-32" />
                <div class="flex flex-col gap-1.5">
                  <h3 class="text-base md:text-lg 2xl:text-xl font-semibold">{{ item.title }}</h3>
                  <p class="text-xs md:text-sm lg:text-base 2xl:text-lg">{{ item.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Column 2: Circle -->
          <div class="flex items-center justify-start overflow-visible py-20 pr-20 pl-16 order-first md:order-last">
            <div 
              ref="secTwoCircle"
              class="relative w-full aspect-square bg-av-light-green rounded-full"
            >
            <img class="absolute right-0 bottom-0 scale-125 -translate-[8%]" src="@/assets/images/hand.png" />
          </div>
          </div>
        </div>
      </div>
      <div class="relative section h-screen w-screen bg-cover bg-bottom bg-no-repeat" :style="{ backgroundImage: `url(${bgImage})` }">
        <div class="absolute top-0 left-0 w-full h-[60vh] pointer-events-none"
            style="background: radial-gradient(ellipse 150% 150% at top center, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%);">
        </div>
        <div class="w-full h-full flex flex-col text-center items-center relative z-10 p-8 pt-36 md:pt-24 2xl:pt-32 text-white" ref="secThreeContent">
          <h2 class="font-didot font-bold text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-7xl mb-4">VERA SKIN NOURISH</h2>
          <p class="text-sm md:text-base xl:text-lg 2xl:text-xl mb-4">Simple cosmetic jar mockup, it can be downloaded</p>
          <button class="px-6 md:px-8 lg:px-10 xl:px-14 2xl:px-20 py-2.5 md:py-3.5 lg:py-4 xl:py-5 2xl:py-8 bg-white text-black text-lg xl:text-xl font-bold">Buy Now</button>
        </div>
      </div>
    </div>

    <div class="fixed top-0 left-1/2 -translate-x-1/2 flex justify-center items-end h-screen" ref="splashRef">
      <img src="@/assets/images/plant-left.png" class="h-screen object-cover" ref="imageLeft" />
      <img src="@/assets/images/plant-right.png" class="h-screen object-cover" ref="imageRight" />
    </div>
    <div class="floating-element w-1/2 max-w-100 2xl:max-w-125 z-50" ref="floatingEl">
      <img src="@/assets/images/cap.png" class="relative w-full z-1" ref="floatingCap" :style="{ marginBottom: negativeMargin }" />
      <img src="@/assets/images/no-cap.png" class="w-full" ref="floatingMain" />
    </div>
  </main>
</template>
<script setup lang="ts">
  import { onMounted, onUnmounted, ref, nextTick } from 'vue';
  import { gsap } from 'gsap';
  import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
  import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
  import AutoScale from '@/components/texts/AutoScale.vue';
  import Bag from '@/components/icons/Bag.vue';
  import Cart from '@/components/icons/Cart.vue';
  import bgImage from '@/assets/images/podium.png'

  // Register the plugin
  gsap.registerPlugin(ScrollToPlugin);
  gsap.registerPlugin(MotionPathPlugin);

  // const sections = ref([]);
  const floatingEl = ref<HTMLElement | null>(null);
  const splashRef = ref<HTMLDivElement | null>(null);
  const imageLeft = ref<HTMLImageElement | null>(null);
  const imageRight = ref<HTMLImageElement | null>(null);
  const headerRef = ref<HTMLDivElement | null>(null);
  const headerTitle = ref<HTMLDivElement | null>(null);
  const heroText = ref<HTMLDivElement | null>(null);
  const floatingCap = ref<HTMLImageElement | null>(null);
  const floatingMain = ref<HTMLImageElement | null>(null);
  const ingredientsRef = ref<HTMLDivElement | null>(null);

  const secThreeContent = ref<HTMLDivElement | null>(null);
  const secTwoItems = ref<HTMLDivElement[] | null>(null);
  const secTwoCircle = ref<HTMLDivElement | null>(null);

  const negativeMargin = ref('0px');
  const observer = new ResizeObserver((entries) => {
    for (let entry of entries) {
      // Set margin to negative height
      negativeMargin.value = `-${entry.contentRect.height}px`;
    }
  });

  let isAnimating = ref(false);
  let currentStep = ref(0); // 0 = initial, 1 = faded in at section 1, 2 = section 2, 3 = section 3
  let splashComplete = ref(false);
  let interactionEnabled = ref(false);

  const isMobile = window.innerWidth < 600;
  const positions = ref([
    { top: 50, left: 50, opacity: 1, scale: 1.0, rotation: 0 },
    { top: 40, left: 50, opacity: 1, scale: 0.8, rotation: 0 },
    { top: 42, left: 70, opacity: 1, scale: 0.5, rotation: -9 },
    { top: '70vh', left: 50, opacity: 1, scale: 0.8, rotation: 0 }
  ]);

  const secTwo = ref([
    {
      image: new URL('@/assets/images/sec-two-one.png', import.meta.url).href,
      title: 'Deep Hydration',
      description: 'Provides long-lasting moisture, keeping skin soft and smooth.'
    },
    {
      image: new URL('@/assets/images/sec-two-two.png', import.meta.url).href,
      title: 'Soothes Irritated Skin',
      description: 'Calms redness and irritation, perfect for sensitive skin.'
    },
    {
      image: new URL('@/assets/images/sec-two-three.png', import.meta.url).href,
      title: 'Promotes Skin Healing',
      description: 'Enhances healing of minor cuts, burns, and blemishes.'
    },
    {
      image: new URL('@/assets/images/sec-two-four.png', import.meta.url).href,
      title: 'Rich in Antioxidants',
      description: 'Fights aging and repairs skin with essential vitamins.'
    }
  ])

  const customEase = "power1.inOut";

  // Splash screen animation on load
  function playSplashScreen() {
    if (!splashRef.value || !imageLeft.value || !imageRight.value || !headerTitle.value) return;
    // Animate splash text: fade in, scale up, slide down
    gsap.to(splashRef.value, {
      y: '100vh',
      rotationX: 45,
      scale: 1.5,
      duration: 2.5,
      delay: 1,
      ease: "power2.inOut",
      onComplete: () => {
        if(splashRef.value)
          splashRef.value.style.display = 'none';
        splashComplete.value = true;
        interactionEnabled.value = true;
      }
    });

    gsap.to(imageLeft.value, {
      rotation: -100,
      transformOrigin: "bottom right",
      duration: 2.5,
      delay: 1,
      ease: "power2.inOut"
    });

    gsap.to(imageRight.value, {
      rotation: 100,
      transformOrigin: "bottom left",
      duration: 2.5,
      delay: 1,
      ease: "power2.inOut"
    });

    gsap.to(headerTitle.value, {
      fontWeight: 700,
      delay: 2,
      duration: 1.0
    });

    gsap.to(heroText.value, {
      opacity: 0.08,
      duration: 1.0,
      delay: 2
    });

    gsap.fromTo(floatingCap.value, {
      y: "-50vh",
      autoAlpha: 0
    },
    {
      y: 0,
      autoAlpha: 1,
      delay: 1.5,
      duration: 1.5,
      ease: "power3.out"
    });

    gsap.fromTo(floatingMain.value, {
      y: "50vh",
      autoAlpha: 0
    },
    {
      y: 0,
      autoAlpha: 1,
      delay: 1.5,
      duration: 1.5,
      ease: "power3.out"
    });
  }

  // Animate floating element to a specific step
  function animateFloatingElement(targetStep: number) {
    if (!positions.value || targetStep < 0 || targetStep >= positions.value.length) return;
    
    const pos = positions.value[targetStep];
    if (!pos) return;
    const nTop = isMobile && targetStep === 2 ? '21%' : typeof pos.top === 'string' ? pos.top : `${pos.top}%`;
    const nLeft = isMobile && targetStep === 2 ? '42%' : typeof pos.left === 'string' ? pos.left : `${pos.left}%`
    gsap.to(floatingEl.value, {
      top: nTop,
      left: nLeft,
      xPercent: -50,
      yPercent: -50,
      rotation: pos.rotation,
      opacity: pos.opacity,
      scale: pos.scale,
      duration: 1.5,
      ease: customEase
    });
  }

  // Handle step progression
  const goToStep = (targetStep: number) => {
    if (!interactionEnabled.value || isAnimating.value || targetStep === currentStep.value || targetStep < 0 || targetStep >= positions.value.length) {
      return;
    }

    isAnimating.value = true;
    
    // Step 0 -> 1: Just animate floating element, don't scroll
    if (currentStep.value === 0 && targetStep === 1) {
      animateFloatingElement(1);
      if(ingredientsRef.value) {
        const el = ingredientsRef.value
        const radius = 50
        const center = { x: -radius, y: 0 }
        const motion = { angle: 0 }

        gsap.set(el, {
          x: 0,
          y: 0,
          scale: 0.5,
          opacity: 0
        })

        const tl = gsap.timeline()
        tl.to(motion, {
          angle: 360,
          delay: 0.8,
          duration: 0.8,
          ease: "none",
          onUpdate() {
            const rad = (motion.angle * Math.PI) / 180
            gsap.set(el, {
              x: center.x + radius * Math.cos(rad),
              y: center.y + radius * Math.sin(rad)
            })
          }
        }, 0)

        tl.to(el, {
          scale: 1,
          delay: 0.8,
          duration: 0.8,
          ease: "power3.out"
        }, 0)

        tl.to(el, {
          opacity: 1,
          delay: 0.8,
          duration: 0.4,
          ease: "power2.out"
        }, 0);
      }
      setTimeout(() => {
        currentStep.value = 1;
        isAnimating.value = false;
      }, 1500);
    }
    // Step 1 -> 2: Scroll to section 2 and animate element
    else if (currentStep.value === 1 && targetStep === 2) {
      gsap.to(window, {
        scrollTo: window.innerHeight,
        duration: 1.5,
        ease: customEase
      });
      gsap.from(secTwoCircle.value, {
        rotate: 5,
        delay: 1,
        duration: 1,
        ease: customEase
      });
      animateFloatingElement(2);
      setTimeout(() => {
        currentStep.value = 2;
        isAnimating.value = false;
      }, 1500);
    }
    // Step 2 -> 3: Scroll to section 3 and animate element
    else if (currentStep.value === 2 && targetStep === 3) {
      gsap.to(window, {
        scrollTo: window.innerHeight * 2,
        duration: 1.5,
        ease: customEase
      });
      gsap.to(headerRef.value, {
        filter: 'brightness(0) invert(1)',
        delay: 0.75,
        duration: 0.75,
        ease: customEase
      });
      // secThreeContent
      gsap.from(secThreeContent.value, {
        opacity: 0.7,
        y: -20,
        duration: 1.0,
        delay: 1.0,
        ease: "power2.out"
      });
      animateFloatingElement(3);
      setTimeout(() => {
        currentStep.value = 3;
        isAnimating.value = false;
      }, 1500);
    }
    // Going backwards
    else if (targetStep < currentStep.value) {
      const targetScroll = Math.max(0, (targetStep - 1) * window.innerHeight);
      gsap.to(window, {
        scrollTo: targetScroll,
        duration: 1.5,
        ease: customEase
      });
      if (currentStep.value === 3 && targetStep === 2) {
        if (headerRef.value) {
          gsap.to(headerRef.value, {
            filter: "none",
            delay: 0.25,
            duration: 0.85,
            ease: customEase
          }); 
        }

        if(secTwoCircle.value) {
          gsap.from(secTwoCircle.value, {
            rotate: 5,
            delay: 1,
            duration: 1,
            ease: customEase
          });
        }
      }
      if (currentStep.value === 1 && targetStep === 0 && ingredientsRef.value) {
        const el = ingredientsRef.value
        const radius = 50
        const center = { x: -radius, y: 0 }
        const motion = { angle: 0 }

        gsap.set(el, {
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1
        })

        const tl = gsap.timeline()
        tl.to(motion, {
          angle: -360,
          duration: 0.8,
          ease: "none",
          onUpdate() {
            const rad = (motion.angle * Math.PI) / 180

            gsap.set(el, {
              x: center.x + radius * Math.cos(rad),
              y: center.y + radius * Math.sin(rad)
            })
          }
        }, 0)

        tl.to(el, {
          scale: 0.5,
          duration: 0.8,
          ease: "power3.out"
        }, 0)

        tl.to(el, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in"
        }, 0.8); 
      }
      animateFloatingElement(targetStep);
      setTimeout(() => {
        currentStep.value = targetStep;
        isAnimating.value = false;
      }, 1500);
    }
  };

  const getItemStyle = async () => {
    await nextTick();

    const circleRect = secTwoCircle.value!.getBoundingClientRect();
    const r = circleRect.width / 2;
    const cy = circleRect.top + r;

    const IDEAL_GAP = 80; // px — your desired uniform distance
    if(!secTwoItems.value) return;

    secTwoItems.value.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const y =
        rect.top +
        rect.height / 2 -
        cy;

      const clampedY = gsap.utils.clamp(-r, r, y);

      const circleLeftEdge =
        circleRect.left +
        r -
        Math.sqrt(r * r - clampedY * clampedY);

      const currentGap =
        circleLeftEdge - rect.right;

      const deltaX = currentGap - IDEAL_GAP;
      gsap.set(el, { x: Math.max(Math.min(deltaX, isMobile ? 10 : 80), isMobile ? -10 : -80) });
    });
  }

  // Handle wheel events
  let wheelTimeout: ReturnType<typeof setTimeout> | undefined;
  const handleWheel = (e: WheelEvent) => {
    if (!interactionEnabled.value || isAnimating.value) return;
    
    clearTimeout(wheelTimeout);
    wheelTimeout = setTimeout(() => {
      if (e.deltaY > 0) goToStep(currentStep.value + 1);
      else if (e.deltaY < 0) goToStep(currentStep.value - 1);
    }, 50);
  };

  const handleKeydown = (e: KeyboardEvent) => {
    if (!interactionEnabled.value || isAnimating.value) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      goToStep(currentStep.value + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      goToStep(currentStep.value - 1);
    }
  };

  const handleScroll = () => {
    if (!splashComplete.value) {
      window.scrollTo(0, 0);
    }
  };

  onMounted(() => {
    getItemStyle();
    if (floatingCap.value) observer.observe(floatingCap.value);
    window.addEventListener('wheel', handleWheel, { passive: false });
    document.addEventListener('keydown', handleKeydown);
    window.addEventListener('scroll', handleScroll);

    animateFloatingElement(0);
    playSplashScreen();
  });

  onUnmounted(() => {
    observer.disconnect();
    window.removeEventListener('wheel', handleWheel);
    document.removeEventListener('keydown', handleKeydown);
    window.removeEventListener('scroll', handleScroll);
  });
</script>