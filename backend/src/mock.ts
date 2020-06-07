import { Category } from './category.model';

export const data: Category[] = [
  {
    id: 1, name: 'cars', keywords: [
      {
        id: 2,
        name: 'audi',
      },
      {
        id: 3,
        name: 'bmw',
      },
      {
        id: 4,
        name: 'tires',
      },
    ],
  },
  {
    id: 5, name: 'bikes', keywords: [
      {
        id: 6,
        name: 'bianchi',
      },
    ],
  },
  {
    id: 7, name: 'fruit', keywords: [
      {
        id: 8,
        name: 'banana',
      },
      {
        id: 9,
        name: 'avocado',
      },
    ],
  },
  {
    id: 10, name: 'animals', keywords: [
      {
        id: 11,
        name: 'cat',
      },
      {
        id: 12,
        name: 'dog',
      },
      {
        id: 13,
        name: 'otter',
      },
    ],
  },
  {
    id: 14, name: 'drinks', keywords: [
      {
        id: 15,
        name: 'tea',
      },
      {
        id: 16,
        name: 'water',
      },
    ],
  },
];
