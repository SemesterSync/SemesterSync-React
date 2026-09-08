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

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";


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

                        <Field>
                            <FieldLabel className="font-medium">Permissions</FieldLabel>

                            <RadioGroup
                                value={permission}
                                onValueChange={(value) => {
                                    if (value === "view" || value === "edit") {
                                        setPermission(value);
                                    }
                                }}
                            >
                                <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3" htmlFor="view">
                                    <RadioGroupItem value="view" className="mt-1" id="view" />

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

                                <label className="flex cursor-pointer items-start gap-3 rounded-lg border p-3" htmlFor="edit">
                                    <RadioGroupItem value="edit" className="mt-1" id="edit" />

                                    <div>
                                        <p className="text-sm font-medium">
                                            View and edit
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            People can view and edit your schedule.
                                        </p>
                                    </div>
                                </label>
                            </RadioGroup>
                        </Field>
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
