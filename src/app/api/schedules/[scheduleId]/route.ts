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

		// check if scheduleId is provided
		if (!scheduleId) {
			return NextResponse.json(
				{ error: "Schedule ID is required" },
				{ status: 400 },
			);
		}

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

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ scheduleId: string }> },
) {
	const { scheduleId } = await params;

	const result = await db
		.select()
		.from(scheduleTable)
		.where(eq(scheduleTable.id, scheduleId))
		.limit(1);

	if (result.length === 0) {
		return NextResponse.json(
			{ error: "Schedule not found" },
			{ status: 404 },
		);
	}

	return NextResponse.json(result[0]);
}