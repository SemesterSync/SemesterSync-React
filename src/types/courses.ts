import type { DaysOfWeek } from "@/schemas/util";

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
	primaryInstructor: RevisedInstructorResponse | null;
	secondaryInstructor: RevisedInstructorResponse | null;

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
