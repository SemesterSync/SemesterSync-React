import { db } from "@/db/connection";
import { scheduleTable } from "@/db/schemas/schedule";
import { scheduleSharesTable } from "@/db/schemas/schedule_shares";

import { eq } from "drizzle-orm";


export default async function SharedSchedulePage({ params }: { params: Promise<{ token: string }>; }) {
    const { token } = await params;

    const share = await db.select()
                        .from(scheduleSharesTable)
                        .where(eq(scheduleSharesTable.token, token))
                        .limit(1);
                    
}