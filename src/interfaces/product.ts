export interface ProductData {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  rating: RatingData;
  amount?: number;
}

export interface RatingData {
  rate: number;
  count: number;
}

export interface ProductContextType {
  filter: () => void;
  addToCart: (id: number) => void;
  removeFromCart: (id: number) => void;
  cart: ProductData[];
  products: ProductData[];
  localProductAmaount: number;
  setLocalProductAmaount: React.Dispatch<React.SetStateAction<number>>;
}
