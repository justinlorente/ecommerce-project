export interface IRecords {
  id: number;
  order_date: string;
  total: number,
  cart_id: {
    id: number,
    completed: boolean;
  };
}
