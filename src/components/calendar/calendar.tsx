"use client";

import clsx from "clsx";
import { Edit, Palette, Trash } from "lucide-react";
import { Fragment } from "react/jsx-runtime";
import {
	CAL_COLS,
	CAL_END_HOUR,
	CAL_ROWS,
	CAL_SLOTS,
	CAL_START_HOUR,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";
import useUserStore from "@/stores/user-store";
import type { CalendarCard, CalendarCards } from "@/types/events";
import {
	ContextMenu,
	ContextMenuContent,
	ContextMenuGroup,
	ContextMenuItem,
	ContextMenuLabel,
	ContextMenuSeparator,
	ContextMenuTrigger,
} from "../ui/context-menu";
import {
	HoverCard,
	HoverCardContent,
	HoverCardTrigger,
} from "../ui/hover-card";
import { Separator } from "../ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { CalendarCardUI } from "./calendar-card";

type CalendarProps = {
	events: CalendarCards;

	setModalData?: React.Dispatch<React.SetStateAction<CalendarCard | undefined>>;

	setEditModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	setEditColorModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	setDeleteModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	deleteShiftAction?: (eventId: string) => void;
};

export default function Calendar({
	events,
	setModalData,
	setEditModalOpen,
	setEditColorModalOpen,
	setDeleteModalOpen,
	deleteShiftAction,
}: CalendarProps) {
	const activeTab = useUserStore((state) => state.getActiveTab());

	const days = [
		{ long: "Sunday", short: "Sun" },
		{ long: "Monday", short: "Mon" },
		{ long: "Tuesday", short: "Tue" },
		{ long: "Wednesday", short: "Wed" },
		{ long: "Thursday", short: "Thu" },
		{ long: "Friday", short: "Fri" },
		{ long: "Saturday", short: "Sat" },
	];

	const today = new Date();
	const selectedDate = activeTab.selectedDate
		? new Date(activeTab.selectedDate)
		: new Date();

	const firstDayOfWeek = new Date(selectedDate);
	firstDayOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
	// ^ sets day of month to the "selected day of month - # days from Sunday"

	function formatHourPair(hour: number) {
		const period = hour >= 12 ? "PM" : "AM";
		const displayHour = hour % 12 === 0 ? 12 : hour % 12;
		return {
			onHour: `${displayHour}:00 ${period}`,
			onHalf: `${displayHour}:30 ${period}`,
		};
	}

	return (
		<div
			className="grid w-full max-w-full mb-4"
			style={{
				gridTemplateColumns: `5rem repeat(${CAL_COLS},minmax(0, 1fr))`,
				gridTemplateRows: `3.25rem repeat(${CAL_ROWS},minmax(0, 1.25rem))`,
			}}
		>
			{/* Time sidebar */}
			<div className="row-start-2 row-span-full grid grid-rows-subgrid border-r">
				{Array.from({ length: CAL_END_HOUR - CAL_START_HOUR }).map((_, i) => {
					const hour = CAL_START_HOUR + i;
					const hourPair = formatHourPair(hour);

					return (
						<Fragment key={hour}>
							<div
								className={clsx(
									"text-xs text-muted-foreground text-center",
									{ "border-t": i > 0 }, // skip border on first row
								)}
								style={{
									gridRow: `span ${CAL_SLOTS / 2} / span ${CAL_SLOTS / 2}`,
								}}
							>
								{hourPair.onHour}
							</div>

							<div
								className="text-xs text-muted-foreground text-center border-t"
								style={{
									gridRow: `span ${CAL_SLOTS / 2} / span ${CAL_SLOTS / 2}`,
								}}
							>
								{hourPair.onHalf}
							</div>
						</Fragment>
					);
				})}
			</div>

			{/* Day Header Bar */}
			<div className="col-span-full grid grid-cols-subgrid border-b bg-background sticky top-0">
				<span id="empty-day-spacer" className="border-r"></span>
				{days.map((day, i) => {
					const currentDate = new Date(firstDayOfWeek);
					currentDate.setDate(firstDayOfWeek.getDate() + i);

					const dataNumber = currentDate.getDate();

					const isToday =
						currentDate.getDate() === today.getDate() &&
						currentDate.getMonth() === today.getMonth() &&
						currentDate.getFullYear() === today.getFullYear();

					return (
						<div
							key={day.long}
							className={clsx(
								"flex justify-center items-center border-r text-sm gap-2",
								{ "text-primary": isToday },
							)}
						>
							<span className={!isToday ? "text-muted-foreground" : ""}>
								{day.short}
							</span>

							{dataNumber}
						</div>
					);
				})}
			</div>

			{/* Inner Grid Borders */}
			<div className="col-start-2 row-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
				{Array.from({
					length: (CAL_END_HOUR - CAL_START_HOUR) * CAL_COLS * 2,
				}).map((_, i) => {
					const col = i % CAL_COLS;
					const row = Math.floor(i / CAL_COLS);

					return (
						<span
							key={`${col}-${row}`}
							className={clsx("border-r", {
								"border-t": row > 0, // skip top border so no double
							})}
							style={{
								gridRow: `span ${CAL_SLOTS / 2} / span ${CAL_SLOTS / 2}`,
							}}
						></span>
					);
				})}
			</div>

			{/* Events */}
			<div className="col-start-2 row-start-2 col-span-full row-span-full grid grid-cols-subgrid grid-rows-subgrid">
				{events.map((event) => {
					const d = new Date(firstDayOfWeek);
					d.setDate(firstDayOfWeek.getDate() + event.columnOffset);

					if (d <= event.startDate || d >= event.endDate) return null;

					return (
						<HoverCard key={event.key}>
							<ContextMenu>
								<HoverCardTrigger
									render={
										<ContextMenuTrigger
											style={{
												gridArea: `${event.rowOffset} / ${event.columnOffset} / span ${event.spanHeight} / ${event.columnOffset}`,
											}}
										>
											<CalendarCardUI
												event={{
													title: event.title,
													description: event.description,
													startTime: event.startTime,
													endTime: event.endTime,
													color: event.color,
												}}
											/>
										</ContextMenuTrigger>
									}
								/>

								<HoverCardContent side="right" className="flex flex-col gap-1">
									{event.kind !== "personal" ? (
										<>
											<p>
												<PrimaryText>Course: </PrimaryText>
												{event.title}
											</p>
											<p>
												<PrimaryText>Credits: </PrimaryText>
												{event.credits}
											</p>
											{event.kind === "linked-course" && (
												<p
													className={cn(
														clsx("", {
															"text-yellow-600":
																event.seatsAvailable / event.seatsTotal < 0.5,
															"text-destructive":
																event.seatsAvailable / event.seatsTotal < 0.25,
														}),
													)}
												>
													<PrimaryText>Seats: </PrimaryText>
													{event.seatsAvailable > -1
														? `${event.seatsAvailable}/${event.seatsTotal}`
														: `${Math.abs(event.seatsAvailable)} on waitlist`}
												</p>
											)}
											<p>
												<PrimaryText>Section: </PrimaryText>
												{event.sectionCode}
											</p>
											<p>
												<PrimaryText>Campus: </PrimaryText>
												{event.campus}
											</p>
											{event.kind === "linked-course" ? (
												<span>
													<PrimaryText>Building: </PrimaryText>
													<Tooltip>
														<TooltipTrigger>
															{event.building.short}
														</TooltipTrigger>
														<TooltipContent>
															{event.building.long}
														</TooltipContent>
													</Tooltip>
												</span>
											) : (
												<p>
													<PrimaryText>Building: </PrimaryText>
													{event.building}
												</p>
											)}
											<p>
												<PrimaryText>Room: </PrimaryText>
												{event.room}
											</p>
											<Separator className="bg-black/20" />
											<p>
												<PrimaryText>Instructors: </PrimaryText>
												{event.instructors.map((instructor) => (
													<Fragment
														key={`${instructor.firstName}-${instructor.lastName}`}
													>
														{instructor.firstName} {instructor.lastName}
													</Fragment>
												))}
											</p>
										</>
									) : (
										<p>
											<PrimaryText>Location: </PrimaryText>
											<span
												className={
													event.location ? "" : "italic text-muted-foreground"
												}
											>
												{event.location
													? event.location
													: "No location provided"}
											</span>
										</p>
									)}
								</HoverCardContent>

								{(setEditColorModalOpen ||
									setEditModalOpen ||
									(setDeleteModalOpen && deleteShiftAction)) &&
								setModalData ? (
									<ContextMenuContent>
										{setEditModalOpen && (
											<ContextMenuItem
												onClick={() => {
													setEditModalOpen(true);
													setModalData(event);
												}}
											>
												<Edit /> Edit
											</ContextMenuItem>
										)}

										{setEditColorModalOpen && (
											<ContextMenuItem
												onClick={() => {
													setEditColorModalOpen(true);
													setModalData(event);
												}}
											>
												<Palette /> Change Color
											</ContextMenuItem>
										)}

										{setDeleteModalOpen && deleteShiftAction && (
											<>
												{(setEditColorModalOpen || setEditModalOpen) && (
													<ContextMenuSeparator />
												)}

												<ContextMenuItem
													variant="destructive"
													onClick={(e) => {
														if (e.shiftKey) {
															deleteShiftAction(event.id);
														} else {
															setDeleteModalOpen(true);
															setModalData(event);
														}
													}}
												>
													<Trash /> Delete
												</ContextMenuItem>
											</>
										)}
									</ContextMenuContent>
								) : (
									<ContextMenuContent>
										<ContextMenuGroup>
											<ContextMenuLabel>No actions available</ContextMenuLabel>
										</ContextMenuGroup>
									</ContextMenuContent>
								)}
							</ContextMenu>
						</HoverCard>
					);
				})}
			</div>
		</div>
	);
}

function PrimaryText({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	return <span className={cn("text-primary", className)}>{children}</span>;
}
