"use client";

import clsx from "clsx";
import { Check, Copy, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { env } from "@/config/env";

export default function SettingsModal() {
	const [page, setPage] = useState("about");
	const [copied, setCopied] = useState(false);
	const router = useRouter();

	return (
		<Dialog>
			<DialogTrigger render={<Button variant={"secondary"} size={"icon"} />}>
				<Settings />
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Settings</DialogTitle>
				</DialogHeader>

				<div className="flex flex-1 flex-row justify-start gap-2 h-[70vh]">
					<div className="flex flex-col gap-2 p-2 w-1/6">
						{/* <Separator /> */}
						<Button
							variant="ghost"
							className={"justify-start"}
							onClick={() => router.push("/contact")}
						>
							Contact Us
						</Button>
						<SidebarItem selected={page} value="about" setState={setPage}>
							About
						</SidebarItem>
					</div>

					<Separator orientation="vertical" />

					{page === "notices" && (
						<div>
							<h2 className="font-bold">Notices</h2>
						</div>
					)}

					{page === "about" && (
						<div className="flex justify-around w-full">
							<div className="flex flex-col items-center gap-1">
								<h2 className="text-xl font-black text-primary">
									SemesterSync
								</h2>
								<p>Build: {env.NEXT_PUBLIC_BUILD_VERSION}</p>
								<p>Commit Reference: {env.NEXT_PUBLIC_BUILD_COMMIT}</p>

								<Button
									onClick={() => {
										navigator.clipboard.writeText(
											`Build: ${env.NEXT_PUBLIC_BUILD_VERSION}; Commit: ${env.NEXT_PUBLIC_BUILD_COMMIT}`,
										);
										setCopied(true);
										setTimeout(() => setCopied(false), 2000);
									}}
									variant={copied ? "success" : "default"}
								>
									{copied ? (
										<>
											<Check /> Copied
										</>
									) : (
										<>
											<Copy /> Copy
										</>
									)}
								</Button>
							</div>
						</div>
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}

function SidebarItem({
	selected,
	value,
	setState,
	children,
}: {
	selected: string;
	value: string;
	setState: Dispatch<SetStateAction<string>>;
	children: React.ReactNode;
}) {
	return (
		<Button
			className={clsx("justify-start", { "text-primary": selected === value })}
			variant="ghost"
			onClick={() => setState(value)}
		>
			{children}
		</Button>
	);
}
