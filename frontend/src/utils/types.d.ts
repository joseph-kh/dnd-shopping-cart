export interface Product {
  id: number;
  name: string;
  price: number;
  discounted_price: number;
  currency: "USD";
  rate: 1 | 2 | 3 | 4 | 5;
  is_sale: boolean;
  image: string;
}

export interface ShoppingCart extends Product {
  quantity: number;
}
