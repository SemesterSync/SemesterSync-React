"use client";

import { useEffect, useRef } from "react";

import UserEventsCalendar from "@/components/calendar/user-events-calendar";
import AppHeader from "@/components/header/app-header";
import TabList from "@/components/tab-list";
import { ScrollArea } from "@/components/ui/scroll-area";
import useUserStore from "@/stores/user-store";
import type { Event } from "@/schemas/events";

type SharedScheduleClientProps = {
	scheduleShareId: string;
	events: Event[];
	totalCredits: number;
	term: string;
	name: string;
	permission: "view" | "edit";
};

export default function SharedScheduleClient({
	scheduleShareId,
	events,
	totalCredits,
	term,
	name,
	permission,
}: SharedScheduleClientProps) {
	const addTab = useUserStore((state) => state.addTab);

	const setActiveTab = useUserStore((state) => state.setActiveTab);
	const setTabTotalCredits = useUserStore((state) => state.setTabTotalCredits);
	const setActiveTerm = useUserStore((state) => state.setActiveTerm);
	
    const sharedTab = useUserStore((state) => state.tabs.find((tab) => tab.id === scheduleShareId));

	const initialized = useRef(false);

    const cleanedName = sharedTab?.name.startsWith("Shared Schedule: ") ? sharedTab?.name.substring("Shared Schedule: ".length) : sharedTab?.name;

    useEffect(() => {
    // so only viewers can fetch the latest schedule data, and editors can save changes to the schedule
	if (!sharedTab || permission === "edit") return;

	const interval = setInterval(async () => {
		const response = await fetch(`/api/schedules/${scheduleShareId}`, {
			cache: "no-store",
		});

		if (!response.ok) return;

		const latestSchedule = await response.json();

		addTab(
			scheduleShareId,
			`Shared Schedule: ${latestSchedule.name}`,
			latestSchedule.events,
			permission,
		);

		setTabTotalCredits(
			scheduleShareId,
			latestSchedule.totalCredits,
		);
	}, 3000);

	return () => clearInterval(interval);
}, [
	sharedTab,
	scheduleShareId,
	permission,
	addTab,
	setTabTotalCredits,
]);

    useEffect(() => {
        if (!sharedTab || permission !== "edit") return;

        const timeout = setTimeout(async () => {
            const response = await fetch(`/api/schedules/${scheduleShareId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: cleanedName,
                    events: sharedTab.events,
                    term,
                    totalCredits: sharedTab.totalCredits,
                    selectedDate: sharedTab.selectedDate,
                }),
            });

            if (!response.ok) {
                console.error(
                    "Failed to save shared schedule:",
                    await response.text(),
                );
            }
        }, 500);

        return () => clearTimeout(timeout);
    }, [sharedTab, scheduleShareId, permission, term, cleanedName]);

	useEffect(() => {
		if (initialized.current) return;

		initialized.current = true;

		addTab(
			scheduleShareId,
			`Shared Schedule: ${name}`,
			events,
			permission,
		);

		setTabTotalCredits(scheduleShareId, totalCredits);
		setActiveTerm(term);
		setActiveTab(scheduleShareId);
	}, [
		scheduleShareId,
		events,
		totalCredits,
		term,
		name,
		permission,
		addTab,
		setTabTotalCredits,
		setActiveTerm,
		setActiveTab,
	]);

	return (
		<div className="flex h-screen min-w-0 w-full flex-col overflow-hidden">
			<AppHeader />

			<main className="min-w-0 flex-1 overflow-hidden">
				<TabList />

				<ScrollArea className="h-[89vh] rounded-t-lg">
					<UserEventsCalendar />
				</ScrollArea>
			</main>
		</div>
	);
}