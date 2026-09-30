"use client";

import { Button } from "@/components/ui/button";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Unexpected Error",
	description:
		"The page you are attempting to access has encountered an unexpected error.",
};

export default function GlobalErrorPage({
	error,
	retry,
}: {
	error: Error & { digest?: string };
	retry: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<html lang="en" className={inter.className}>
			<body className="bg-background text-foreground text-center w-full mt-[20%]">
				<div className="space-y-2">
					<h1 className="font-black text-primary text-2xl">Uh Oh!</h1>
					<p>
						Looks like something went wrong and SemesterSync crashed
						unexpectedly.
					</p>
					<p>
						Don't worry though, we've tracked this error and will get right on
						it.
					</p>

					<Button onClick={() => navigation.reload()}>Reload</Button>
				</div>
			</body>
		</html>
	);
}
