import React, { useState } from "react";
import { useCart } from "@/context/CartContext";

type FormValues = {
    name: string;
    address: string;
    cardNumber: string;
    expiryDate: string;
    securityCode: string;
    paymentMethod: string;
  };
  


const CheckoutForm = () => {
    const { createOrder, shoppingTotal } = useCart();
    const [paymentMethod, setPaymentMethod] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [securityCode, setSecurityCode] = useState("");
    const [orderSubmitted, setOrderSubmitted] = useState(false);

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData: FormValues = {
          name,
          address,
          cardNumber,
          expiryDate,
          securityCode,
          paymentMethod,
        };
        submitFormData(e, formData);
      };
    
      const submitFormData = async (
        e: React.FormEvent<HTMLFormElement>,
        formData: FormValues
      ) => {
        try {
          await createOrder(shoppingTotal, formData.address, formData.paymentMethod, formData.name);
          setOrderSubmitted(true);
        } catch (error: any) {
          console.error("Error creating order:", error.message);
        }
      };

    if (orderSubmitted) {
        return (
            <div>
                <p>Order Submitted Successfully!</p>
            </div>
        );
    }

    return (
        <form className="w-[80%]" onSubmit={handleSubmit}>
            <div className="mb-5 flex flex-col">
                <label className="mr-3 mb-3 text-sm text-gray-500" htmlFor="name">
                    Name:
                </label>
                <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-none bg-gray-200 rounded-md text-sm text-gray-400 p-2 w-full focus:outline-none"
                />
            </div>
            <div className="mb-5 flex flex-col">
                <label className="mr-3 mb-3 text-sm text-gray-500" htmlFor="address">
                    Address:
                </label>
                <input
                    type="text"
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border-none bg-gray-200 rounded-md text-sm text-gray-400 p-2 w-full focus:outline-none"

                />
            </div>
            <div className="mb-5 flex flex-col">
                <label className="mr-3 mb-3 text-sm text-gray-500" htmlFor="cardNumber">
                    Card Number:
                </label>
                <input
                    type="text"
                    id="cardNumber"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="border-none bg-gray-200 rounded-md text-sm text-gray-400 p-2 w-full focus:outline-none"
                />
            </div>
            <div className="mb-5 flex flex-row">
                <div className="flex flex-col mr-5">
                    <label className="mb-3 text-sm text-gray-500" htmlFor="expiryDate">
                        Expiry Date:
                    </label>
                    <input
                        type="text"
                        id="expiryDate"
                        required
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="border-none bg-gray-200 rounded-md text-sm text-gray-400 p-2 w-full focus:outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="mb-3 text-sm text-gray-500" htmlFor="securityCode">
                        Security Code:
                    </label>
                    <input
                        type="text"
                        id="securityCode"
                        required
                        value={securityCode}
                        onChange={(e) => setSecurityCode(e.target.value)}
                        className="border-none bg-gray-200 rounded-md text-sm text-gray-400 p-2 w-full focus:outline-none"
                    />
                </div>
            </div>
            <div className="mb-5">
                <label className="mb-3 mr-3 text-sm text-gray-500" htmlFor="paymentMethod">
                    Payment Method:
                </label>
                <select
                    id="paymentMethod"
                    value={paymentMethod}
                    required
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="border-none bg-gray-200 rounded-md p-2 text-gray-500 hover:text-gray-700 focus:outline-none w-full"
                >
                    <option className="text-sm" value="">
                        Select Payment Method
                    </option>
                    <option className="text-sm" value="credit_card">
                        Credit Card
                    </option>
                    <option className="text-sm" value="paypal">
                        PayPal
                    </option>
                </select>
            </div>
            <button
                type="submit"
                className="bg-gray-500 p-2 rounded-sm text-white flex justify-center items-center max-w-[120px] text-sm hover:scale-105 transition-transform w-full"
            >
                Checkout
            </button>
        </form>
    );
};

export default CheckoutForm;
