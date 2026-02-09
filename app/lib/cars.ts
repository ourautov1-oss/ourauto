export type Car = {
  id: string;
  title: string;
  brand: string;
  model: string;
  year: number;
};

export const cars: Car[] = [
  {
    id: '1',
    title: 'Mock Car',
    brand: 'MockBrand',
    model: 'MockModel',
    year: 2023,
  },
];
