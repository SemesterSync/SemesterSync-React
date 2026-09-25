"use client";

import { structureCalendarEventData } from "@/lib/calendar-utils";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import Calendar from "./calendar";

export default function UserEventsCalendar() {
	const activeTab = useUserStore((state) => state.activeTab);
	const activeTerm = useUserStore((state) => state.activeTerm);
	const events = useUserStore((state) => state.getEvents(activeTab));

	const getCourse = useCourseStore((state) => state.getCourse);
	const getSection = useCourseStore((state) => state.getSection);
	const getMeetings = useCourseStore((state) => state.getMeetings);

	const structuredEvents = structureCalendarEventData(
		events,
		activeTerm,
		getCourse,
		getSection,
		getMeetings,
	);

	return <Calendar events={structuredEvents} />;
}
