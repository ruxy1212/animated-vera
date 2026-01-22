export interface Benefit {
  image: string;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    image: new URL('@/assets/images/sec-two-one.webp', import.meta.url).href,
    title: 'Deep Hydration',
    description: 'Provides long-lasting moisture, keeping skin soft and smooth.'
  },
  {
    image: new URL('@/assets/images/sec-two-two.webp', import.meta.url).href,
    title: 'Soothes Irritated Skin',
    description: 'Calms redness and irritation, perfect for sensitive skin.'
  },
  {
    image: new URL('@/assets/images/sec-two-three.webp', import.meta.url).href,
    title: 'Promotes Skin Healing',
    description: 'Enhances healing of minor cuts, burns, and blemishes.'
  },
  {
    image: new URL('@/assets/images/sec-two-four.webp', import.meta.url).href,
    title: 'Rich in Antioxidants',
    description: 'Fights aging and repairs skin with essential vitamins.'
  }
];
