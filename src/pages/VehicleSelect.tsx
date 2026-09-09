import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Search } from "lucide-react";
import { vehicles } from "../data/vehicles";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import type { Vehicle } from "../types";

// 임시 인기 차량 5종 (추후 실제 인기 데이터로 교체 예정)
const POPULAR_IDS = [
    "tesla-model-y",
    "kia-ev4",
    "porsche-taycan",
    "hyundai-ioniq-5",
    "bmw-x3",
];
const popularVehicles = vehicles.filter((v) => POPULAR_IDS.includes(v.id));

export default function VehicleSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    const chosenFromSearch = location.state?.chosenVehicle as
        | Vehicle
        | undefined;

    const [displayList, setDisplayList] = useState<Vehicle[]>(popularVehicles);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        if (chosenFromSearch) {
            setDisplayList((prev) => {
                const withoutDup = prev.filter((v) => v.id !== chosenFromSearch.id);
                return [chosenFromSearch, ...withoutDup];
            });
            setSelectedId(chosenFromSearch.id);
        }
    }, [chosenFromSearch]);

    const handleConfirm = () => {
        if (!selectedId) return;
        navigate(`/vehicles/${selectedId}`);
    };

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">
                어떤 차량을
                <br />
                목표로 할까요?
            </h1>
            <p className="page-description">
                원하는 차량을 선택하면
                <br />
                차량 가격을 기준으로
                <br />
                선수금과 월 납입 계획을 계산할 수 있어요.
            </p>

            <div className="vehicle-list">
                {displayList.map((vehicle) => (
                    <Card
                        key={vehicle.id}
                        selected={selectedId === vehicle.id}
                        onClick={() => setSelectedId(vehicle.id)}
                    >
                        <div className="vehicle-card-row">
                            <div>
                                <div className="vehicle-name">{vehicle.name}</div>
                                <div className="vehicle-price">
                                    예상 가격 {vehicle.price.toLocaleString()}원
                                </div>
                            </div>
                            {selectedId === vehicle.id && (
                                <Check size={20} color="var(--color-primary)" />
                            )}
                        </div>
                    </Card>
                ))}
            </div>

            <button
                className="search-link-button"
                onClick={() => navigate("/vehicle-search")}
            >
                <Search size={16} />
                다른 차량 검색하기
            </button>

            <Button disabled={!selectedId} onClick={handleConfirm}>
                이 차량으로 설정하기
            </Button>
        </PageLayout>
    );
}