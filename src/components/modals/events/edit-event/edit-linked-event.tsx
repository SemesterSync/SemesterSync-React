"use client";

import { useEffect, useState } from "react";
import CourseAddList from "@/components/sidebar/courseAdd/course-add-list";
import {
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/toast";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import type { SectionResponse } from "@/types/courses";

type EditLinkedEventProps = {
	eventId: string;

	cancelOnClick?: () => void;
	actionSecondaryOnClick?: () => void;
};

export default function EditLinkedEvent({
	eventId,
	cancelOnClick,
	actionSecondaryOnClick,
}: EditLinkedEventProps) {
	const termCode = useUserStore((state) => state.activeTerm);
	const tabId = useUserStore((state) => state.activeTab);
	const eventData = useUserStore((state) => state.getEvent(tabId, eventId));
	const updateEvent = useUserStore((state) => state.updateEvent);

	const getSection = useCourseStore((state) => state.getSection);
	const getCourse = useCourseStore((state) => state.getCourse);

	const [selectedSection, setSelectedSection] = useState<
		Array<SectionResponse>
	>([]);

	useEffect(() => {
		if (eventData && eventData.kind === "linked-course") {
			const section = getSection(eventData.sectionId.toString());
			if (!section) return;

			setSelectedSection([section]);
		}
	}, [eventData, getSection]);

	if (!eventData) return null;

	return (
		<>
			<div>
				{eventData.kind === "linked-course" && (
					<CourseAddList
						selectedSection={selectedSection}
						setSelectedSection={setSelectedSection}
						selectedAtTop
					/>
				)}
			</div>

			<AlertDialogFooter>
				<AlertDialogCancel onClick={cancelOnClick ? cancelOnClick : () => {}}>
					Cancel
				</AlertDialogCancel>
				<AlertDialogAction
					onClick={() => {
						const course = getCourse(selectedSection[0].courseId);

						if (eventData.kind === "linked-course" && course) {
							updateEvent(tabId, {
								eventId,
								termCode,
								color: eventData.color,
								kind: "linked-course",
								courseId: selectedSection[0].courseId,
								sectionId: selectedSection[0].id,
								staticCourseCredits: course.credits,
							});
							toast.add({
								description: "Event updated successfully",
								type: "success",
							});
						}

						actionSecondaryOnClick ? actionSecondaryOnClick() : () => {};
					}}
				>
					Save Changes
				</AlertDialogAction>
			</AlertDialogFooter>
		</>
	);
}
