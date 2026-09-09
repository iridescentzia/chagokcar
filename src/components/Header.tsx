import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface HeaderProps {
    onBack?: () => void;
}

export default function Header({ onBack }: HeaderProps) {
    const navigate = useNavigate();

    return (
        <div className="page-header">
            <button
                className="back-button"
                onClick={onBack ?? (() => navigate(-1))}
                aria-label="뒤로가기"
            >
                <ChevronLeft size={24} />
            </button>
        </div>
    );
}