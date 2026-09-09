import type { ReactNode, HTMLAttributes } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    selected?: boolean;
    children: ReactNode;
}

export default function Card({ selected, className, children, ...props }: CardProps) {
    return (
        <div
            className={`card ${selected ? "card-selected" : ""} ${className ?? ""}`}
            {...props}
        >
            {children}
        </div>
    );
}