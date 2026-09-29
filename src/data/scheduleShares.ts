import "server-only";
import { db } from "@/db/connection";

import { scheduleSharesTable } from "@/db/schemas/schedule_shares";
import { eq } from "drizzle-orm";


export async function getScheduleShare(token: string) {
    try {
        const data = await db
                .select()
                .from(scheduleSharesTable)
                .where(eq(scheduleSharesTable.token, token))
                .limit(1);
        return data.length > 0 ? data[0] : null;
    }  catch (error) {
        console.error(error);
        return null;
    }
}