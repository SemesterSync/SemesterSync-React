import type { Event } from "@/schemas/events";
import type {
	CourseResponse,
	MeetingResponse,
	SectionResponse,
} from "@/types/courses";
import type { CalendarCards } from "@/types/events";

export const CAL_START_HOUR = 6; // Inclusive, 6 AM
export const CAL_END_HOUR = 23; // Exclusive, 11 PM (up until 22:59)

export const CAL_SLOTS = 6; // 10 min per slot
export const CAL_MINS_PER_SLOT = 60 / CAL_SLOTS;
export const CAL_COLS = 7;
export const CAL_ROWS = (CAL_END_HOUR - CAL_START_HOUR) * CAL_SLOTS;
// ^ total hours * number of slots per hour to get total slots across all hours

export function structureCalendarEventData(
	events: Array<Event>,
	activeTerm: string,
	getCourse: (courseId: string) => CourseResponse | undefined,
	getSection: (sectionId: string) => SectionResponse | undefined,
	getMeetings: (sectionId: string) => Array<MeetingResponse>,
) {
	const structuredEvents: CalendarCards = [];

	for (const event of events) {
		switch (event.kind) {
			case "linked-course": {
				if (event.termCode !== activeTerm) continue;
				const course = getCourse(event.courseId.toString());
				if (!course) continue;
				const section = getSection(event.sectionId.toString());
				if (!section) continue;
				const meetings = getMeetings(event.sectionId.toString());

				for (const meeting of meetings) {
					const startDate = section.startDate;
					const endDate = section.endDate;
					const startTime = meeting.startTime;
					const endTime = meeting.endTime;

					if (startTime.getHours() >= CAL_END_HOUR) continue;
					if (endTime.getHours() < CAL_START_HOUR) continue;

					const columnOffset = determineCardColumnOffset(meeting.day);
					const rowOffset = determineCardRowOffset(startTime);
					const spanHeight = determineCardSpanHeight(startTime, endTime);

					if (columnOffset === -1) continue;

					const ins = [];
					if (meeting.primaryInstructor !== null)
						ins.push({
							firstName: meeting.primaryInstructor.firstName,
							lastName: meeting.primaryInstructor.lastName,
						});
					if (meeting.secondaryInstructor !== null)
						ins.push({
							firstName: meeting.secondaryInstructor.firstName,
							lastName: meeting.secondaryInstructor.lastName,
						});

					structuredEvents.push({
						id: event.eventId,
						key: `${event.eventId}-${meeting.day}-${startTime.toString()}-${endTime.toString()}`,
						meetingCount: meetings.length,

						title: `${course.code}-${section.code}`,
						description: `${course.title}`,

						startDate,
						endDate,
						startTime,
						endTime,

						rowOffset: rowOffset,
						columnOffset: columnOffset,
						spanHeight: spanHeight,

						color: event.color,

						kind: "linked-course",
						sectionCode: section.code,
						courseId: course.id,
						sectionId: section.id,

						seatsAvailable: section.seatsAvailable,
						seatsTotal: section.seatsTotal,

						credits: course.credits,

						campus: meeting.campus,
						building: {
							long: meeting.building?.name || "Unknown Building",
							short: meeting.building?.abbrev || null,
						},
						room: meeting.room || "Unknown Room",
						instructors: ins,
					});
				}
				break;
			}
			case "unlinked-course": {
				for (const meeting of event.meetings) {
					const startDate = new Date(event.startDate);
					const endDate = new Date(event.endDate);
					const startTime = new Date(meeting.startTime);
					const endTime = new Date(meeting.endTime);

					if (startTime.getHours() >= CAL_END_HOUR) continue;
					if (endTime.getHours() < CAL_START_HOUR) continue;

					const columnOffset = determineCardColumnOffset(meeting.day);
					const rowOffset = determineCardRowOffset(startTime);
					const spanHeight = determineCardSpanHeight(startTime, endTime);

					if (columnOffset === -1) continue;

					structuredEvents.push({
						id: event.eventId,
						key: `${event.eventId}-${meeting.day}-${meeting.startTime}-${meeting.endTime}`,
						meetingCount: event.meetings.length,

						title: `${event.courseCode}-${event.sectionCode}`,
						description: `${event.courseTitle}`,

						startDate,
						endDate,
						startTime,
						endTime,

						rowOffset: rowOffset,
						columnOffset: columnOffset,
						spanHeight: spanHeight,

						color: event.color,

						kind: "unlinked-course",
						sectionCode: event.sectionCode,

						credits: event.credits,

						campus: meeting.campus,
						building: meeting.building,
						room: meeting.room,
						instructors: meeting.instructors,
					});
				}
				break;
			}
			case "personal": {
				for (const meeting of event.meetings) {
					const startDate = new Date(event.startDate);
					const endDate = new Date(event.endDate);
					const startTime = new Date(meeting.startTime);
					const endTime = new Date(meeting.endTime);

					if (startTime.getHours() >= CAL_END_HOUR) continue;
					if (endTime.getHours() < CAL_START_HOUR) continue;

					const columnOffset = determineCardColumnOffset(meeting.day);
					const rowOffset = determineCardRowOffset(startTime);
					const spanHeight = determineCardSpanHeight(startTime, endTime);

					if (columnOffset === -1) continue;

					structuredEvents.push({
						id: event.eventId,
						key: `${event.eventId}-${meeting.day}-${meeting.startTime}-${meeting.endTime}`,
						meetingCount: event.meetings.length,

						title: event.title,
						description: event.description,

						startDate,
						endDate,
						startTime,
						endTime,

						rowOffset: rowOffset,
						columnOffset: columnOffset,
						spanHeight: spanHeight,

						color: event.color,

						kind: "personal",
						location: meeting.location,
					});
				}
				break;
			}
		}
	}

	return structuredEvents;
}

function roundMinutes(minutes: number) {
	return Math.round(minutes / CAL_MINS_PER_SLOT) * CAL_MINS_PER_SLOT;
	// ^ minutes rounded to nearest incr of slot (ie w/ 12 slots, mins will round to nearest multiple of 5)
}

function determineCardRowOffset(time: Date) {
	const timeHour = time.getHours();
	const timeMinutes = roundMinutes(time.getMinutes());

	const adjustedHour = timeHour - CAL_START_HOUR;
	const hourOffset = adjustedHour * CAL_SLOTS; // top slot of hour

	const minutesOffset = timeMinutes / CAL_MINS_PER_SLOT;

	return hourOffset + minutesOffset + 1;
}

function determineCardSpanHeight(startTime: Date, endTime: Date) {
	const startHour = startTime.getHours();
	const endHour = endTime.getHours();
	const startMinutes = roundMinutes(startTime.getMinutes());
	const endMinutes = roundMinutes(endTime.getMinutes());

	const hourSpan = (endHour - startHour) * CAL_SLOTS;

	const minutesDiff = Math.abs(endMinutes - startMinutes);
	const minutesSpan = minutesDiff / CAL_MINS_PER_SLOT;

	return hourSpan + minutesSpan;
}

function determineCardColumnOffset(day: string) {
	switch (day) {
		case "Sunday":
			return 1;
		case "Monday":
			return 2;
		case "Tuesday":
			return 3;
		case "Wednesday":
			return 4;
		case "Thursday":
			return 5;
		case "Friday":
			return 6;
		case "Saturday":
			return 7;
	}
	return -1;
}
