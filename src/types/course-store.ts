import type {
	CourseResponse,
	MeetingResponse,
	SectionResponse,
	TermResponse,
} from "./courses";

export interface CourseStoreState {
	terms: Array<TermResponse>;
	courses: Array<CourseResponse>;
	sections: Array<SectionResponse>;
	meetings: Array<MeetingResponse>;
}

export interface CourseStoreActions {
	setTerms: (terms: Array<TermResponse>) => void;
	getTerms: () => Array<TermResponse>;
	getTerm: (termId: string) => TermResponse | undefined;
	getTermByCode: (termCode: string) => TermResponse | undefined;

	setCourses: (courses: Array<CourseResponse>) => void;
	getCourses: () => Array<CourseResponse>;
	getCoursesByTerm: (termId: string) => Array<CourseResponse>;
	getCoursesByTermCode: (termCode: string) => Array<CourseResponse>;
	getCourse(courseId: string): CourseResponse | undefined;

	setSections: (sections: Array<SectionResponse>) => void;
	getSectionsByCourseId: (courseId: string) => Array<SectionResponse>;
	getSection(sectionId: string): SectionResponse | undefined;

	setMeetings: (meeting: Array<MeetingResponse>) => void;
	getMeetings: (sectionId: string) => Array<MeetingResponse>;
	getMeeting: (meetingId: string) => MeetingResponse | undefined;
}

export type CourseStore = CourseStoreState & CourseStoreActions;
