"use client";

import useCourseStore from "@/stores/course-store";
import type {
	CourseResponse,
	MeetingResponse,
	SectionResponse,
	TermResponse,
} from "@/types/courses";

interface DataProviderProps {
	terms: Array<TermResponse>;
	courses: Array<CourseResponse>;
	sections: Array<SectionResponse>;
	meetings: Array<MeetingResponse>;
}

export default function DataProvider({
	terms,
	courses,
	sections,
	meetings,
}: DataProviderProps) {
	const setTerms = useCourseStore((state) => state.setTerms);
	const setCourses = useCourseStore((state) => state.setCourses);
	const setSections = useCourseStore((state) => state.setSections);
	const setMeetings = useCourseStore((state) => state.setMeetings);

	setTerms(terms);
	setCourses(courses);
	setSections(sections);
	setMeetings(meetings);

	return null;
}
