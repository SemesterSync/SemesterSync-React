import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/db/connection";
import { scheduleTable } from "@/db/schemas/schedule";

export async function PATCH(
	request: Request,
	{ params }: { params: Promise<{ scheduleId: string }> },
) {
	try {
		const { scheduleId } = await params;
		const body = await request.json();

		await db
			.update(scheduleTable)
			.set({
				name: body.name,
				events: body.events,
				term: body.term,
				totalCredits: body.totalCredits,
				selectedDate: body.selectedDate
					? new Date(body.selectedDate)
					: null,
			})
			.where(eq(scheduleTable.id, scheduleId));

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to update shared schedule:", error);

		return NextResponse.json(
			{ error: "Failed to update shared schedule" },
			{ status: 500 },
		);
	}
}