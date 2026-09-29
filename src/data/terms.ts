import "server-only";

import { db } from "@/db/connection";
import { termTable } from "@/db/schemas/terms";
import type { TermResponse } from "@/types/courses";

export async function getAllTerms(): Promise<TermResponse[]> {
	try {
		const data = await db.select().from(termTable);

		return data.map((term) => ({
			id: String(term.term_id),
			name: term.term_name,
			code: term.term_code,
		}));
	} catch (error) {
		console.error(error);
		return [];
	}
}
