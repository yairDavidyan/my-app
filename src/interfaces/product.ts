export interface ProductData {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: RatingData;
}

export interface RatingData {
  rate: number;
  count: number;
}

export interface ProductContextType {
  filter: () => void;
  addToCart: (id: number) => void;
  cart: ProductData[];
}
