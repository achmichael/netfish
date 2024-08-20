import React, { useEffect } from "react";
import payment from "../api/payment.js";

const Payment = () => {
    useEffect(() => {
        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = import.meta.env.VITE_CLIENT_KEY;

        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', clientKey);
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    const handlePayment = async (event) => {
        event.preventDefault();

        const data = {
            orderId: "ORDER-123456",
            name: "Premium Fish Fillet",
            price: 50000,
            quantity: 3
        }

        const result = await payment(data);
        window.snap.pay(result.token);
    }

    return (
        <div className="container">
            <button onClick={handlePayment}>Bayar</button>
        </div>
    )
    
}

export default Payment;