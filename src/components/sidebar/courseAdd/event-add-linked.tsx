"use client";
import clsx from "clsx";
import { Palette, PlusIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { forwardRef, useState } from "react";
import { v4 as uuid } from "uuid";
import DangerModal from "@/components/modals/danger";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { createSwipeRightVariant, TRANSITION } from "@/lib/animation";
import { cn } from "@/lib/utils";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import type { RevisedSectionResponse } from "@/types/courses";
import CourseAddList, { MeetingsDisplay } from "./course-add-list";

type EventAddLinkedProps = {
	setSelectedOption: React.Dispatch<React.SetStateAction<string>>;
	closeParentModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EventAddLinked = forwardRef<HTMLDivElement, EventAddLinkedProps>(
	({ setSelectedOption, closeParentModal }, ref) => {
		const getTerm = useCourseStore((state) => state.getTerm);
		const getCourse = useCourseStore((state) => state.getCourse);

		const [selectedSection, setSelectedSection] = useState<
			Array<RevisedSectionResponse>
		>([]);
		const [selectedColor, setSelectedColor] = useState<string>("#4285F4");
		const [isResetModalOpen, setIsResetModalOpen] = useState(false);

		const tab = useUserStore((state) => state.getActiveTab());
		const eventAdd = useUserStore((state) => state.addEvent);

		const shouldReduceMotion = useReducedMotion();
		const swipeRightVariant = createSwipeRightVariant(shouldReduceMotion);

		const handleAddCourse = () => {
			for (const section of selectedSection) {
				const term = getTerm(section.termId);
				const course = getCourse(section.courseId);

				eventAdd(tab.id, {
					eventId: uuid(),
					color: selectedColor,

					kind: "linked-course",
					courseId: parseInt(section.courseId, 10),
					sectionId: parseInt(section.id, 10),
					termCode: term?.code || "",

					staticCourseCredits: course?.credits || 0,
				});
			}

			setSelectedSection([]);
			setSelectedOption("none");
		};

		return (
			<motion.div
				animate="animate"
				initial="initial"
				exit="exit"
				key="quick"
				variants={swipeRightVariant}
				transition={TRANSITION}
				ref={ref}
				className="flex flex-col gap-2"
			>
				<div className="flex flex-row items-center gap-2 justify-between">
					<p>Add Linked Course Event</p>

					<DangerModal
						type="proceedReset"
						isModalOpen={isResetModalOpen}
						onOpenChange={setIsResetModalOpen}
						triggerDestructive={selectedSection.length !== 0}
						triggerOnClick={() => {
							if (selectedSection.length === 0) {
								setSelectedOption("none");
								setSelectedSection([]);
								setIsResetModalOpen(false);
							} else {
								closeParentModal(true);
							}
						}}
						titleChildren="Reset Selected Course"
						descriptionChildren="Going back will clear the selected courses, are you sure you
									would like to proceed?"
						cancelOnClick={() => {
							closeParentModal(false);
						}}
						actionOnClick={() => {
							setIsResetModalOpen(false);
							closeParentModal(false);
							setSelectedSection([]);
							setTimeout(() => setSelectedOption("none"), 150);
						}}
					/>
				</div>

				<div className="flex flex-col gap-2 rounded-md border border-border p-2">
					<div className="flex flex-col gap-2">
						<ScrollArea className="h-24">
							{selectedSection.length === 0 ? (
								<div className="flex flex-col gap-1 h-24 justify-center text-center">
									<p className="">No Courses Selected</p>
									<p className="text-muted-foreground">
										Select some from the list below to get started!
									</p>
								</div>
							) : (
								selectedSection.map((section) => {
									const course = getCourse(section.courseId);
									if (!course) return null;

									return (
										<Popover key={`${section.courseId}-${section.id}`}>
											<PopoverTrigger className="cursor-pointer w-full text-left">
												{course.code}-{section.code}: {course.title}
											</PopoverTrigger>
											<PopoverContent className="sm:w-md">
												<div className="flex flex-col gap-2">
													<div className="flex flex-row items-baseline gap-1 justify-between">
														<p>{course.title}</p>
														<p>
															{course.code}-{section.code}
														</p>
													</div>
													<div className="flex flex-row items-baseline gap-1">
														<p>
															{course.credits}{" "}
															<span className="text-muted-foreground">
																credits
															</span>
														</p>

														<Separator orientation="vertical" />

														{section.seatsAvailable > -1 ? (
															<p
																className={cn(
																	clsx("", {
																		"text-yellow-600":
																			section.seatsAvailable /
																				section.seatsTotal <
																			0.5,
																		"text-destructive":
																			section.seatsAvailable /
																				section.seatsTotal <
																			0.25,
																	}),
																)}
															>
																{section.seatsAvailable} / {section.seatsTotal}{" "}
																<span className="text-muted-foreground">
																	{section.seatsAvailable > -1
																		? "seats"
																		: "on waitlist"}
																</span>
															</p>
														) : (
															<p className="text-destructive">
																{Math.abs(section.seatsAvailable)} on waitlist
															</p>
														)}
													</div>
												</div>

												<Separator />

												<MeetingsDisplay section={section} />
											</PopoverContent>
										</Popover>
									);
								})
							)}
						</ScrollArea>
						<div className="flex flex-row items-center gap-1 w-full">
							<Button
								disabled={selectedSection.length === 0}
								variant={selectedSection.length === 0 ? "secondary" : "default"}
								onClick={handleAddCourse}
								className="flex-1"
							>
								<PlusIcon /> Quick Add
							</Button>
							<Button
								disabled
								variant="secondary"
								className={clsx("", {
									"text-yellow-600":
										selectedSection.reduce((acc, curr) => {
											const course = getCourse(curr.courseId);
											if (!course) return acc;

											return acc + course.credits;
										}, 0) > 18,
								})}
							>
								{selectedSection.reduce((acc, curr) => {
									const course = getCourse(curr.courseId);
									if (!course) return acc;

									return acc + course.credits;
								}, 0)}{" "}
								credits
							</Button>

							<Tooltip>
								<TooltipTrigger
									render={
										<ColorPicker
											className="size-8 p-2"
											value={selectedColor}
											onChange={(v) =>
												setSelectedColor(
													typeof v === "string" ? v : v.target.value,
												)
											}
										>
											<Palette
												className="size-3.5"
												style={{
													color: `contrast-color(${selectedColor})`,
												}}
											/>
										</ColorPicker>
									}
								/>
								<TooltipContent>Select Color</TooltipContent>
							</Tooltip>
						</div>
					</div>
				</div>

				<CourseAddList
					selectedSection={selectedSection}
					setSelectedSection={setSelectedSection}
					multiple
				/>
			</motion.div>
		);
	},
);

EventAddLinked.displayName = "EventAddLinked";
export default EventAddLinked;
