import { create } from "zustand";
import type { CourseStore, CourseStoreState } from "@/types/course-store";
import type {
	RevisedCourseResponse,
	RevisedMeetingResponse,
	RevisedSectionResponse,
	RevisedTermResponse,
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
	setTerms: (terms: Array<RevisedTermResponse>) => set({ terms }),
	getTerms: () => get().terms,
	getTerm: (termId: string) => get().terms.find((term) => term.id === termId),
	getTermByCode: (termCode: string) =>
		get().terms.find((term) => term.code === termCode),

	// --- Courses ---
	setCourses: (courses: Array<RevisedCourseResponse>) => set({ courses }),
	getCourses: () => get().courses,
	getCoursesByTerm: (termId: string) =>
		get().courses.filter(
			(course) =>
				get().sections.find((section) => section.courseId === course.id)
					?.termId === termId,
		),
	getCoursesByTermCode: (termCode: string) => {
		const term = get().terms.find((term) => term.code === termCode);
		if (!term) return [];
		return get().courses.filter(
			(course) =>
				get().sections.find((section) => section.courseId === course.id)
					?.termId === term.id,
		);
	},
	getCourse: (courseId: string) =>
		get().courses.find((course) => course.id === courseId),

	// --- Sections ---
	setSections: (sections: Array<RevisedSectionResponse>) => set({ sections }),
	getSection: (sectionId: string) =>
		get().sections.find((section) => section.id === sectionId),
	getSectionsByCourseId: (courseId: string) =>
		get().sections.filter((section) => section.courseId === courseId),

	// --- Meetings ---
	setMeetings: (meetings: Array<RevisedMeetingResponse>) => set({ meetings }),
	getMeetings: (sectionId: string) =>
		get().meetings.filter((meeting) => meeting.sectionId === sectionId),
	getMeeting: (meetingId: string) =>
		get().meetings.find((meeting) => meeting.id === meetingId),
}));

export default useCourseStore;
