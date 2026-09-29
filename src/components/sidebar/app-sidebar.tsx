import { Sidebar, SidebarContent, SidebarHeader } from "../ui/sidebar";
import EventAddModal from "./courseAdd/event-add-modal";
import EventList from "./eventList/event-list";
import MiniCalendar from "./miniCalendar/mini-calendar";
import TermDropdown from "./terms/term-dropdown";

export default async function AppSidebar() {
	return (
		<Sidebar className="h-screen">
			<SidebarHeader>
				<p className="text-primary text-xl font-bold text-center">
					SemesterSync
				</p>
			</SidebarHeader>
			<SidebarContent className="p-2 gap-2">
				<EventAddModal />

				<TermDropdown />

				<MiniCalendar />

				<EventList />
			</SidebarContent>
		</Sidebar>
	);
}
