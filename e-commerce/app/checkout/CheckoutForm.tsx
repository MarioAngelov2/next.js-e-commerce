"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
    AddressElement,
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
    clientSecret: string;
    handlePaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
    clientSecret,
    handlePaymentSuccess,
}) => {
    const { cartTotalAmout, handleClearCart, handleSetPaymentIntent } =
        useCart();
    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formattedPrice = formatPrice(cartTotalAmout);

    useEffect(() => {
        if (!stripe) {
            return;
        }

        if (!clientSecret) {
            return;
        }

        handlePaymentSuccess(false);
    }, [stripe]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        stripe
            .confirmPayment({
                elements,
                redirect: "if_required",
            })
            .then((result) => {
                if (!result.error) {
                    toast.success("Payment successful!");

                    handleClearCart();
                    handlePaymentSuccess(true);
                    handleSetPaymentIntent(null);
                }
                
                setIsLoading(false);
            });
        };

    return (
        <form onSubmit={handleSubmit} id="payment-form">
            <div className="mb-6">
                <Heading title="Enter your payent details to continue checkout" />
                <h2 className="font-semibold mt-4 mb-2">Address Information</h2>
                <AddressElement options={{ mode: "shipping" }} />
            </div>
            <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
            <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
            <div className="mt-2 py-4 text-center text-slate-700 text-xl font-bold">
                Total: {formattedPrice}
            </div>
            <Button
                label={isLoading ? "Processing" : "Pay now"}
                disabled={isLoading || !stripe || !elements}
                onClick={() => {}}
            />
        </form>
    );
};

export default CheckoutForm;
