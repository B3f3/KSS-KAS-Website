import React, {useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Link from "next/link";
import { getOrderHistory } from '../api/orderhistory';

type Order = {
    userId : number;
    platform : string;
    ticker : string;
    strategyType : string;
    amount : number;
    entryPrice : number;
}

export default async function OpenOrders() {
    const orders: Order[] = await getOrderHistory(1);
    
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>Open Orders</h1>
                <table className={styles.orderTable}>
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Ticker</th>
                            <th>Strategy</th>
                            <th>Amount</th>
                            <th>Entry Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={index}>
                                <td>{order.platform}</td>
                                <td>{order.ticker}</td>
                                <td>{order.strategyType}</td>
                                <td>{order.amount}</td>
                                <td>{order.entryPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  }
