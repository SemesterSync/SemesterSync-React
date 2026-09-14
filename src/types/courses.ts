import type { DaysOfWeek } from "@/schemas/util";

export interface InstructorResponse {
	id: string;

	firstName: string;
	lastName: string;
}

export interface TermResponse {
	id: string;

	name: string;
	code: string;
}

export interface CourseResponse {
	id: string;

	code: string;
	title: string;
	credits: number;
}

export interface SectionResponse {
	id: string;
	termId: string;
	courseId: string;
	primaryInstructor: InstructorResponse | null;
	secondaryInstructor: InstructorResponse | null;

	code: string;
	startDate: Date;
	endDate: Date;
	deliveryMethod: string;
	courseAttribute: string;
	classComments: string | null;
	seatsAvailable: number;
	seatsTotal: number;
}

export interface BuildingResponse {
	id: string;
	name: string;
	abbrev: string | null;
}

export interface MeetingResponse {
	id: string;
	sectionId: string;

	day: DaysOfWeek;
	startTime: Date;
	endTime: Date;
	campus: string;
	primaryInstructor: InstructorResponse | null;
	secondaryInstructor: InstructorResponse | null;

	building: BuildingResponse | null;
	room: string | null;
}
