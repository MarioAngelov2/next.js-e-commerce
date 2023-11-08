import Stripe from "stripe";
import prisma from "@/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2023-10-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

const webhookHandler = async (req: NextRequest) => {
    try {
        const buf = await req.text();
        const sig = req.headers.get("stripe-signature")!;

        let event: Stripe.Event;

        try {
            event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Unknown error";

            // On error, log and return the error message.
            if (err! instanceof Error) console.log(err);
            console.log(`❌ Error message: ${errorMessage}`);

            return NextResponse.json(
                {
                    error: {
                        message: `Webhook Error: ${errorMessage}`,
                    },
                },
                { status: 400 }
            );
        }

        // Successfully constructed event.
        console.log("✅ Success:", event.id);

        switch (event.type) {
            case "charge.succeeded":
                const charge: any = event.data.object as Stripe.Charge;

                if (typeof charge.payment_intent === "string") {
                    await prisma?.order.update({
                        where: { paymentIntentId: charge.payment_intent },
                        data: {
                            status: "complete",
                            address: charge.shipping?.address,
                        },
                    });
                }
                break;
            default:
                console.warn(`🤷‍♀️ Unhandled event type: ${event.type}`);
                break;
        }

        // Return a response to acknowledge receipt of the event.
        return NextResponse.json({ received: true });
    } catch {
        return NextResponse.json(
            {
                error: {
                    message: `Method Not Allowed`,
                },
            },
            { status: 405 }
        ).headers.set("Allow", "POST");
    }
};

export { webhookHandler as POST };
