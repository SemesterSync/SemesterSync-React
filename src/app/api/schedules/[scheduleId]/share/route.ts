import { NextResponse } from "next/server";
import { randomBytes } from "crypto";

import { db } from "@/db/connection";
import { scheduleTable } from "@/db/schemas/schedule";
import { scheduleSharesTable } from "@/db/schemas/schedule_shares";

export async function POST(
    request: Request,
    { params }: { params: Promise<{ scheduleId: string }> },
) {
    try {
        const { scheduleId } = await params;

        const body = await request.json();

        const {
            schedule,
            expiration,
            permission,
        } = body;

        if (!scheduleId) {
            return NextResponse.json(
                { error: "Schedule ID is required" },
                { status: 400 },
            );
        }

        if (!schedule) {
            return NextResponse.json(
                { error: "Schedule data is required" },
                { status: 400 },
            );
        }

        if (schedule.id  !== scheduleId){
            return NextResponse.json({
                error: "Schedule ID does not match"
            }, { status: 400 });
        }

        let expirationDate: Date | null = null;

        if (expiration !== "never") {
            const hours = Number(expiration);

            if (!Number.isFinite(hours) || hours <= 0) {
                return NextResponse.json(
                    { error: "Invalid expiration value" },
                    { status: 400 },
                );
            }

            expirationDate = new Date(
                Date.now() + hours * 60 * 60 * 1000,
            );
}
        
        await db
            .insert(scheduleTable)
            .values({
                id: schedule.id,
                name: schedule.name,
                events: schedule.events,
                totalCredits: schedule.totalCredits,
                selectedDate: new Date(schedule.selectedDate),
        })
            .onDuplicateKeyUpdate({
                set: {
                    name: schedule.name,
                    events: schedule.events,
                    totalCredits: schedule.totalCredits,
                    selectedDate: new Date(schedule.selectedDate),
                },
        });


        const token = randomBytes(32).toString("hex");


        await db.insert(scheduleSharesTable).values({
                scheduleId,
                token,
                permission: permission || "view",
                expiration: expirationDate,
                createdAt: new Date(),
        });



        const origin = new URL(request.url).origin;

        const url = `${origin}/shared/schedule/${token}`;

        console.log("Creating share link:", {
            scheduleId,
            permission,
            expiration,
            url,
        });

        // Database insert will go here.

        return NextResponse.json({
            url,
            token,
        });
    } catch (error) {
        console.error("Failed to create share link:", error);

        return NextResponse.json(
            { error: "Failed to create share link" },
            { status: 500 },
        );
    }
}