"use client"; // Add this line at the top
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

import Link from "next/link";

export const Sidebar = () => {
        const [showStrategies, setShowStrategies] = useState<boolean>(false);
    
        const toggleStrategies = () => {
            setShowStrategies(!showStrategies);
        };
    
    return (
            <div className={styles.sidebar}>
                <div className={styles.menu}>

                    <Link href="/home" className={styles.normalLink}>
                        <div className={styles.menuItem}>Home</div>
                    </Link>

                    <div className={styles.menuItem} id="browse">Browse</div>

                    <Link href="/openorders" className={styles.normalLink}>
                        <div className={styles.menuItem}>Open Orders</div>
                    </Link>

                    <div className={styles.menuItem} onClick={toggleStrategies}>
                        Strategies
                    </div>
                </div>
                <div className={`${styles.strategies} ${showStrategies ? '' : styles.hidden}`} id="strategies-list">
                    <Link href="/ksskass-without-api" className={styles.normalLink}>
                        <div className={styles.strategyItem}>KSS-KAS</div>
                    </Link>
                </div>
            </div>
    )
};

export default Sidebar;