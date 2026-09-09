// src/components/PageLayout.tsx
import type { ReactNode } from "react";

export default function PageLayout({ children }: { children: ReactNode }) {
    return (
        <div className="view-wrapper">
            <div className="phone">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}