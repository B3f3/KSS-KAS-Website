import { PrismaClient } from "@prisma/client";
import { platform } from "os";
const prisma = new PrismaClient();

export async function getOrderHistory(userId: number) {
    await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate delay
    return prisma.tradeHistory.findMany({
        where: { userId },
    });
}

export async function addOrder(
    userId:number,
    platform:string,
    ticker:string,
    strategyType:string,
    amount:number,
    entryPrice:number,
    ){
        await new Promise((resolve) => setTimeout(resolve, 1500));
        return prisma.tradeHistory.update({
            where : {userId},
            data : {platform, ticker, strategyType, amount, entryPrice}
        })
}

