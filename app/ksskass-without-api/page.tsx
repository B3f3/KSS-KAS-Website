"use client"; // Ensure client-side rendering
import { useEffect, useState } from 'react';
import { KSSCalculator } from '../ksskass/ksskasscalulator';
import styles from '../styles/Home.module.css';

import dynamic from 'next/dynamic';
import Navbar from "../components/navbar-without-api";
import Link from "next/link";

// Dynamically import react-select to avoid hydration issues
const Select = dynamic(() => import('react-select'), { ssr: false });

const KSSKAS: React.FC = () => {
    const [platform, setPlatform] = useState<string>('');
    const [buyPrice, setBuyPrice] = useState<number>(0);
    const [buyAmount, setBuyAmount] = useState<number>(0);
    const [coins, setCoins] = useState<string[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<string>('');
    const [orderSummary, setOrderSummary] = useState<string>("");
  
    const calculator = new KSSCalculator(buyPrice, buyAmount);

    // Handle platform change
    const handlePlatformChange = (selectedOption: any) => {
        setPlatform(selectedOption?.value || '');
      };

    // Handle order creation
    const handleOrder = () => {

        if (!platform || selectedCoin == null || !buyPrice || !buyAmount) {
            alert("Please fill out all the fields!");
            return;
          }

        const summary = `
        Platform: ${platform}
        Ticker: ${selectedCoin}
        Buy Price: ${buyPrice}
        Buy Amount ${buyAmount}
        `;

        setOrderSummary(summary);
    };

    // Fetch coin list from the Binance API
    useEffect(() => {
        const fetchCoins = async () => {
            try {
                const response = await fetch('/public-api/binance/coins');
                const data = await response.json();
                setCoins(data.coins);
            } catch (error) {
                console.error('Error fetching coins:', error);
            }
        };

        fetchCoins();
    }, []);

    const coinOptions = coins.map((coin) => ({
        value: coin,
        label: coin,
    }));

    const platformOptions = [
        { value: 'Binance', label: 'Binance' },
      ];

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                    <Navbar />
                    <h1>KSS-KAS</h1>
                    {/* React-Select Dropdown */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="platform">Choose Platform</label>
                        <Select
                                id="platform"
                                name="platform"
                                placeholder="Choose Platform"
                                options={platformOptions}
                                value={platformOptions.find((option) => option.value === platform)}
                                onChange={handlePlatformChange}
                                isSearchable
                        />
                    </div>

                    {/* React-Select Dropdown */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="coin-search">Coin Selection</label>
                        <Select
                            id="coin-search"
                            name="coin-search"
                            placeholder="Search for a coin"
                            options={coinOptions}
                            value={coinOptions.find((option) => option.value === selectedCoin) || null}
                            onChange={(selectedOption) => setSelectedCoin(selectedOption?.value || '')}
                            isSearchable
                            instanceId="coin-select" // Stable instanceId to avoid hydration errors
                        />
                    </div>

                    {/* Buy Price Input */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="buy-price">Buy Price</label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="text"
                                id="buy-price"
                                name="buy-price"
                                placeholder="Enter buy price"
                                value={buyPrice}
                                onChange={(e) => setBuyPrice(parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    
                    {/* Buy Amount Input */}
                    <div className={styles.inputGroup}>
                        <label htmlFor="buy-amount">Buy Amount</label>
                        <div className={styles.inputWithButton}>
                            <input
                                type="text"
                                id="buy-amount"
                                name="buy-amount"
                                placeholder="Enter buy amount"
                                value={buyAmount}
                                onChange={(e) => setBuyAmount(parseFloat(e.target.value))}
                            />
                            <button type="button" className={styles.button} onClick={handleOrder}>
                                Create Order
                            </button>
                        </div>
                    </div>


                <div className={styles.line}></div>
                
                <div>
                    {orderSummary && (
                    <div className={styles.summaryContent}>
                        <div className={styles.orderSummary}>
                            <h2>Order Summary</h2>
                            <p><strong>Platform:</strong> {platform}</p>    <p><strong><></>Buy Price:</strong> {buyPrice}</p>
                            <p><strong>Ticker:</strong> {selectedCoin}</p>  <p><strong>Buy Amount:</strong> {buyAmount}</p>
                        </div>

                        <div className={styles.orderSummary}>
                            <h2>KSS-KAS Summary</h2>
                            <p><strong>Total Cost:</strong> ${calculator.Cost()}</p> 
                            <p><strong>First Sell Point (30% Gain):</strong> ${calculator.firstProfit30()}</p>
                            <p><strong>Second Sell Point (50% Gain):</strong> ${calculator.secondProfit50()}</p> 
                            <p><strong>Stop Loss Point: </strong> ${calculator.stopLossPoint()}</p> 
                            <p><strong>Stop Loss Sell Amount: </strong> {calculator.stopSellAmount()}</p> 
                            <p><strong>Rebuy at 60%: </strong> ${calculator.reBuyPoint()}</p>
                        </div>
                    </div>)}
                    
                </div> 
            </div>
        </div>
        
    );
};

export default KSSKAS;
