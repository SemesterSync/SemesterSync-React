"use client";

import { useState } from "react";
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
	const activeTab = useUserStore((state) => state.activeTab);
	const activeTerm = useUserStore((state) => state.activeTerm);
	const events = useUserStore((state) => state.getEvents(activeTab));
	const removeEvent = useUserStore((state) => state.removeEvent);

	const getCourse = useCourseStore((state) => state.getCourse);
	const getSection = useCourseStore((state) => state.getSection);
	const getMeetings = useCourseStore((state) => state.getMeetings);

	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isColorModalOpen, setIsColorModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [modalEvent, setModalEvent] = useState<CalendarCard | undefined>();

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
				setModalData={setModalEvent}
				setEditModalOpen={setIsEditModalOpen}
				setEditColorModalOpen={setIsColorModalOpen}
				setDeleteModalOpen={setIsDeleteModalOpen}
				deleteShiftAction={(eventId: string) => {
					removeEvent(activeTab, eventId);
					toast.add({
						title: "Event Deleted Successfully",
						type: "success",
					});
				}}
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
		</>
	);
}
