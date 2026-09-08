import type { DaysOfWeek } from "@/schemas/util";

export interface Instructor {
	id: number;
	first_name: string;
	last_name: string;
}

export interface Room {
	id?: number;
	name?: string;
}

export interface Building {
	id: number;
	long: string;
	short: string | null;
}

export interface Meeting {
	id: number;
	day: string;
	start_time: string;
	end_time: string;
	campus: string;
	building: Building;
	room: Room;
	instructors: Array<Instructor>;
}

export interface Section {
	section_id: number;
	section_code: string;
	start_date: Date;
	end_date: Date;
	delivery_method: string;
	course_attribute: string;
	class_comments: string | null;
	seats_available: number;
	seats_total: number;
	meetings: Array<Meeting>;
}

export type AssembledCourse = {
	course_id: number;
	course_code: string;
	course_title: string;
	credits: string;
	term_code: string;
	term_name: string;
	sections: Array<Section>;
};

export type AssembledCourseSingleSection = Omit<AssembledCourse, "sections"> & {
	section: Section;
};

type CourseError = number;

export type CourseResponse =
	| Record<string, Array<AssembledCourse>>
	| CourseError;

export interface RevisedInstructorResponse {
	id: string;

	firstName: string;
	lastName: string;
}

export interface RevisedTermResponse {
	id: string;

	name: string;
	code: string;
}

export interface RevisedCourseResponse {
	id: string;

	code: string;
	title: string;
	credits: number;
}

export interface RevisedSectionResponse {
	id: string;
	termId: string;
	courseId: string;
	primaryInstructorId: RevisedInstructorResponse | null;
	secondaryInstructorId: RevisedInstructorResponse | null;

	code: string;
	startDate: Date;
	endDate: Date;
	deliveryMethod: string;
	courseAttribute: string;
	classComments: string | null;
	seatsAvailable: number;
	seatsTotal: number;
}

export interface RevisedBuildingResponse {
	id: string;
	name: string;
	abbrev: string | null;
}

export interface RevisedMeetingResponse {
	id: string;
	sectionId: string;

	day: DaysOfWeek;
	startTime: Date;
	endTime: Date;
	campus: string;
	primaryInstructor: RevisedInstructorResponse | null;
	secondaryInstructor: RevisedInstructorResponse | null;

	building: RevisedBuildingResponse | null;
	room: string | null;
}
