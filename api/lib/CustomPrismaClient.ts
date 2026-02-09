import 'dotenv/config';
import { PrismaClient } from "../prisma/generated/client";
import { PrismaPg } from '@prisma/adapter-pg'

if (!process.env.DATABASE_URL) {
    console.error("FATAL: DATABASE_URL is undefined. Explicit dotenv load failed.");
    process.exit(1);
}

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
})

const SOFT_DELETE_MODELS: string[] = [];

const prismaClientSingleton = () => {
    const baseClient = new PrismaClient({
        adapter,
    });

    return baseClient.$extends({
        query: {
            $allModels: {
                async delete({ model, args }) {
                    if (!SOFT_DELETE_MODELS.includes(model)) {
                        return (baseClient as any)[model].delete(args);
                    }

                    return (baseClient as any)[model].update({
                        ...args,
                        data: { deletedAt: new Date() } as any,
                    });
                },
                async deleteMany({ model, args }) {
                    if (!SOFT_DELETE_MODELS.includes(model)) {
                        return (baseClient as any)[model].deleteMany(args);
                    }

                    return (baseClient as any)[model].updateMany({
                        ...args,
                        data: { deletedAt: new Date() } as any,
                    });
                },
                async findMany({ model, args, query }) {
                    if (SOFT_DELETE_MODELS.includes(model)) {
                        args.where = { ...args.where, deletedAt: null } as any;
                    }
                    return query(args);
                },
                async findFirst({ model, args, query }) {
                    if (SOFT_DELETE_MODELS.includes(model)) {
                        args.where = { ...args.where, deletedAt: null } as any;
                    }
                    return query(args);
                },
            },
        },
    });
};

type ExtendedPrismaClient = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as typeof globalThis & {
    prisma?: ExtendedPrismaClient
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;