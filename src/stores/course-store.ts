import { create } from "zustand";
import type { CourseStore, CourseStoreState } from "@/types/course-store";
import type {
	CourseResponse,
	MeetingResponse,
	SectionResponse,
	TermResponse,
} from "@/types/courses";

const initialState: CourseStoreState = {
	terms: [],
	courses: [],
	sections: [],
	meetings: [],
};

const useCourseStore = create<CourseStore>((set, get) => ({
	...initialState,

	// --- Terms ---
	setTerms: (terms: Array<TermResponse>) => set({ terms }),
	getTerms: () => get().terms,
	getTerm: (termId: string) => get().terms.find((term) => term.id === termId),
	getTermByCode: (termCode: string) =>
		get().terms.find((term) => term.code === termCode),
	getTermIdByCode: (termCode: string) =>
		get().terms.find((term) => term.code === termCode)?.id,

	// --- Courses ---
	setCourses: (courses: Array<CourseResponse>) => set({ courses }),
	getCourses: () => get().courses,
	getCoursesByTerm: (termId: string) =>
		get().courses.filter((course) =>
			new Set(
				get()
					.sections.filter((section) => section.courseId === course.id)
					.flatMap((section) => section.termId),
			).has(termId),
		),
	getCoursesByTermCode: (termCode: string) => {
		const termId = get().getTermIdByCode(termCode);
		if (!termId) return [];
		return get().getCoursesByTerm(termId);
	},
	getCourse: (courseId: string) =>
		get().courses.find((course) => course.id === courseId),

	// --- Sections ---
	setSections: (sections: Array<SectionResponse>) => set({ sections }),
	getSection: (sectionId: string) =>
		get().sections.find((section) => section.id === sectionId),
	getSectionsByCourseId: (courseId: string, termCode: string) => {
		const termId = get().getTermIdByCode(termCode);
		if (!termId) return [];

		return get().sections.filter(
			(section) => section.courseId === courseId && section.termId === termId,
		);
	},

	// --- Meetings ---
	setMeetings: (meetings: Array<MeetingResponse>) => set({ meetings }),
	getMeetings: (sectionId: string) =>
		get().meetings.filter((meeting) => meeting.sectionId === sectionId),
	getMeeting: (meetingId: string) =>
		get().meetings.find((meeting) => meeting.id === meetingId),
}));

export default useCourseStore;
