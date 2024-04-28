"use client";

import { IRecordsHistory } from "@/models/recordsHistoryModels";
import Record from "./Record";

type RecordsWithPurchasedProducts = IRecordsHistory & {
  purchased_products: {
    album: string;
    price: number;
    quantity: number;
  }[];
};
const RecordGrid = ({
  records,
  recordCartDetails,
}: {
  records: any;
  recordCartDetails: any;
}) => {
  const cartProductsMap = recordCartDetails.reduce((acc: any, record: any) => {
    const { cart_id, product_id, quantity } = record;
    if (!acc[cart_id.id]) {
      acc[cart_id.id] = [];
    }
    const productWithQuantity = { ...product_id, quantity };
    acc[cart_id.id].push(productWithQuantity);
    return acc;
  }, {});

  const ordersWithPurchasedProducts: RecordsWithPurchasedProducts[] = records.map(
    (record: IRecordsHistory) => ({
      ...record,
      purchased_products: cartProductsMap[record.cart_id.id] || [],
    })
  );

  if (records.length === 0) {
    return <p>No records found</p>;
  }

  return (
    <>
      {ordersWithPurchasedProducts.map((order: RecordsWithPurchasedProducts) => (
        <Record key={order.id} ordersWithPurchasedProducts={order} />
      ))}
    </>
  );
}

export default RecordGrid;
 