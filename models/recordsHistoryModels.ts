export interface IRecordsHistory {
  id: number;
  order_date: string;
  total: number;
  cart_id: {
    id: number;
    completed: boolean;
  };
  purchased_products?: {
    album: string;
    price: number;
    quantity: number;
  }[];
}
