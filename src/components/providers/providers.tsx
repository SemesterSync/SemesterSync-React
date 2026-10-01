import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toast";
import { TooltipProvider } from "@/components/ui/tooltip";
import { env } from "@/config/env";
import { getAllCourses, getAllMeetings, getAllSections } from "@/data/courses";
import { getAllTerms } from "@/data/terms";
import DataProvider from "./data";
import TanstackProvider from "./tanstack";

//TODO - Remove this & replace with front end API fetching
export const dynamic = "force-dynamic";

const environment = env.NODE_ENV;

export default async function Providers({
	children,
}: {
	children: React.ReactNode;
}) {
	const [terms, courses, sections, meetings] = await Promise.all([
		getAllTerms(),
		getAllCourses(),
		getAllSections(),
		getAllMeetings(),
	]);

	return (
		<>
			{environment === "development" && <TanstackProvider />}
			<DataProvider
				terms={terms}
				courses={courses}
				sections={sections}
				meetings={meetings}
			/>
			<TooltipProvider>
				<SidebarProvider>
					{children}
					<Toaster />
				</SidebarProvider>
			</TooltipProvider>
		</>
	);
}
