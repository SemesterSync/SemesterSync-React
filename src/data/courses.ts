import { eq } from "drizzle-orm";
import { db } from "@/db/connection";
import { meetingTable } from "@/db/schemas/meetings";
import { sectionTable } from "@/db/schemas/sections";
import "server-only";
import { buildingTable } from "@/db/schemas/buildings";
import { courseTable } from "@/db/schemas/courses";
import {
	primaryInstructorsTable,
	secondaryInstructorsTable,
} from "@/db/schemas/instructors";
import { roomTable } from "@/db/schemas/rooms";
import { termTable } from "@/db/schemas/terms";
import type { DaysOfWeek } from "@/schemas/util";
import type {
	AssembledCourse,
	CourseResponse,
	RevisedCourseResponse,
	RevisedMeetingResponse,
	RevisedSectionResponse,
} from "@/types/courses";

export async function getAllCourses(): Promise<RevisedCourseResponse[]> {
	try {
		const data = await db.select().from(courseTable);

		return data.map((course) => ({
			id: String(course.course_id),
			code: course.course_code,
			title: course.course_title,
			credits: parseFloat(course.credits),
		}));
	} catch (error) {
		console.error(error);

		return [];
	}
}

export async function getAllSections(): Promise<RevisedSectionResponse[]> {
	try {
		const data = await db
			.select()
			.from(sectionTable)
			.leftJoin(
				primaryInstructorsTable,
				eq(
					sectionTable.primary_instructor_id,
					primaryInstructorsTable.instructor_id,
				),
			)
			.leftJoin(
				secondaryInstructorsTable,
				eq(
					sectionTable.secondary_instructor_id,
					secondaryInstructorsTable.instructor_id,
				),
			);

		return data.map((section) => ({
			id: String(section.sections.section_id),
			termId: String(section.sections.term_id),
			courseId: String(section.sections.course_id),
			primaryInstructorId: section.instructors
				? {
						id: String(section.instructors.instructor_id),
						firstName: section.instructors.instructor_name
							.split(",")[1]
							?.trim(),
						lastName: section.instructors.instructor_name.split(",")[0]?.trim(),
					}
				: null,
			secondaryInstructorId: section.secondary
				? {
						id: String(section.secondary.instructor_id),
						firstName: section.secondary.instructor_name.split(",")[1]?.trim(),
						lastName: section.secondary.instructor_name.split(",")[0]?.trim(),
					}
				: null,
			code: section.sections.section_code,
			startDate: section.sections.start_date,
			endDate: section.sections.end_date,
			deliveryMethod: section.sections.delivery_method,
			courseAttribute: section.sections.course_attribute,
			classComments: section.sections.class_comments,
			seatsAvailable: parseInt(
				section.sections.avail_seats.split(" of ")[0],
				10,
			),
			seatsTotal: parseInt(section.sections.avail_seats.split(" of ")[1], 10),
		}));
	} catch (error) {
		console.error(error);

		return [];
	}
}

export async function getAllMeetings(): Promise<RevisedMeetingResponse[]> {
	try {
		const data = await db
			.select()
			.from(meetingTable)
			.leftJoin(
				primaryInstructorsTable,
				eq(
					meetingTable.primary_instructor_id,
					primaryInstructorsTable.instructor_id,
				),
			)
			.leftJoin(
				secondaryInstructorsTable,
				eq(
					meetingTable.secondary_instructor_id,
					secondaryInstructorsTable.instructor_id,
				),
			)
			.leftJoin(roomTable, eq(meetingTable.room_id, roomTable.room_id))
			.leftJoin(
				buildingTable,
				eq(meetingTable.building_id, buildingTable.building_id),
			);

		return data.map((meeting) => ({
			id: String(meeting.meetings.meeting_id),
			sectionId: String(meeting.meetings.section_id),

			day: meeting.meetings.day as DaysOfWeek,
			startTime: new Date(`2026-09-08T${meeting.meetings.start_time}`),
			endTime: new Date(`2026-09-08T${meeting.meetings.end_time}`),
			campus: meeting.meetings.location,
			primaryInstructor: meeting.instructors
				? {
						id: String(meeting.instructors.instructor_id),
						firstName: meeting.instructors.instructor_name
							.split(",")[1]
							?.trim(),
						lastName: meeting.instructors.instructor_name.split(",")[0]?.trim(),
					}
				: null,
			secondaryInstructor: meeting.secondary
				? {
						id: String(meeting.secondary.instructor_id),
						firstName: meeting.secondary.instructor_name.split(",")[1]?.trim(),
						lastName: meeting.secondary.instructor_name.split(",")[0]?.trim(),
					}
				: null,

			building: meeting.buildings
				? {
						id: String(meeting.buildings.building_id),
						name: meeting.buildings.building_name,
						abbrev: meeting.buildings.building_abbrev,
					}
				: null,
			room: meeting.rooms ? meeting.rooms.room : null,
		}));
	} catch (error) {
		console.error(error);
		return [];
	}
}

