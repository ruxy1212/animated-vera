<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
const emit = defineEmits(['update:unscrambleComplete']);

// ===== CONFIGURATION =====
const props = defineProps({
  stopTrigger: {
    type: Boolean,
    default: false
  },
  targetText: {
    type: String,
    default: 'NOURISH'
  },
  unscrambleComplete: {
    type: Boolean,
    default: false
  }
});

const SHUFFLE_SPEED = 50;
const SHUFFLE_DURATION = 2000;
const UNSCRAMBLE_DURATION = 3000;
// ========================

const displayText = ref('');
const isUnscrambling = ref(false);
const displayEl = ref(null);
let shuffleInterval = null;
let unscrambleInterval = null;

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';

const getRandomChar = () => {
  return chars[Math.floor(Math.random() * chars.length)];
};

// Phase 1: Infinite Shuffling
const startShuffling = () => {
  // Clear any existing interval first
  if (shuffleInterval) clearInterval(shuffleInterval);
  
  shuffleInterval = setInterval(() => {
    let shuffled = '';
    for (let i = 0; i < props.targetText.length; i++) {
      const char = props.targetText[i];
      shuffled += char === ' ' ? ' ' : getRandomChar();
    }
    displayText.value = shuffled;
  }, SHUFFLE_SPEED);
};

// Phase 2: Controlled Unscramble
const triggerUnscramble = () => {
  if (isUnscrambling.value) return;
  
  isUnscrambling.value = true;
  
  // Clear shuffling interval
  if (shuffleInterval) {
    clearInterval(shuffleInterval);
    shuffleInterval = null;
  }
  
  const steps = Math.floor(SHUFFLE_DURATION / SHUFFLE_SPEED);
  let currentStep = 0;
  const revealedChars = new Array(props.targetText.length).fill(false);
  
  unscrambleInterval = setInterval(() => {
    currentStep++;
    const charsToReveal = Math.floor((currentStep / steps) * props.targetText.length);
    
    while (revealedChars.filter(x => x).length < charsToReveal) {
      const unrevealed = revealedChars
        .map((revealed, i) => (revealed ? -1 : i))
        .filter((i) => i !== -1);
      
      if (unrevealed.length === 0) break;
      
      const idx = unrevealed[Math.floor(Math.random() * unrevealed.length)];
      revealedChars[idx] = true;
    }
    
    let result = '';
    for (let i = 0; i < props.targetText.length; i++) {
      const char = props.targetText[i];
      if (char === ' ') {
        result += ' ';
      } else {
        result += revealedChars[i] ? char : getRandomChar();
      }
    }
    
    displayText.value = result;
    
    if (currentStep >= steps) {
      displayText.value = props.targetText;
      clearInterval(unscrambleInterval);
      unscrambleInterval = null;
      displayEl.value.style.opacity = '0.08';
      setTimeout(() => {
        emit('update:unscrambleComplete', true);
      }, UNSCRAMBLE_DURATION);
    }
  }, SHUFFLE_SPEED);
};

// Logic Flow
onMounted(() => {
  // If stopTrigger is true on mount, go straight to unscrambling
  if (props.stopTrigger) {
    // Set initial scrambled state
    let shuffled = '';
    for (let i = 0; i < props.targetText.length; i++) {
      const char = props.targetText[i];
      shuffled += char === ' ' ? ' ' : getRandomChar();
    }
    displayText.value = shuffled;
    
    // Then trigger unscramble
    triggerUnscramble();
  } else {
    // Otherwise start infinite shuffling
    startShuffling();
  }
});

// Watch for the external trigger
watch(() => props.stopTrigger, (newValue) => {
  if (newValue && !isUnscrambling.value) {
    triggerUnscramble();
  }
});

onUnmounted(() => {
  if (shuffleInterval) clearInterval(shuffleInterval);
  if (unscrambleInterval) clearInterval(unscrambleInterval);
});
</script>

<template>
  <div class="flex items-center justify-center p-8">
    <div ref="displayEl" class="text-5xl font-didot font-bold tracking-wider max-w-min text-center wrap-break-word [word-spacing:100vw] transition-opacity duration-500 ease-in-out">
      {{ displayText }}
    </div>
  </div>
</template>