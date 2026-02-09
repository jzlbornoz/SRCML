import { Request, Response } from "express";
import { Webhook } from "svix";
import { prisma } from '../../lib/CustomPrismaClient';

export const webHookController = async (req: Request, res: Response) => {
    const payload = req.body;
    const headers = {
        "webhook-id": req.headers["svix-id"] as string,
        "webhook-timestamp": req.headers["svix-timestamp"] as string,
        "webhook-signature": req.headers["svix-signature"] as string,
    };

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY as string);

    const webhookVerified: any = wh.verify(JSON.stringify(payload), headers);

    if (!webhookVerified) {
        res.status(400).json({ message: "Invalid webhook" });
        return;
    }

    if (webhookVerified.type === "user.created") {
        const existUser = await prisma.user.findUnique({
            where: {
                email: webhookVerified.data.email_addresses[0].email_address
            }
        })

        let userData

        if (existUser) {
            userData = await prisma.user.update({
                where: {
                    id: existUser.id
                },
                data: {
                    clerkId: webhookVerified.data.id
                }
            })
        } else {
            userData = await prisma.user.create({
                data: {
                    name: webhookVerified.data.first_name + ' ' + webhookVerified.data.last_name,
                    email: webhookVerified.data.email_addresses[0].email_address,
                    clerkId: webhookVerified.data.id,
                    role: 'ADMIN',
                    password: '',
                },
            });
        }

        res.status(200).json({ message: "User created", userData });
        return;
    }
    res.status(200).json({ message: "Webhook received" });
};