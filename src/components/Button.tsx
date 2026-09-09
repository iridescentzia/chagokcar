import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
};

export default function Button({
                                   className,
                                   variant = "primary",
                                   ...props
                               }: ButtonProps) {
    const variantClass =
        variant === "secondary" ? "btn-secondary" : "btn-primary";
    return <button className={`${variantClass} ${className ?? ""}`} {...props} />;
}