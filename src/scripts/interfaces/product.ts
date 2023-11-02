export interface Product {
  id: number;
  name: string;
  price: number;
  isBestSeller: boolean;
}

export interface ProductDto extends Pick<Product, 'price' | 'name'> {}
