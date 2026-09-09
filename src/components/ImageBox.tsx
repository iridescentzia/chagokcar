import type { ReactNode } from "react";

interface ImageBoxProps {
    children: ReactNode;
}

export default function ImageBox({ children }: ImageBoxProps) {
    return <div className="image-box">{children}</div>;
}