export interface Ingredient {
  image: string;
  title: string;
  description: string;
}

export const ingredients: Ingredient[] = [
  {
    image: new URL('@/assets/images/sm-aloe-one.png', import.meta.url).href,
    title: 'Aloe Vera Extract',
    description: 'Provides hydration, soothes irritation, and promotes healing.'
  },
  {
    image: new URL('@/assets/images/sm-squalane-two.png', import.meta.url).href,
    title: 'Squalane',
    description: 'Helps maintain skin\'s moisture balance and improves skin texture.'
  },
  {
    image: new URL('@/assets/images/sm-vitamin-three.png', import.meta.url).href,
    title: 'Vitamin E',
    description: 'Acts as an antioxidant, protecting the skin from free radical damage and promoting healing.'
  },
  {
    image: new URL('@/assets/images/sm-shea-four.png', import.meta.url).href,
    title: 'Shea Butter',
    description: 'Offers rich emollients, deeply moisturizing and nourishing the skin.'
  },
  {
    image: new URL('@/assets/images/sm-green-five.png', import.meta.url).href,
    title: 'Green Tea Extract',
    description: 'Contains antioxidants and anti-inflammatory properties that calm and protect the skin.'
  }
];
