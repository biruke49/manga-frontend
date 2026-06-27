export default function Loading() {
	return (
		<div className="min-h-screen bg-background text-foreground">
			<div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-24">
				<div className="space-y-3">
					<p className="text-sm font-medium tracking-[0.24em] uppercase text-muted-foreground">
						Loading
					</p>
					<p className="text-2xl font-semibold tracking-tight">
						Preparing the page.
					</p>
				</div>
			</div>
		</div>
	);
}
