import { useVirtualizer } from "@tanstack/react-virtual";
import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	crateSwipeLeftVariant,
	createSwipeRightVariant,
	TRANSITION,
} from "@/lib/animation";
import { cn } from "@/lib/utils";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import type {
	RevisedCourseResponse,
	RevisedMeetingResponse,
	RevisedSectionResponse,
} from "@/types/courses";

type CourseAddListProps = {
	selectedSection: Array<RevisedSectionResponse>;
	setSelectedSection: React.Dispatch<
		React.SetStateAction<Array<RevisedSectionResponse>>
	>;
	multiple?: boolean;
	selectedAtTop?: boolean;
};

export default function CourseAddList({
	selectedSection: externalSelectedSection,
	setSelectedSection: setExternalSelectedSection,
	multiple = false,
	selectedAtTop = false,
}: CourseAddListProps) {
	const selectedTerm = useUserStore((state) => state.activeTerm);

	const getCourses = useCourseStore((state) => state.getCoursesByTermCode);
	const getSections = useCourseStore((state) => state.getSectionsByCourseId);
	const nCourses = useMemo(
		() => getCourses(selectedTerm),
		[selectedTerm, getCourses],
	);
	const [sections, setSections] = useState<Array<RevisedSectionResponse>>([]);

	const shouldReduceMotion = useReducedMotion();
	const swipeLeftVariant = crateSwipeLeftVariant(shouldReduceMotion);
	const swipeRightVariant = createSwipeRightVariant(shouldReduceMotion);

	const [searchQuery, setSearchQuery] = useState("");
	const [filteredCourses, setFilteredCourses] = useState<
		Array<RevisedCourseResponse>
	>([]);

	const [showingCourses, setShowingCourses] = useState(true);
	const [showCourseSectionId, setShowCourseSectionId] = useState("-1");
	const [selectedCourse, setSelectedCourse] = useState<Array<string>>([]);
	const [selectedSection, setSelectedSection] = useState<Array<string>>([]);

	useEffect(
		() => setSections(getSections(showCourseSectionId)),
		[getSections, showCourseSectionId],
	);

	// useEffect(() => {
	// 	if (typeof courses === "number") return;

	// 	setCoursesByTerm(courses[selectedTerm] || []);
	// 	setFilteredCourses(courses[selectedTerm] || []);
	// }, [selectedTerm, courses]);

	console.log(sections);

	useEffect(() => {
		if (searchQuery === "") setFilteredCourses(nCourses);

		let simplifiedQuery = searchQuery.toLowerCase();
		const isSearchingForSelected = searchQuery
			.toLowerCase()
			.includes("@selected");
		simplifiedQuery = simplifiedQuery.replace("@selected", "").trim();

		let filteredCourses = nCourses;

		if (isSearchingForSelected) {
			filteredCourses = filteredCourses.filter((course) =>
				selectedCourse.includes(course.id),
			);
		}

		filteredCourses = filteredCourses.filter(
			(course) =>
				course.title.toLowerCase().includes(simplifiedQuery) ||
				course.code.toLowerCase().includes(simplifiedQuery),
		);

		if (selectedAtTop) {
			filteredCourses = filteredCourses.sort((a, b) => {
				if (selectedCourse.includes(a.id) && !selectedCourse.includes(b.id)) {
					return -1;
				} else if (
					!selectedCourse.includes(a.id) &&
					selectedCourse.includes(b.id)
				) {
					return 1;
				} else {
					return 0;
				}
			});
		}

		setFilteredCourses(filteredCourses);
	}, [searchQuery, selectedCourse, selectedAtTop, nCourses]);

	useEffect(() => {
		const extSelectedCourses = [] as Array<string>;
		const extSelectedSections = [] as Array<string>;

		externalSelectedSection.forEach((section) => {
			extSelectedCourses.push(section.courseId);
			extSelectedSections.push(section.id);
		});

		setSelectedCourse(extSelectedCourses);
		setSelectedSection(extSelectedSections);
	}, [externalSelectedSection]);

	const [scrollParentRef, setScrollParentRef] = useState<HTMLDivElement | null>(
		null,
	);
	const virtualizer = useVirtualizer({
		count: filteredCourses.length,
		getScrollElement: () => scrollParentRef,
		estimateSize: () => 75,
		measureElement: (element) => element.getBoundingClientRect().height,
		gap: 8,
		overscan: 2,
	});
	const virtualItems = virtualizer.getVirtualItems();

	const refCallback = useCallback((node: HTMLDivElement) => {
		if (node) {
			setScrollParentRef(node);
		}
	}, []);

	if (nCourses.length === 0)
		return (
			<p className="text-destructive bg-destructive/20 rounded-lg text-xs py-2 w-full text-center">
				Error Loading Courses
			</p>
		);

	return (
		<div className="flex flex-col gap-2">
			<div className="relative overflow-hidden">
				<AnimatePresence initial={false} mode="popLayout">
					{showingCourses && (
						<motion.div
							animate="animate"
							initial="initial"
							exit="exit"
							key="search"
							variants={swipeLeftVariant}
							transition={TRANSITION}
						>
							<Input
								placeholder={`Search Courses...`} // TODO - Add back term name
								value={searchQuery}
								onChange={(e) => {
									setSearchQuery(e.target.value);
								}}
							/>
						</motion.div>
					)}

					{!showingCourses && (
						<motion.div
							animate="animate"
							initial="initial"
							exit="exit"
							key="back"
							variants={swipeRightVariant}
							transition={TRANSITION}
							whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
						>
							<Button
								variant={"outline"}
								className={"w-full"}
								onClick={() => {
									setShowingCourses(true);
									virtualizer.scrollToIndex(
										filteredCourses.findIndex(
											(course) => course.id === showCourseSectionId,
										) + 4,
									);
								}}
							>
								<ChevronLeft /> Back
							</Button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>

			<Separator />

			<ScrollArea className="h-96 overflow-x-hidden" ref={refCallback}>
				{filteredCourses.length === 0 && (
					<div className="text-center w-full text-muted-foreground">
						<p>No Courses Found.</p>
						<p className="text-xs">
							Tip: you can search for either the course code or course title
						</p>
					</div>
				)}
				<AnimatePresence initial={false} mode="popLayout">
					{showingCourses && (
						<motion.div
							style={{ height: `${virtualizer.getTotalSize()}px` }}
							className="relative w-full"
							animate="animate"
							initial="initial"
							exit="exit"
							key="courses"
							variants={swipeLeftVariant}
							transition={TRANSITION}
						>
							{virtualItems.map((vItem) => {
								const course = filteredCourses[vItem.index];
								const sectionCount = getSections(course.id).length;

								return (
									<div
										key={vItem.key}
										className="absolute top-0 left-0 w-full"
										style={{
											transform: `translateY(${vItem.start}px)`,
											height: `${vItem.size}px`,
										}}
									>
										<motion.button
											whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
											ref={virtualizer.measureElement}
											data-index={vItem.index}
											onClick={() => {
												setShowingCourses(false);
												setShowCourseSectionId(course.id);
											}}
											key={`${course.id}-${course.code}`}
											type="button"
											className={clsx(
												"rounded-lg border border-border p-2 flex flex-row hover:shadow gap-2 items-center justify-between cursor-pointer w-full text-left",
												{
													"border-success bg-success/5":
														selectedCourse.includes(course.id),
													// "my-2": vItem.index !== 0,
												},
											)}
										>
											<div className="flex flex-col gap-2">
												<p>{course.title}</p>

												<div className="flex flex-row items-center text-muted-foreground gap-2">
													<p>{course.code.replaceAll("#", "")}</p>
													<Separator orientation="vertical" />
													<p>
														{course.credits} Credit
														{course.credits > 1 && "s"}
													</p>
													<Separator orientation="vertical" />
													<p>
														{sectionCount} Section
														{sectionCount > 1 && "s"}
													</p>
												</div>
											</div>
											<ChevronRight className="size-4" />
										</motion.button>
									</div>
								);
							})}
						</motion.div>
					)}

					{!showingCourses && (
						<motion.div
							animate="animate"
							initial="initial"
							exit="exit"
							key="sections"
							variants={swipeRightVariant}
							transition={TRANSITION}
						>
							{sections
								?.sort(
									// Sorts by code from lowest to highest
									(a, b) => parseInt(a.code, 10) - parseInt(b.code, 10),
								)
								.sort((a, b) => {
									// Sorts so selected is at top
									const aSelected = selectedSection.includes(a.id) ? 1 : 0;
									const bSelected = selectedSection.includes(b.id) ? 1 : 0;
									return bSelected - aSelected;
								})
								.map((section, index) => (
									<motion.button
										whileTap={{ scale: shouldReduceMotion ? 1 : 0.98 }}
										type="button"
										key={section.id}
										onClick={() => {
											if (
												multiple &&
												selectedCourse.includes(showCourseSectionId) &&
												selectedSection.includes(section.id)
											) {
												setExternalSelectedSection(
													externalSelectedSection.filter(
														(c) =>
															c.courseId !== showCourseSectionId ||
															c.id !== section.id,
													),
												);
											} else {
												setExternalSelectedSection(
													multiple
														? [...externalSelectedSection, section]
														: [section],
												);
											}

											setShowingCourses(true);
										}}
										className={cn(
											clsx(
												"rounded-lg border border-border p-2 flex flex-col gap-2 w-full text-left cursor-pointer hover:shadow",
												{
													"my-2": index !== 0,
													"border-success bg-success/5":
														selectedSection.includes(section.id),
													// "border-yellow-500":
													// 	section.seats_available / section.seats_total <
													// 	0.5,
													// "border-destructive":
													// 	section.seats_available / section.seats_total <
													// 	0.25,
												},
											),
										)}
									>
										<div className="flex flex-row items-center gap-2 justify-between">
											<p>
												<span className="text-muted-foreground">Section:</span>{" "}
												{section.code}
											</p>

											{section.seatsAvailable < 0 ? (
												<p className="text-destructive">
													{Math.abs(section.seatsAvailable)}
													<span> on waitlist</span>
												</p>
											) : (
												<p
													className={cn(
														clsx("", {
															"text-yellow-600":
																section.seatsAvailable / section.seatsTotal <
																0.5,
															"text-destructive":
																section.seatsAvailable / section.seatsTotal <
																0.25,
														}),
													)}
												>
													{section.seatsAvailable} / {section.seatsTotal}{" "}
													<span className="text-muted-foreground">seats</span>
												</p>
											)}
										</div>

										<div>
											<p className="text-md font-bold w-full border border-transparent border-b-border pb-1 mb-1">
												Meetings:
											</p>
											<MeetingsDisplay section={section} />
										</div>
									</motion.button>
								))}
						</motion.div>
					)}
				</AnimatePresence>
			</ScrollArea>
		</div>
	);
}

export function MeetingsDisplay({
	section,
}: {
	section: RevisedSectionResponse;
}) {
	const getMeetings = useCourseStore((state) => state.getMeetings);
	const meetings = getMeetings(section.id);

	if (meetings.length === 0)
		return (
			<p className="text-muted-foreground">
				This course has no meetings, this likely means the course is remote.
			</p>
		);

	return mergeMeetings(meetings).map((meeting) => (
		<div
			key={`${section.id}-${meeting.id}`}
			className="border border-transparent border-b-border border-dashed pb-1 mb-1 last:border-b-0 last:pb-0 last:mb-0"
		>
			<div className="flex flex-row items-center gap-1">
				<p>
					{meeting.days.map((day, index) => (
						<Fragment key={day}>
							{day}
							{meeting.days.length === 2 && index === 0 && <span> & </span>}
							{meeting.days.length >= 3 && index < meeting.days.length - 2 && (
								<span>, </span>
							)}
							{meeting.days.length >= 3 &&
								index === meeting.days.length - 2 && <span> & </span>}
						</Fragment>
					))}
				</p>
				{meeting.building?.name === "Off Campus" ? (
					<p>
						<span className="text-muted-foreground">located</span> Off Campus
					</p>
				) : (
					<>
						<p className="text-muted-foreground">in</p>
						<Tooltip>
							<TooltipTrigger render={<p />}>
								{meeting.building?.abbrev || "N/A"}
							</TooltipTrigger>
							<TooltipContent>
								{meeting.building?.name || "Unknown Building"}
							</TooltipContent>
						</Tooltip>
						<p>{meeting.room || "Unknown Room"}</p>
					</>
				)}
			</div>

			<div className="flex flex-row items-center gap-1">
				<p className="text-muted-foreground">From</p>
				<p>
					{meeting.startTime.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
				<p className="text-muted-foreground">to</p>
				<p>
					{meeting.endTime.toLocaleTimeString("en-US", {
						hour: "2-digit",
						minute: "2-digit",
					})}
				</p>
			</div>

			<div className="flex flex-row items-center gap-1">
				<p className="text-muted-foreground">Instructed by </p>
				<p>
					{meeting.instructors.map((instructor, index) => (
						<Fragment key={instructor}>
							{instructor}
							{meeting.instructors.length === 2 && index === 0 && (
								<span> & </span>
							)}
							{meeting.instructors.length >= 3 &&
								index < meeting.instructors.length - 1 && <span>, </span>}
						</Fragment>
					))}
				</p>
			</div>
		</div>
	));
}

export function mergeMeetings(meetings: Array<RevisedMeetingResponse>) {
	const meetingsByTime: Array<
		Omit<RevisedMeetingResponse, "day"> & {
			days: Array<string>;
			instructors: Array<string>;
		}
	> = [];

	for (const meeting of meetings) {
		const building = meeting.building?.name || "Unknown Building";
		const room = meeting.room || "Unknown Room";
		const instructors: Array<string> = [];
		if (meeting.primaryInstructor !== null)
			instructors.push(
				`${meeting.primaryInstructor.firstName} ${meeting.primaryInstructor.lastName}`,
			);
		if (meeting.secondaryInstructor !== null)
			instructors.push(
				`${meeting.secondaryInstructor.firstName} ${meeting.secondaryInstructor.lastName}`,
			);

		const meetingItem = meetingsByTime.find(
			(findMeeting) =>
				findMeeting.startTime.toString() === meeting.startTime.toString() &&
				findMeeting.endTime.toString() === meeting.endTime.toString() &&
				findMeeting.building?.name === building &&
				findMeeting.room === room &&
				findMeeting.instructors.join("") === instructors.join(""),
		);

		if (!meetingItem) {
			meetingsByTime.push({
				...meeting,
				instructors,
				days: [meeting.day],
			});
		} else {
			meetingItem.days.push(meeting.day);
		}
	}

	return meetingsByTime;
}
