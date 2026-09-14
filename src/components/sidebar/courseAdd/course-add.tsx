import { getTerms } from "@/data/terms";
import EventAddModalClient from "./event-add-client";

export default async function CourseAddModal() {
	const terms = await getTerms();

	return <EventAddModalClient termsRes={terms} />;
}
