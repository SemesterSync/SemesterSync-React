import SharedScheduleClient from "@/components/shared-schedule-client";

import { getScheduleShare } from "@/data/scheduleShares";
import { getSchedule } from "@/data/schedule";

export default async function SharedSchedulePage({
	params,
}: {
	params: Promise<{ token: string }>;
}) {
	const { token } = await params;

	const scheduleShareResponse = await getScheduleShare(token);

	if (!scheduleShareResponse) {
		return (
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Schedule Not Found</h1>
				<p className="text-gray-600">
					The schedule you are looking for does not exist.
				</p>
			</div>
		);
	}

	const scheduleResponse = await getSchedule(
		scheduleShareResponse.scheduleId
	);

	if (!scheduleResponse) {
		return (
			<div className="flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold">Schedule Not Found</h1>
				<p className="text-gray-600">
					The schedule you are looking for does not exist.
				</p>
			</div>
		);
	}

	console.log(scheduleShareResponse)

	return (
		<SharedScheduleClient
			scheduleShareId={scheduleShareResponse.scheduleId}
			events={scheduleResponse.events}
			totalCredits={scheduleResponse.totalCredits}
		/>
	);
}