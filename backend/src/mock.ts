import { Category } from './category.model';

export const data: Category[] = [
  {
    id: 1, name: 'cars', keywords: [
      {
        id: 1,
        name: 'audi',
      },
      {
        id: 2,
        name: 'bmw',
      },
      {
        id: 3,
        name: 'tires',
      },
    ],
  },
  {
    id: 2, name: 'bikes', keywords: [
      {
        id: 1,
        name: 'bianchi',
      },
    ],
  },
  {
    id: 3, name: 'fruit', keywords: [
      {
        id: 1,
        name: 'banana',
      },
      {
        id: 2,
        name: 'avocado',
      },
    ],
  },
  {
    id: 4, name: 'animals', keywords: [
      {
        id: 1,
        name: 'cat',
      },
      {
        id: 2,
        name: 'dog',
      },
      {
        id: 3,
        name: 'otter',
      },
    ],
  },
  {
    id: 5, name: 'drinks', keywords: [
      {
        id: 1,
        name: 'tea',
      },
      {
        id: 2,
        name: 'water',
      },
    ],
  },
];
