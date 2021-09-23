import StripeLibrary from "stripe";
import dollarsToCents from "./utils/dollarsToCents";

const stripe = StripeLibrary(process.env.SECRET_KEY, {
  apiVersion: "2020-08-27",
});

const createPaymentIntent = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "method not allowed",
    });
  }

  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntent.create({
      amount: dollarsToCents(amount),
      currency: "usd",
      payment_method_types: ["card"],
    });

    res.json({
      clientSecret: paymentIntent.clientSecret,
    });
  } catch (error) {
    res.json({
      error: error.message,
    });
  }
};

export { createPaymentIntent };
