export interface Product {
  id: number;
  name: string;
  price: number;
  isBestSeller: true;
}

export interface ProductForm extends Pick<Product, 'price' | 'name'> {}
