import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { vehicles } from "../data/vehicles";
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
        <div style={{ padding: 24 }}>
            <h1>어떤 차량을 목표로 할까요?</h1>
            <p>원하는 차량을 선택하면 차량 가격을 기준으로 선수금과 월 납입 계획을 계산할 수 있어요.</p>

            <ul style={{ listStyle: "none", padding: 0 }}>
                {displayList.map((vehicle) => (
                    <li
                        key={vehicle.id}
                        onClick={() => setSelectedId(vehicle.id)}
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: 16,
                            marginBottom: 8,
                            border:
                                selectedId === vehicle.id
                                    ? "2px solid green"
                                    : "1px solid #eee",
                            cursor: "pointer",
                        }}
                    >
                        <div>
                            <div>{vehicle.name}</div>
                            <div>예상 가격 {vehicle.price.toLocaleString()}원</div>
                        </div>
                        {selectedId === vehicle.id && <span>✓</span>}
                    </li>
                ))}
            </ul>

            <button onClick={() => navigate("/vehicle-search")}>
                다른 차량 검색하기
            </button>

            <button disabled={!selectedId} onClick={handleConfirm}>
                이 차량으로 설정하기
            </button>
        </div>
    );
}