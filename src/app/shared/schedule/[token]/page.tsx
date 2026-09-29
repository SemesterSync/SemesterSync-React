
import CalendarContainer from "@/components/calendar-container";
import AppHeader from "@/components/header/app-header";
import TabList from "@/components/tab-list";

import { ScrollArea } from "@/components/ui/scroll-area";

import { getTerms } from "@/data/terms";
import { getAllCoursesWithMeetings } from "@/data/courses";
import { getScheduleShare } from "@/data/scheduleShares";
import { getSchedule } from "@/data/schedule";


export default async function SharedSchedulePage({
	params,
}: {
	params: Promise<{ token: string }>;
}) {
    const { token } = await params;

    const termsResponse = await getTerms();
    const courseResponse = await getAllCoursesWithMeetings();
    const sheduleShareResponse = await getScheduleShare(token);

    if (!sheduleShareResponse) {
        return (
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold">Schedule Not Found</h1>
                <p className="text-gray-600">
                    The schedule you are looking for does not exist.
                </p>
            </div>
        );
    }

    const scheduleId = sheduleShareResponse.scheduleId;

    const scheduleResponse = await getSchedule(scheduleId);

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

	return (
        <div className="flex h-screen min-w-0 w-full flex-col overflow-hidden">
			<AppHeader />

			<main className="flex-1 min-w-0 overflow-hidden">
				<TabList />

				<ScrollArea className="h-[89vh] rounded-t-lg">
					<CalendarContainer courses={courseResponse} terms={termsResponse} />
				</ScrollArea>
			</main>
		</div>
	);
}