"use client";

import { Button } from "@/components/ui/button";
import { env } from "@/config/env";
import "@/styles/globals.css";
import * as Sentry from "@sentry/nextjs";
import { Check, Copy } from "lucide-react";
import type { Metadata } from "next";
import type NextError from "next/error";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Unexpected Error",
	description:
		"The page you are attempting to access has encountered an unexpected error.",
};

const listOfTitles = [
	"Uh Oh!",
	"Oops!",
	"Whoops!",
	"Oh No!",
	"Yikes!",
	"Hmm...",
	"That’s not good.",
	"Something Broke.",
	"Well, This Is Awkward.",
	"Not Quite Right.",
	"That Didn’t Work.",
	"We Hit a Snag.",
	"Something Went Wrong.",
	"Looks Like Trouble.",
	"Well, That Was Unexpected.",
];

export default function GlobalErrorPage({
	error,
}: {
	error: NextError & { digest?: string };
}) {
	const [copied, setCopied] = useState(false);
	const [title, _setTitle] = useState(
		listOfTitles[Math.floor(Math.random() * listOfTitles.length)],
	);

	useEffect(() => {
		Sentry.captureException(error);
	}, [error]);

	return (
		<html lang="en" className={inter.className}>
			<body className="bg-background text-foreground text-center w-full mt-[20%]">
				<div className="space-y-2">
					<h1 className="font-black text-primary text-2xl">{title}</h1>
					<p>
						Looks like something went wrong and SemesterSync crashed
						unexpectedly.
					</p>
					<p>
						Don't worry though, we've tracked this error and will get right on
						it.
					</p>
					<div className="flex flex-row items-center gap-2 w-full justify-center">
						<p className="text-muted-foreground text-xs">
							Build: {env.NEXT_PUBLIC_BUILD_VERSION} (
							{env.NEXT_PUBLIC_BUILD_COMMIT})
						</p>
						<Button
							onClick={() => {
								navigator.clipboard.writeText(
									`Build: ${env.NEXT_PUBLIC_BUILD_VERSION}; Commit: ${env.NEXT_PUBLIC_BUILD_COMMIT}`,
								);
								setCopied(true);
								setTimeout(() => setCopied(false), 2000);
							}}
							size={"icon-xs"}
							variant={copied ? "success" : "secondary"}
						>
							{copied ? <Check /> : <Copy />}
						</Button>
					</div>

					<Button onClick={() => window.location.reload()}>Reload</Button>
				</div>
			</body>
		</html>
	);
}
