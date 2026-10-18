
"use client";

import { useEffect, useMemo, useState} from "react";

import AppHeader from "@/components/header/app-header";
import TabList from "@/components/tab-list";
import Calendar from "@/components/calendar/calendar";
import { ScrollArea } from "@/components/ui/scroll-area";

import useUserStore from "@/stores/user-store";
import useCourseStore from "@/stores/course-store";
import { structureCalendarEventData } from "@/lib/calendar-utils";
import type { Event } from "@/schemas/events";
import { CalendarCard } from "@/types/events";
import EditEventModal from "./modals/events/edit-event/edit-event";
import DangerModal from "./modals/danger";
import { toast } from "./ui/toast";
import EditColorModal from "./modals/events/edit-color";
import userStore from "@/stores/user-store";

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
	const setActiveTerm = useUserStore((state) => state.setActiveTerm)

    const getCourse = useCourseStore((state) => state.getCourse);
    const getSection = useCourseStore((state) => state.getSection);
    const getMeetings = useCourseStore((state) => state.getMeetings);

    const activeTab = useUserStore((state) => state.activeTab);
    const sharedEvents = useUserStore((state) => state.getEvents(activeTab));

    const updatePermission = useUserStore((state) => state.updatePermission);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isColorModalOpen, setIsColorModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalEvent, setModalEvent] = useState<CalendarCard | undefined>();

    const removeEvent = useUserStore((state) => state.removeEvent);

    const canEdit = userStore((state) => state.getActiveTab().permission === "edit");
    

    const structuredEvents = useMemo(
        () =>
            structureCalendarEventData(
                sharedEvents,
                term,
                getCourse,
                getSection,
                getMeetings,
            ),
        [
            sharedEvents,
            term,
            getCourse,
            getSection,
            getMeetings,
        ],
    );
     
    useEffect(() => {

       
        addTab(
            scheduleShareId,
            `Shared Schedule: ${name}`,
            events,
            permission,
        );

        setTabTotalCredits(scheduleShareId, totalCredits);
        setActiveTab(scheduleShareId);
		setActiveTerm(term);
        updatePermission(scheduleShareId, permission);
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
                    <Calendar
				events={structuredEvents}
				setModalData={canEdit ? setModalEvent : undefined}
				setEditModalOpen={ canEdit ? setIsEditModalOpen : undefined}
				setEditColorModalOpen={ canEdit ? setIsColorModalOpen : undefined}
				setDeleteModalOpen={    canEdit ? setIsDeleteModalOpen : undefined}
				deleteShiftAction={    canEdit ? (eventId: string) => {
					removeEvent(activeTab, eventId);
					toast.add({
						title: "Event Deleted Successfully",
						type: "success",
					});
				}: undefined}
			/>

			{modalEvent && (
				<EditEventModal
					eventId={modalEvent.id}
					open={isEditModalOpen}
					onOpenChange={setIsEditModalOpen}
					cancelOnClick={() => setModalEvent(undefined)}
					actionSecondaryOnClick={() => setModalEvent(undefined)}
				/>
			)}

			{modalEvent && (
				<DangerModal
					type="delete"
					isModalOpen={isDeleteModalOpen}
					onOpenChange={setIsDeleteModalOpen}
					trigger={null}
					titleChildren={`Delete ${modalEvent.title}`}
					descriptionChildren={
						<>
							You are about to delete this time slot
							{modalEvent.meetingCount > 1 && (
								<>
									, and{" "}
									<span className="font-bold">
										{modalEvent.meetingCount - 1} other
									</span>{" "}
									associated time slot
									{modalEvent.meetingCount > 2 && "s"}
								</>
							)}
						</>
					}
					cancelOnClick={() => setModalEvent(undefined)}
					actionChildren="Delete Event"
					actionOnClick={() => {
						removeEvent(activeTab, modalEvent.id);
						setModalEvent(undefined);
						toast.add({
							title: "Event Deleted Successfully",
							type: "success",
						});
					}}
				/>
			)}

			{modalEvent && (
				<EditColorModal
					eventId={modalEvent.id}
					open={isColorModalOpen}
					onOpenChange={setIsColorModalOpen}
					cancelOnClick={() => setModalEvent(undefined)}
					actionSecondaryOnClick={() => setModalEvent(undefined)}
				/>
			)}
                </ScrollArea>
            </main>
        </div>
    );
}
