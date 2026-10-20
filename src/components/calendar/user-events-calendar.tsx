"use client";

import { useState, useEffect, useRef} from "react";
import { structureCalendarEventData } from "@/lib/calendar-utils";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import type { CalendarCard } from "@/types/events";
import DangerModal from "../modals/danger";
import EditColorModal from "../modals/events/edit-color";
import EditEventModal from "../modals/events/edit-event/edit-event";
import { toast } from "../ui/toast";
import Calendar from "./calendar";

export default function UserEventsCalendar() {
	const activeTabId = useUserStore((state) => state.activeTab);
	const activeTerm = useUserStore((state) => state.activeTerm);
	const events = useUserStore((state) => state.getEvents(activeTabId));
	const removeEvent = useUserStore((state) => state.removeEvent);

	const getCourse = useCourseStore((state) => state.getCourse);
	const getSection = useCourseStore((state) => state.getSection);
	const getMeetings = useCourseStore((state) => state.getMeetings);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isColorModalOpen, setIsColorModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [modalEvent, setModalEvent] = useState<CalendarCard | undefined>();

	const activeTab = useUserStore((state) => state.getActiveTab());
	const canEdit = activeTab?.permission !== "view";

	const hasLoadedSharedTab = useRef(false);

	useEffect(() => {
		if (!activeTab?.sharedScheduleId) return;
		if (activeTab.permission !== "edit") return;

		if (!hasLoadedSharedTab.current) {
			hasLoadedSharedTab.current = true;
			return;
		}

		const timeout = setTimeout(async () => {
			try {
				const response = await fetch(
					`/api/schedules/${activeTab.sharedScheduleId}`,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({
							name: activeTab.name,
							events: activeTab.events,
							term: activeTerm,
							totalCredits: activeTab.totalCredits,
							selectedDate: activeTab.selectedDate,
						}),
					},
				);

				if (!response.ok) {
					console.error(
						"Failed to update shared schedule:",
						await response.text(),
					);
				}
			} catch (error) {
				console.error("Failed to update shared schedule:", error);
			}
		}, 500);

		return () => clearTimeout(timeout);
	}, [activeTab, activeTerm]);

	

	const structuredEvents = structureCalendarEventData(
		events,
		activeTerm,
		getCourse,
		getSection,
		getMeetings,
	);

	return (
		<>
			<Calendar
				events={structuredEvents}
				setModalData={canEdit ? setModalEvent : undefined}
				setEditModalOpen={canEdit ? setIsEditModalOpen : undefined}
				setEditColorModalOpen={canEdit ? setIsColorModalOpen : undefined}
				setDeleteModalOpen={canEdit ? setIsDeleteModalOpen : undefined}
				deleteShiftAction={
					canEdit
						? (eventId: string) => {
								removeEvent(activeTabId, eventId);
								toast.add({
									title: "Event Deleted Successfully",
									type: "success",
								});
							}
						: undefined
				}
			/>

			{canEdit && modalEvent && (
				<EditEventModal
					eventId={modalEvent.id}
					open={isEditModalOpen}
					onOpenChange={setIsEditModalOpen}
					cancelOnClick={() => setModalEvent(undefined)}
					actionSecondaryOnClick={() => setModalEvent(undefined)}
				/>
			)}

			{canEdit &&modalEvent && (
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
						removeEvent(activeTabId, modalEvent.id);
						setModalEvent(undefined);
						toast.add({
							title: "Event Deleted Successfully",
							type: "success",
						});
					}}
				/>
			)}

			{canEdit &&modalEvent && (
				<EditColorModal
					eventId={modalEvent.id}
					open={isColorModalOpen}
					onOpenChange={setIsColorModalOpen}
					cancelOnClick={() => setModalEvent(undefined)}
					actionSecondaryOnClick={() => setModalEvent(undefined)}
				/>
			)}
		</>
	);
}
