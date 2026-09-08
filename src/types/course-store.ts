import type {
	RevisedCourseResponse,
	RevisedMeetingResponse,
	RevisedSectionResponse,
	RevisedTermResponse,
} from "./courses";

export interface CourseStoreState {
	terms: Array<RevisedTermResponse>;
	courses: Array<RevisedCourseResponse>;
	sections: Array<RevisedSectionResponse>;
	meetings: Array<RevisedMeetingResponse>;
}

export interface CourseStoreActions {
	setTerms: (terms: Array<RevisedTermResponse>) => void;
	getTerms: () => Array<RevisedTermResponse>;
	getTerm: (termId: string) => RevisedTermResponse | undefined;

	setCourses: (courses: Array<RevisedCourseResponse>) => void;
	getCourses: () => Array<RevisedCourseResponse>;
	getCoursesByTerm: (termId: string) => Array<RevisedCourseResponse>;
	getCourse(courseId: string): RevisedCourseResponse | undefined;

	setSections: (sections: Array<RevisedSectionResponse>) => void;
	getSections: (courseId: string) => Array<RevisedSectionResponse>;
	getSection(sectionId: string): RevisedSectionResponse | undefined;

	setMeetings: (meeting: Array<RevisedMeetingResponse>) => void;
	getMeetings: (sectionId: string) => Array<RevisedMeetingResponse>;
	getMeeting: (meetingId: string) => RevisedMeetingResponse | undefined;
}

export type CourseStore = CourseStoreState & CourseStoreActions;
