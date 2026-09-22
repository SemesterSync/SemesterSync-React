"use client";

import { Edit } from "lucide-react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import useUserStore from "@/stores/user-store";
import EditLinkedEvent from "./edit-linked-event";
import EditPersonalEvent from "./edit-personal-event";
import EditUnlinkedEvent from "./edit-unlinked-event";

export type EventEditModalProps = {
	eventId: string;

	trigger?: React.ReactNode;

	open?: boolean;
	onOpenChange?: React.Dispatch<React.SetStateAction<boolean>>;

	cancelOnClick?: () => void;
	actionSecondaryOnClick?: () => void;
};

export default function EditEventModal({
	eventId,

	trigger,

	open,
	onOpenChange,

	cancelOnClick,
	actionSecondaryOnClick,
}: EventEditModalProps) {
	const tabId = useUserStore((state) => state.activeTab);
	const eventData = useUserStore((state) => state.getEvent(tabId, eventId));

	if (!eventData) return null;

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			{trigger ? (
				trigger
			) : (
				<AlertDialogTrigger render={<Button variant="secondary" size="icon" />}>
					<Edit />
				</AlertDialogTrigger>
			)}

			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Edit Event</AlertDialogTitle>
					{eventData.kind === "linked-course" && (
						<AlertDialogDescription className="text-wrap">
							Select a new course section from the list below. <br />{" "}
							<span className="text-xs">
								Note: You are not able to transform a linked course event to an
								unlinked course event at this time.
							</span>
						</AlertDialogDescription>
					)}
				</AlertDialogHeader>

				{eventData.kind === "linked-course" && (
					<EditLinkedEvent
						eventId={eventId}
						cancelOnClick={cancelOnClick}
						actionSecondaryOnClick={actionSecondaryOnClick}
					/>
				)}

				{eventData.kind === "unlinked-course" && (
					<EditUnlinkedEvent
						eventId={eventId}
						cancelOnClick={cancelOnClick}
						actionSecondaryOnClick={actionSecondaryOnClick}
					/>
				)}

				{eventData.kind === "personal" && (
					<EditPersonalEvent
						eventId={eventId}
						cancelOnClick={cancelOnClick}
						actionSecondaryOnClick={actionSecondaryOnClick}
					/>
				)}
			</AlertDialogContent>
		</AlertDialog>
	);
}
