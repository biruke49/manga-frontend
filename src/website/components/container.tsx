import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface ContainerProps<T extends ElementType> {
	as?: T;
	className?: string;
	children: ReactNode;
}

export function Container<T extends ElementType = "div">({
	as,
	className,
	children,
	...props
}: ContainerProps<T> & Omit<ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
	const Comp = as ?? "div";
	return (
		<Comp
			className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10", className)}
			{...props}
		>
			{children}
		</Comp>
	);
}
