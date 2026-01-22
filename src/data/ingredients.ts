export interface Ingredient {
  image: string;
  title: string;
  description: string;
}

export const ingredients: Ingredient[] = [
  {
    image: new URL('@/assets/images/sm-aloe-one.webp', import.meta.url).href,
    title: 'Aloe Vera Extract',
    description: 'Provides hydration, soothes irritation, and promotes healing.'
  },
  {
    image: new URL('@/assets/images/sm-squalane-two.webp', import.meta.url).href,
    title: 'Squalane',
    description: 'Helps maintain skin\'s moisture balance and improves skin texture.'
  },
  {
    image: new URL('@/assets/images/sm-vitamin-three.webp', import.meta.url).href,
    title: 'Vitamin E',
    description: 'Acts as an antioxidant, protecting the skin from free radical damage and promoting healing.'
  },
  {
    image: new URL('@/assets/images/sm-shea-four.webp', import.meta.url).href,
    title: 'Shea Butter',
    description: 'Offers rich emollients, deeply moisturizing and nourishing the skin.'
  },
  {
    image: new URL('@/assets/images/sm-green-five.webp', import.meta.url).href,
    title: 'Green Tea Extract',
    description: 'Contains antioxidants and anti-inflammatory properties that calm and protect the skin.'
  }
];
