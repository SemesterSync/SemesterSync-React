"use client";

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";
import { CalendarCardUI } from "@/components/events/calendar-card";
import { EventListCardUI } from "@/components/events/list-card";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ColorPickerInners } from "@/components/ui/color-picker";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { defaultColors, mergeMeetings } from "@/lib/utils";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import type {
	CourseResponse,
	MeetingResponse,
	SectionResponse,
} from "@/types/courses";

type EditColorModalProps = {
	eventId: string;

	open?: boolean;
	onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;

	trigger?: React.ReactNode;

	cancelOnClick?: () => void;
	actionSecondaryOnClick?: () => void;
};

export default function EditColorModal({
	eventId,

	open,
	onOpenChange,

	trigger,

	cancelOnClick,
	actionSecondaryOnClick,
}: EditColorModalProps) {
	const tabId = useUserStore((state) => state.activeTab);
	const eventData = useUserStore((state) => state.getEvent(tabId, eventId));
	const updateEvent = useUserStore((state) => state.updateEvent);

	const getCourse = useCourseStore((state) => state.getCourse);
	const getSection = useCourseStore((state) => state.getSection);
	const getMeetings = useCourseStore((state) => state.getMeetings);

	const [selectedColor, setSelectedColor] = useState(
		eventData ? eventData.color : "#4285F4",
	);
	const [courseData, setCourseData] = useState<CourseResponse>();
	const [sectionData, setSectionData] = useState<SectionResponse>();
	const [meetings, setMeetings] = useState<Array<MeetingResponse>>([]);

	useEffect(() => {
		console.log("eventData", eventData);
		if (eventData && eventData.kind === "linked-course") {
			const course = getCourse(eventData.courseId.toString());
			console.log("course", course);
			if (!course) return;
			const section = getSection(eventData.sectionId.toString());
			console.log("section", section);
			if (!section) return;
			const meetings = getMeetings(eventData.sectionId.toString());
			console.log("meetings", meetings);

			console.log("info", course, section, meetings);

			setCourseData(course);
			setSectionData(section);
			setMeetings(meetings);
		}
	}, [eventData, getCourse, getSection, getMeetings]);

	if (!eventData) return null;

	console.log(eventData, courseData, sectionData, meetings);

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{trigger ? (
				trigger
			) : (
				<AlertDialogTrigger render={<Button variant="secondary" size="icon" />}>
					<Palette />
				</AlertDialogTrigger>
			)}

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Edit Event Color</AlertDialogTitle>
				</AlertDialogHeader>

				<div className="flex flex-row items-start gap-4">
					<div className="flex flex-col justify-between h-full flex-1">
						<div className="space-y-2">
							<ColorPickerInners
								value={selectedColor}
								onChange={(v) => setSelectedColor(v)}
							/>

							<div className="flex flex-row items-center gap-2">
								{defaultColors.map((color) => (
									<button
										key={color}
										type="button"
										onClick={() => setSelectedColor(color)}
										className="size-4 rounded-sm cursor-pointer border border-border"
										style={{ backgroundColor: color }}
									></button>
								))}
							</div>
						</div>

						<AlertDialogFooter>
							<AlertDialogCancel
								onClick={cancelOnClick ? cancelOnClick : () => {}}
							>
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction
								onClick={() => {
									eventData.color = selectedColor;
									updateEvent(tabId, eventData);

									toast.add({
										title: "Event Color Changed",
										type: "success",
									});

									actionSecondaryOnClick ? actionSecondaryOnClick() : () => {};
								}}
							>
								Save Color
							</AlertDialogAction>
						</AlertDialogFooter>
					</div>

					<Separator orientation="vertical" />

					<div className="flex-1">
						<h2 className="font-semibold">Event List Preview:</h2>
						<EventListCardUI
							data={
								eventData.kind === "linked-course"
									? {
											eventId,
											title: `${courseData?.code}-${sectionData?.code}`,
											description: `${courseData?.title}`,
											color: selectedColor,
											meetings: mergeMeetings(
												meetings.map((meeting) => {
													const startTime = meeting.startTime.toString();
													const endTime = meeting.endTime.toString();

													return {
														day: meeting.day,
														startTime,
														endTime,
													};
												}) || [],
											),
										}
									: eventData.kind === "unlinked-course"
										? {
												eventId,
												title: `${eventData.courseCode}-${eventData.sectionCode}`,
												description: eventData.courseTitle,
												color: selectedColor,
												meetings: mergeMeetings(eventData.meetings),
											}
										: {
												eventId,
												title: eventData.title,
												description: eventData.description || "",
												color: selectedColor,
												meetings: mergeMeetings(eventData.meetings),
											}
							}
						/>

						<h2 className="font-semibold">Event Calendar Preview:</h2>
						{(meetings.length > 0 || eventData.kind !== "linked-course") && (
							<CalendarCardUI
								event={
									eventData.kind === "linked-course"
										? {
												title: `${courseData?.code}-${sectionData?.code}`,
												description: `${courseData?.title}`,
												startTime: meetings[0].startTime,
												endTime: meetings[0].endTime,
												color: selectedColor,
											}
										: eventData.kind === "unlinked-course"
											? {
													title: `${eventData.courseCode}-${eventData.sectionCode}`,
													description: eventData.courseTitle,
													startTime: eventData.meetings[0].startTime,
													endTime: eventData.meetings[0].endTime,
													color: selectedColor,
												}
											: {
													title: eventData.title,
													description: eventData.description || "",
													startTime: eventData.meetings[0].startTime,
													endTime: eventData.meetings[0].endTime,
													color: selectedColor,
												}
								}
							/>
						)}
					</div>
				</div>
			</AlertDialogContent>
		</AlertDialog>
	);
}
