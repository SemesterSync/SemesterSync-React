"use client";

import { useEffect, useRef } from "react";
import { CalendarCards } from "@/types/events";

import AppHeader from "@/components/header/app-header";
import TabList from "@/components/tab-list";
import Calendar from "@/components/calendar/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import useUserStore from "@/stores/user-store";
import useCourseStore from "@/stores/course-store";
import { structureCalendarEventData } from "@/lib/calendar-utils";
import { Event } from "@/schemas/events";


export default function SharedScheduleClient({
	scheduleShareId,
	events,
	totalCredits,
}: {
	scheduleShareId: string;
	events: Event[];
	totalCredits: number;
}) {
	const addTab = useUserStore((state) => state.addTab);
	const setActiveTab = useUserStore((state) => state.setActiveTab);
	const setActiveTerm = useUserStore((state) => state.setActiveTerm);
	const getActiveTab = useUserStore((state) => state.getActiveTab);
	
	const getCourse = useCourseStore((state) => state.getCourse);
	const getSection = useCourseStore((state) => state.getSection);
	const getMeetings = useCourseStore((state) => state.getMeetings);	
	const activeTerm = useUserStore((state) => state.activeTerm);
  
	const existingTab = useUserStore.getState().tabs.find((tab) => tab.id === scheduleShareId);
	const isRendered = useRef(false);


	const structuredEvents = structureCalendarEventData(
			events,
			activeTerm,
			getCourse,
			getSection,
			getMeetings,
		);


	useEffect(() => {
		console.log("tabs", existingTab);
		if (!isRendered.current) {
			if (existingTab) {
				setActiveTab(existingTab.id);
			} else {	
				const newTabId = addTab(
					scheduleShareId,
					`Shared Schedule: ${scheduleShareId}`,
					events,
				);

				getActiveTab().totalCredits = totalCredits;

				isRendered.current = true;
				setActiveTab(newTabId);
				setActiveTerm(activeTerm);
			}
		}
	}, [
		scheduleShareId,
		events,
		addTab,
		setActiveTab,
		existingTab,
		activeTerm,
		setActiveTerm,
		getActiveTab,
		totalCredits,
	]);

	return (
		<div className="flex h-screen min-w-0 w-full flex-col overflow-hidden">
			<AppHeader />

			<main className="flex-1 min-w-0 overflow-hidden">
				<TabList />

				<ScrollArea className="h-[89vh] rounded-t-lg">
					<Calendar events={structuredEvents} />
				</ScrollArea>
			</main>
		</div>
	);
}