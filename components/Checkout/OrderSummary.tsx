"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  fetchCartDetails,
  fetchProductCarts,
  fetchCurrentCart,
} from "@/app/lib/actions/cart-actions";

export interface orderProducts {
  cartProducts: {
    album: string;
    price: number;
  };
  quantity: number;
}
interface CartItem {
  quantity: number;
  product_id: {
    album: string;
    price: number;
  };
}

const OrderSummary = () => {
const [cartDetailsData, setCartDetailsData] = useState<any[]>([]);
  const [orderProducts, setOrderProducts] = useState<orderProducts[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  const getIncompleted = async () => {
    try {
      const data: any[] | undefined = await fetchCurrentCart();
      if (!data) {
        throw new Error("Error reading details");
      }
      const incompleteCartDetails = data.filter(
        (item) => !item.cart_id.completed
      );
      setCartDetailsData(incompleteCartDetails);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  //     if (dateString) {
  //       const parts = dateString.split("T");
  //       return parts[0];
  //     }
  //     return "";
  //   };

  useEffect(() => {
    getIncompleted();
  }, []);

  useEffect(() => {
    const total = orderProducts.reduce((acc, product) => {
      return acc + product.cartProducts.price * product.quantity;
    }, 0);
    setTotalAmount(total);
  }, [orderProducts]);

  const renderCartDetails = () => {
    if (!cartDetailsData) return;
    return cartDetailsData?.map((item: any, index: number) => (
      <div key={index} className="text-left px-3">
        <p>Album: {item.product_id.album}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.product_id.price.toFixed(2)}</p>
      </div>
    ));
  };


  

  return (
    <div className="bg-white shadow-md py-5 w-[60%] font-mono flex flex-col text-center">
      <h3 className="uppercase pb-5">------- Order summary -------</h3>
      <Image
        className="pb-10 mx-auto"
        width={100}
        height={100}
        src={"/cart.png"}
        alt="logo"
      />
      <div className="flex flex-col items-start px-3 pb-6">
        <p>Order ID:</p>
        <p>Date:</p>
      </div>
      <span className="pb-5 block">------------------------------</span>
      {renderCartDetails()}
      <div className="text-left  px-3">
        <span className="pb-5 block">------------------------------</span>
        <p>Total: $ {totalAmount.toFixed(2)}</p>
      </div>
      <span className="pb-5 block">------------------------------</span>
      <p className="text-bold text-xs">THANK YOU FOR SHOPPING!</p>
    </div>
  );
};

export default OrderSummary;
