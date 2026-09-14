import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Search, Check } from "lucide-react";
import { vehicles, popularVehicles } from "../data/vehicles";
import Header from "../components/Header";
import Card from "../components/Card";
import PageLayout from "../components/PageLayout";
import type { Vehicle } from "../types/plan.ts";

export default function VehicleSearch() {
    const navigate = useNavigate();
    const location = useLocation();
    const currentSelectedId = location.state?.currentSelectedId as
        | string
        | null;

    const [keyword, setKeyword] = useState("");

    const baseList: Vehicle[] = keyword.trim()
        ? vehicles.filter((v) =>
            v.name.toLowerCase().includes(keyword.trim().toLowerCase())
        )
        : popularVehicles;

    // 검색어가 없을 때만: 현재 선택된 차량을 리스트 최상단으로 끌어올림
    const filtered: Vehicle[] =
        !keyword.trim() && currentSelectedId
            ? (() => {
                const selectedVehicle =
                    baseList.find((v) => v.id === currentSelectedId) ??
                    vehicles.find((v) => v.id === currentSelectedId);
                if (!selectedVehicle) return baseList;

                const withoutDup = baseList.filter(
                    (v) => v.id !== currentSelectedId
                );
                return [selectedVehicle, ...withoutDup];
            })()
            : baseList;

    const handleSelect = (vehicle: Vehicle) => {
        navigate("/vehicle-select", { state: { chosenVehicle: vehicle } });
    };

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">
                원하는 차량을
                <br />
                검색해보세요.
            </h1>

            <div className="search-input-wrapper">
                <Search size={18} className="search-input-icon" />
                <input
                    type="text"
                    placeholder="차량명을 검색해주세요"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="search-input"
                />
            </div>

            {keyword.trim() && filtered.length === 0 ? (
                <p className="search-empty-message">
                    검색 결과가 없어요. 다른 차량명으로 검색해보세요.
                </p>
            ) : (
                <div className="vehicle-list">
                    {filtered.map((vehicle) => (
                        <Card
                            key={vehicle.id}
                            selected={currentSelectedId === vehicle.id}
                            onClick={() => handleSelect(vehicle)}
                        >
                            <div className="vehicle-card-row">
                                <div>
                                    <div className="vehicle-name">{vehicle.name}</div>
                                    <div className="vehicle-price">
                                        예상 가격 {vehicle.price.toLocaleString()}원
                                    </div>
                                </div>
                                {currentSelectedId === vehicle.id && (
                                    <Check size={20} color="var(--color-primary)" />
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </PageLayout>
    );
}