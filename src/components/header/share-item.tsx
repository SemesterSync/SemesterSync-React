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
    FieldDescription
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
import { Input } from "@base-ui/react";
import { se } from "date-fns/locale";


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

    const [copySuccess, setCopySuccess] = useState(false);
    
    const [expiration, setExpiration] = useState("24");

    const expirationItems = [
        { label: "1 hour", value: "1"},
        { label: "1 day", value: daysToHours(1).toString()},
        { label: "7 days", value: daysToHours(7)},
        { label: "30 hour", value: daysToHours(30)},
        { label: "Never", value: "never"},
    ]
    
    const [permission, setPermission] = useState<"view" | "edit">("view");

    const [link, setLink] = useState<string | null>(null);

    const handleCreateLink = () => {
        setShareSuccess(true);
        setLink(`https://example.com/share?expiration=${expiration}&permission=${permission}`);
        console.log("Creating share link:", { expiration, permission });
    };

    const copyToClipboard = () => {
        if (link) {
            navigator.clipboard.writeText(link).then(() => {
                setCopySuccess(true);

                setTimeout(() => {
                    setCopySuccess(false);
                }, 2000);
                
            }).catch((err) => {
                setCopySuccess(false);
                console.error("Failed to copy link to clipboard:", err);
            });
        }
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
                        {shareSuccess? "Share link created successfully!" : "Choose how people can access your schedule."}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                {shareSuccess ?  (
                        <Field>

                            <div className="space-y-3 rounded-lg border bg-muted/30 p-4">
                                <FieldLabel className="font-medium">
                                    Share Link: 
                                </FieldLabel>
                                <Input 
                                    value={`https://example.com/share?expiration=${expiration}&permission=${permission}`}
                                    placeholder="https://example.com/share"
                                    readOnly
                                    className="bg-background w-full text-sm p-2 rounded-md border border-gray-400 *:focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                                    <span>
                                        Access:{" "}
                                        <span className="font-medium text-foreground">
                                            {permission === "edit" ? "View and edit" : "View only"}
                                        </span>
                                    </span>

                                    <span>
                                        Expires:{" "}
                                        <span className="font-medium text-foreground">
                                            {expiration === "never"
                                                ? "Never"
                                                : expiration === "1hour"
                                                ? "1 hour"
                                                : expiration === "1day"
                                                ? "1 day"
                                                : expiration === "7days"
                                                ? "7 days"
                                                : expiration}
                                        </span>
                                    </span>
                                </div>
                            </div>

                            <FieldDescription className="text-sm text-muted-foreground">
                                Share this link with others to give them{" "}
                            <span className="font-medium text-foreground">
                                {permission === "edit" ? "view and edit" : "view-only"}
                            </span>{" "}
                                access to your schedule. The link expires{" "}
                            <span className="font-medium text-foreground">
                                {expiration === "never"
                                    ? "never"
                                    : expiration === "1hour"
                                    ? "in 1 hour"
                                    : expiration === "1day"
                                    ? "in 1 day"
                                    : expiration === "7days"
                                    ? "in 7 days"
                                    : expiration}
                            </span>
                            .
                        </FieldDescription>
                    </Field>
                    ) : 
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
                }
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={ shareSuccess ? copyToClipboard : handleCreateLink}>
                        {!shareSuccess? "Create Link": copySuccess? "Copied!": "Copy to Clipboard"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>

        </AlertDialog>
    );
}
