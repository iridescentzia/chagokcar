import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ className, ...props }: ButtonProps) {
    return <button className={`btn-primary ${className ?? ""}`} {...props} />;
}