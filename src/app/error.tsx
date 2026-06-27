"use client";

import { useEffect } from "react";

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-24">
				<div className="w-full rounded-[2rem] border border-border/70 bg-muted/35 p-8">
					<p className="text-sm font-medium tracking-[0.24em] uppercase text-muted-foreground">
						Error
					</p>
					<h1 className="mt-4 text-3xl font-semibold tracking-tight">
						Something went wrong while rendering this page.
					</h1>
					<p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
						Please retry the page. If the problem continues, contact the
						Yishak team so we can help you get back to reading.
					</p>
					<button
						type="button"
						onClick={reset}
						className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
					>
						Try again
					</button>
				</div>
			</div>
		</div>
	);
}
