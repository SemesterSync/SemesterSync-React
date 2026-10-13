"use client";

import { Monitor, Moon, MoreHorizontalIcon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { env } from "@/config/env";
import { Button } from "../ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";

export default function MoreDropdown() {
	const theme = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger
				render={<Button size={"icon"} variant={"secondary"} />}
			>
				<MoreHorizontalIcon />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" side="top" className="w-36 space-y-1">
				<DropdownMenuSub>
					<DropdownMenuSubTrigger iconLeft>Theme</DropdownMenuSubTrigger>
					<DropdownMenuSubContent>
						<DropdownMenuRadioGroup
							value={theme.theme}
							onValueChange={theme.setTheme}
						>
							<DropdownMenuRadioItem value={"light"}>
								<Sun />
								Light
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value={"dark"}>
								<Moon />
								Dark
							</DropdownMenuRadioItem>
							<DropdownMenuRadioItem value={"system"}>
								<Monitor />
								System
							</DropdownMenuRadioItem>
						</DropdownMenuRadioGroup>
					</DropdownMenuSubContent>
				</DropdownMenuSub>

				<Separator />

				<DropdownMenuItem
					className="text-xs text-muted-foreground"
					onClick={() =>
						navigator.clipboard.writeText(
							`Build: ${env.NEXT_PUBLIC_BUILD_VERSION}; Commit: ${env.NEXT_PUBLIC_BUILD_COMMIT}`,
						)
					}
				>
					{env.NEXT_PUBLIC_BUILD_VERSION}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
