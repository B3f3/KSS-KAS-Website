"use client"; // Add this line at the top
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from "next/link";

const OpenOrders: React.FC = () => {
    const [showStrategies, setShowStrategies] = useState<boolean>(false);

    const toggleStrategies = () => {
        setShowStrategies(!showStrategies);
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Orders</h1>
            </div>
        </div>
    );
};

export default OpenOrders;