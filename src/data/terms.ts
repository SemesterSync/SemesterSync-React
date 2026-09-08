import "server-only";

import { db } from "@/db/connection";
import { type TermTableResult, termTable } from "@/db/schemas/terms";
import type { RevisedTermResponse } from "@/types/courses";

type TermList = Array<TermTableResult>;

type TermError = number;

export type TermResponse = TermList | TermError;

export async function getTerms(): Promise<TermResponse> {
	try {
		const data = await db.select().from(termTable);

		return data;
	} catch (error) {
		console.error(error);

		return -1;
	}
}

export async function getAllTerms(): Promise<RevisedTermResponse[]> {
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
