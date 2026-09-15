import type { ReactNode } from "react";

interface BottomSheetProps {
    title: string;
    description?: string;
    onClose: () => void;
    children: ReactNode;
}

export default function BottomSheet({
                                        title,
                                        description,
                                        onClose,
                                        children,
                                    }: BottomSheetProps) {
    return (
        <div className="bottom-sheet-overlay" onClick={onClose}>
            <div className="bottom-sheet" onClick={(e) => e.stopPropagation()}>
                <h2 className="bottom-sheet-title">{title}</h2>
                {description && (
                    <p className="bottom-sheet-description">{description}</p>
                )}
                <div className="bottom-sheet-content">{children}</div>
            </div>
        </div>
    );
}