"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
    const [error, setError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [clientSecret, setClientSecret] = useState<string>("");
    const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (!cartProducts) return;

            setLoading(true);
            setError(false);

            try {
                const response = await axios.post(
                    "/api/create-payment-intent",
                    {
                        items: cartProducts,
                        payment_intent_id: paymentIntent,
                    }
                );

                if (response.status === 401) {
                    return router.push("/login");
                }

                if (response.status !== 200) {
                    throw new Error("Server error");
                }

                const data = await response.data;
                setClientSecret(data.paymentIntent.client_secret);
                handleSetPaymentIntent(data.paymentIntent.id);
            } catch (error) {
                setError(true);
                console.log(error);
                toast.error("Something went wrong, please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [cartProducts, paymentIntent]);

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating",
        },
    };

    const handleSetPaymentSuccess = useCallback((value: boolean) => {
        setPaymentSuccess(value);
    }, []);

    return (
        <div className="w-full">
            {clientSecret && cartProducts && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm
                        clientSecret={clientSecret}
                        handlePaymentSuccess={handleSetPaymentSuccess}
                    />
                </Elements>
            )}
            {loading && <div className="text-center">Loading Checkout...</div>}
            {error && (
                <div className="text-center text-rose-500">
                    Something went wrong
                </div>
            )}
            {paymentSuccess && (
                <div className="flex flex-col items-center gap-4">
                    <div className="text-teal-500 text-center">
                        Payment Success
                    </div>
                    <div className="max-w-[220px] w-full">
                        <Button
                            label="View Your Orders"
                            onClick={() => router.push("/order")}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutClient;
