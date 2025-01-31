import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

async function main() {
    const user = await prisma.user.create({
        data: { name:"Bercan", surname:"Turkmen", username:"befeTurkmen", password:"asdasd", email:"befeturkmen@gmail.com" }
    });
    console.log(user);
}

main();

