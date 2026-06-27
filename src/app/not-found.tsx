import Link from "next/link";

export default function NotFound() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="mx-auto flex min-h-screen max-w-4xl items-center px-6 py-24">
				<div className="w-full rounded-[2rem] border border-border/70 bg-muted/35 p-8">
					<p className="text-sm font-medium tracking-[0.24em] uppercase text-muted-foreground">
						404
					</p>
					<h1 className="mt-4 text-3xl font-semibold tracking-tight">
						This page does not exist.
					</h1>
					<p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
						The page you were looking for is unavailable. Head back to the
						main site to continue browsing Yishak manga.
					</p>
					<Link
						href="/"
						className="mt-8 inline-flex h-10 items-center justify-center rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
					>
						Back home
					</Link>
				</div>
			</div>
		</div>
	);
}
