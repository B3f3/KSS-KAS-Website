import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    try {
        const { userId, platform, ticker, strategyType, amount, entryPrice } = await request.json();

        const order = await prisma.tradeHistory.create({
            data: {
                userId,
                platform,
                ticker,
                strategyType,
                amount,
                entryPrice,
            },
        });

        return NextResponse.json({ success: true, order });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({ success: false, error: "Failed to create order" }, { status: 500 });
    }
}