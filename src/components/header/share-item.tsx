import { useState } from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import {LinkIcon} from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
    AlertDialogDescription
} from "../ui/alert-dialog";

import {
    Field,
    FieldLabel,
} from "../ui/field";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


export function ShareItem({
    setOpen,
}: {
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <DropdownMenuItem onClick={() => setOpen(true)}>
            Share
            <LinkIcon />
        </DropdownMenuItem>
    );
}

export function ShareItemModal({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {

    const daysToHours = (d: number) => (d * 24).toString();

    const [shareSuccess, setShareSuccess] = useState(false);
    
    const [expiration, setExpiration] = useState("24");

    const expirationItems = [
        { label: "1 hour", value: "1"},
        { label: "1 day", value: daysToHours(1).toString()},
        { label: "7 days", value: daysToHours(7)},
        { label: "30 hour", value: daysToHours(30)},
        { label: "Never", value: "never"},
    ]
    
    const [permission, setPermission] = useState<"view" | "edit">("view");

    const handleCreateLink = () => {
        setShareSuccess(true);
        console.log("Creating share link:", { expiration, permission });
    };

    const handleModalState = (open: boolean) => {
		setOpen(open);

		if (!open) {
            setShareSuccess(false);
		}
	};
    return (
        <AlertDialog open={open} onOpenChange={handleModalState}>
              <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Share Your Schedule
                    </AlertDialogTitle>

                    <AlertDialogDescription>
                        Choose how people can access your schedule.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <div className="space-y-6 py-4">
    
                        <Field>
                            <FieldLabel className="font-medium">Link expiration</FieldLabel>

                            <Select items={expirationItems} value={expiration} onValueChange={(value) => { if (value) setExpiration(value);}}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select expiration"/>
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectGroup>
                                        {expirationItems.map((expiration) =>(
                                            <SelectItem key={expiration.value} value={expiration.value}>{expiration.label}</SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            
                        </Field>

                    <div className="space-y-3">
<label className="text-sm font-medium">
                            Permissions
                        </label>

                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                            <input
                                type="radio"
                                name="permission"
                                value="view"
                                checked={permission === "view"}
                                onChange={(event) =>
                                    setPermission(event.target.value as "view" | "edit")
                                }
                                className="mt-1"
                            />

                            <div>
                                <p className="text-sm font-medium">
                                    View only
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    People can view your schedule but cannot
                                    make changes.
                                </p>
                            </div>
                        </label>

                        <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3">
                            <input
                                type="radio"
                                name="permission"
                                value="edit"
                                checked={permission === "edit"}
                                onChange={(event) =>
                                    setPermission(event.target.value as "view" | "edit")
                                }
                                className="mt-1"
                            />

                            <div>
                                <p className="text-sm font-medium">
                                    Can edit
                                </p>

                                <p className="text-sm text-muted-foreground">
                                    People can make changes to the shared
                                    schedule.
                                </p>
                            </div>
                        </label>
                    </div>
                </div>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction onClick={handleCreateLink}>
                        Create Link
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    );
}
