
"use client";

import { useEffect, useMemo } from "react";

import AppHeader from "@/components/header/app-header";
import TabList from "@/components/tab-list";
import Calendar from "@/components/calendar/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import useUserStore from "@/stores/user-store";
import useCourseStore from "@/stores/course-store";
import { structureCalendarEventData } from "@/lib/calendar-utils";
import type { Event } from "@/schemas/events";

type SharedScheduleClientProps = {
    scheduleShareId: string;
    events: Event[];
    totalCredits: number;
	term: string;
	name: string
};

export default function SharedScheduleClient({
    scheduleShareId,
    events,
    totalCredits,
	term,
	name
}: SharedScheduleClientProps) {

    const addTab = useUserStore((state) => state.addTab);
    const setActiveTab = useUserStore((state) => state.setActiveTab);
    const setTabTotalCredits = useUserStore((state) => state.setTabTotalCredits);
	const setActiveTerm = useUserStore((state) => state.setActiveTerm)

    const getCourse = useCourseStore((state) => state.getCourse);
    const getSection = useCourseStore((state) => state.getSection);
    const getMeetings = useCourseStore((state) => state.getMeetings);

    const structuredEvents = useMemo(
        () =>
            structureCalendarEventData(
                events,
                term,
                getCourse,
                getSection,
                getMeetings,
            ),
        [
            events,
            term,
            getCourse,
            getSection,
            getMeetings,
        ],
    );

    useEffect(() => {
        // Read the latest store state before creating the tab.
        const currentTab = useUserStore
            .getState()
            .tabs.find((tab) => tab.id === scheduleShareId);

        if (!currentTab) {
            addTab(
                scheduleShareId,
                `Shared Schedule: ${name}`,
                events,
            );
        }

        setTabTotalCredits(scheduleShareId, totalCredits);
        setActiveTab(scheduleShareId);
		setActiveTerm(term);
    }, [
        scheduleShareId,
        events,
        totalCredits,
		term,
		name,
        addTab,
        setActiveTab,
        setTabTotalCredits,
		setActiveTerm
    ]);

    return (
        <div className="flex h-screen min-w-0 w-full flex-col overflow-hidden">
            <AppHeader />

            <main className="min-w-0 flex-1 overflow-hidden">
                <TabList />

                <ScrollArea className="h-[89vh] rounded-t-lg">
                    <Calendar events={structuredEvents} />
                </ScrollArea>
            </main>
        </div>
    );
}
