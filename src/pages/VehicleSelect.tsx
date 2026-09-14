import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check, Search } from "lucide-react";
import { popularVehicles } from "../data/vehicles";
import Header from "../components/Header";
import Card from "../components/Card";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";
import type { Vehicle } from "../types/plan.ts";


export default function VehicleSelect() {
    const navigate = useNavigate();
    const location = useLocation();
    const chosenFromSearch = location.state?.chosenVehicle as
        | Vehicle
        | undefined;

    const [displayList, setDisplayList] = useState<Vehicle[]>(popularVehicles);
    const [selectedId, setSelectedId] = useState<string | null>(null);

    useEffect(() => {
        console.log("[VehicleSelect] useEffect 실행, chosenFromSearch:", chosenFromSearch);
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
                사고 싶은 차량을 선택해보세요.
                <br />
                선택한 차량을 기준으로 구매 계획을 세워볼게요.
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
                onClick={() => {
                    console.log("[VehicleSelect] 검색 이동 시 selectedId:", selectedId);
                    navigate("/vehicle-search", { state: { currentSelectedId: selectedId } })
                }}
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