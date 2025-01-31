"use client"; // Ensure client-side rendering
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

import dynamic from 'next/dynamic';
import Navbar from "../components/navbar-with-api";
import Link from "next/link";

const Select = dynamic(() => import('react-select'), { ssr: false });

const KSSKAS: React.FC = () => {
    const [apiKey, setApiKey] = useState<string>('');
    const [platform, setPlatform] = useState<string>('');
    const [buyPrice, setBuyPrice] = useState<string>('');
    const [buyAmount, setBuyAmount] = useState<string>('');
    const [coins, setCoins] = useState<string[]>([]);
    const [selectedCoin, setSelectedCoin] = useState<string>('');
    const [orderSummary, setOrderSummary] = useState<string>("");

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
    
    // Format coins for react-select
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
                

                <div className={styles.inputGroup}>
                    <label htmlFor="api-key">Public API Key</label>
                    <div className={styles.inputWithButton}>
                        <input
                            type="text"
                            id="api-key"
                            name="api-key"
                            placeholder="Enter API key"
                            onChange={(e) => setApiKey(e.target.value)}
                        />
                    </div>
                </div>

                {/* React-Select Dropdown */}
                <div className={styles.inputGroup}>
                    <label htmlFor="coin-search">Coin Selection</label>
                    <Select
                        id="coin-search"
                        name="coin-search"
                        placeholder="Search for a coin"
                        options={coinOptions}
                        value={coinOptions.find((option) => option.value === selectedCoin)}
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
                                onChange={(e) => setBuyPrice(e.target.value)}
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
                                onChange={(e) => setBuyAmount(e.target.value)}
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
                            <p><strong>Platform:</strong> {platform}</p>    
                            <p><strong>Ticker:</strong> {selectedCoin}</p> 
                            <p><strong><></>Api Key:</strong> {apiKey}</p>
                            <p><strong><></>Buy Price:</strong> {buyPrice}</p> 
                            <p><strong>Buy Amount:</strong> {buyAmount}</p>
                            
                        </div>

                        <div className={styles.orderSummary}>
                            <h2>KSS-KASS Summary</h2>

                            

                        </div>
                    </div>)}
                    
                </div> 

            </div>
        </div>
    );
};

export default KSSKAS;