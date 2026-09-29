"use client";

import { ChevronDown } from "lucide-react";
import useCourseStore from "@/stores/course-store";
import useUserStore from "@/stores/user-store";
import { Button } from "../../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from "../../ui/dropdown-menu";

export default function TermDropdown() {
	const selectedTerm = useUserStore((state) => state.activeTerm);
	const setSelectedTerm = useUserStore((state) => state.setActiveTerm);

	const terms = useCourseStore((state) => state.terms);
	const getTerm = useCourseStore((state) => state.getTermByCode);
	const selectedTermItem = getTerm(selectedTerm);

	if (terms.length === 0)
		return (
			<p className="text-destructive bg-destructive/20 rounded-lg text-xs py-2 w-full text-center">
				Error Loading Terms
			</p>
		);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button variant="outline" className="justify-between w-full" />}
			>
				<span>{selectedTermItem ? selectedTermItem.name : "Select Term"}</span>
				<ChevronDown />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuRadioGroup value={selectedTerm}>
					{terms.map((term) => (
						<DropdownMenuRadioItem
							key={term.code}
							value={term.code}
							onClick={() => setSelectedTerm(term.code)}
						>
							{term.name}
						</DropdownMenuRadioItem>
					))}
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
