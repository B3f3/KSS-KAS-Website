"use client";
import { useState } from "react";

export default function Home() {
    const [platform, setPlatform] = useState("");
    const [ticker, setTicker] = useState("");
    const [amount, setAmount] = useState("");
    const [entryPrice, setEntryPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/CreateOrder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userId: 1,
                    platform,
                    ticker,
                    strategyType: "KSS-KAS",
                    amount: parseFloat(amount),
                    entryPrice: parseFloat(entryPrice),
                }),
            });
            

            const responseText = await response.text();
            console.log("Response text:", responseText);

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = JSON.parse(responseText);
            setMessage("Order created successfully!");
        } catch (error) {
            console.error("Error creating order:", error);
            setMessage("Failed to create order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Create Order</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Platform:</label>
                    <input
                        type="text"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Ticker:</label>
                    <input
                        type="text"
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Entry Price:</label>
                    <input
                        type="number"
                        value={entryPrice}
                        onChange={(e) => setEntryPrice(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? "Creating..." : "Create Order"}
                </button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}