import { PrismaClient } from "@/generated/prisma/client";
import {PrismaPg} from "@prisma/adapter-pg"
import { env } from "./env";


const adapter=new PrismaPg({connectionString:env.DATABASE_URL})

// we can do the simple thing like ->
// const prisma=new PrismaClient({adapter}); 

// but are doing this because  connection pool exhaustion during nextjs hot relaod

// we stored in global becase it is window.global and safe from hot reloading 
const globalForPrisma= global as unknown as {prisma:PrismaClient}

const prisma=globalForPrisma.prisma || new PrismaClient({adapter})


if(process.env.NODE_ENV !=="production") globalForPrisma.prisma=prisma

export {prisma}