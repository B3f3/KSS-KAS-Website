"use client"; // Add this line at the top
import React, { useState } from 'react';
import styles from '../styles/Home.module.css';

import Link from "next/link";

const KSSKASNavbar = () => {
    const [activeTab, setActiveTab] = useState<string>('without-api'); // Default active tab

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <nav className={styles.navbar}>
            <Link
                href="/ksskass-without-api"
                className={`${styles.tab} ${activeTab === 'without-api' ? styles.active : ''}`}
                onClick={() => handleTabClick('without-api')}>
                Without API
            </Link>
            <Link
                href="/ksskass-with-api"
                className={`${styles.tab} ${activeTab === 'with-api' ? styles.active : ''}`}
                onClick={() => handleTabClick('with-api')}>
                With API
            </Link>
        </nav>
    );
};

export default KSSKASNavbar;