export async function getAllCoursesWithMeetings(): Promise<CourseResponse> {
	try {
		const data = await db
			.select()
			.from(meetingTable)
			.leftJoin(
				sectionTable,
				eq(meetingTable.section_id, sectionTable.section_id),
			)
			.leftJoin(
				buildingTable,
				eq(meetingTable.building_id, buildingTable.building_id),
			)
			.leftJoin(roomTable, eq(meetingTable.room_id, roomTable.room_id))
			.leftJoin(
				primaryInstructorsTable,
				eq(
					meetingTable.primary_instructor_id,
					primaryInstructorsTable.instructor_id,
				),
			)
			.leftJoin(
				secondaryInstructorsTable,
				eq(
					meetingTable.secondary_instructor_id,
					secondaryInstructorsTable.instructor_id,
				),
			)
			.leftJoin(termTable, eq(sectionTable.term_id, termTable.term_id))
			.leftJoin(courseTable, eq(sectionTable.course_id, courseTable.course_id));

		const courseByTerm: Record<string, Array<AssembledCourse>> = {};

		for (const meetingSlot of data) {
			if (
				!meetingSlot.courses ||
				!meetingSlot.sections ||
				!meetingSlot.buildings ||
				!meetingSlot.instructors ||
				!meetingSlot.terms
			) {
				continue;
			}

			const splitSeats = meetingSlot.sections.avail_seats.split(" of ");
			const seatsAvailable = parseInt(splitSeats[0], 10);
			const seatsTotal = parseInt(splitSeats[1], 10);

			const instructorsSplit =
				meetingSlot.instructors.instructor_name.split(";");
			const instructorNames = instructorsSplit?.map((namePair) =>
				namePair.split(",").map((name) => name.trim()),
			);

			const termCode = meetingSlot.terms.term_code;

			if (!Object.keys(courseByTerm).includes(termCode)) {
				courseByTerm[termCode] = [];
			}

			const currentTermCourses = courseByTerm[termCode];
			let courseItem = currentTermCourses.find(
				(course) => course.course_id === meetingSlot.courses?.course_id,
			);

			if (!courseItem) {
				currentTermCourses.push({
					course_id: meetingSlot.courses.course_id,
					course_code: meetingSlot.courses.course_code,
					course_title: meetingSlot.courses.course_title,
					credits: meetingSlot.courses.credits,
					term_code: meetingSlot.terms.term_code,
					term_name: meetingSlot.terms.term_name,
					sections: [],
				});

				courseItem = currentTermCourses.find(
					(course) => course.course_id === meetingSlot.courses?.course_id,
				);
			}

			let sectionItem = courseItem?.sections.find(
				(section) => section.section_id === meetingSlot.sections?.section_id,
			);

			if (!sectionItem) {
				courseItem?.sections.push({
					section_id: meetingSlot.sections.section_id,
					section_code: meetingSlot.sections.section_code,
					start_date: meetingSlot.sections.start_date,
					end_date: meetingSlot.sections.end_date,
					delivery_method: meetingSlot.sections.delivery_method,
					course_attribute: meetingSlot.sections.course_attribute,
					class_comments: meetingSlot.sections.class_comments,
					seats_available: seatsAvailable,
					seats_total: seatsTotal,
					meetings: [],
				});

				sectionItem = courseItem?.sections.find(
					(section) => section.section_id === meetingSlot.sections?.section_id,
				);
			}

			let meetingItem = sectionItem?.meetings.find(
				(meeting) => meeting.id === meetingSlot.meetings?.meeting_id,
			);

			if (!meetingItem) {
				sectionItem?.meetings.push({
					id: meetingSlot.meetings.meeting_id,
					day: meetingSlot.meetings.day,
					start_time: meetingSlot.meetings.start_time,
					end_time: meetingSlot.meetings.end_time,
					campus: meetingSlot.meetings.location,
					building: {
						id: meetingSlot.buildings?.building_id,
						long: meetingSlot.buildings?.building_name,
						short: meetingSlot.buildings?.building_abbrev,
					},
					room: {
						id: meetingSlot.rooms?.room_id,
						name: meetingSlot.rooms?.room,
					},
					instructors:
						instructorNames?.map((instructor) => ({
							// biome-ignore lint/style/noNonNullAssertion: We check instructors exists at the top of the loop
							id: meetingSlot.instructors!.instructor_id,
							first_name: instructor[1],
							last_name: instructor[0],
						})) || [],
				});

				meetingItem = sectionItem?.meetings.find(
					(meeting) => meeting.id === meetingSlot.meetings?.meeting_id,
				);
			}
		}

		return courseByTerm;
	} catch (error) {
		console.error(error);
		return -1;
	}
}
