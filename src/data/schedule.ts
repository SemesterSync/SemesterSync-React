import "server-only";
import { db } from "@/db/connection";

import { scheduleTable } from "@/db/schemas/schedule";
import { eq } from "drizzle-orm";


export async function getSchedule(scheduleId: string) {
    try {
        const data = await db
                .select()
                .from(scheduleTable)
                .where(eq(scheduleTable.id, scheduleId))
                .limit(1);
        return data.length > 0 ? data[0] : null;
    }  catch (error) {
        console.error(error);
        return null;
    }
}