import { useParams, useNavigate } from "react-router-dom";
import { vehicles } from "../data/vehicles";
import { usePlan } from "../context/PlanContext";
import Header from "../components/Header";
import Button from "../components/Button";
import ImageBox from "../components/ImageBox";
import PageLayout from "../components/PageLayout";
import { formatToManwon } from "../utils/format";

export default function VehicleDetail() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { setVehicleAndReset } = usePlan();

    const vehicle = vehicles.find((v) => v.id === id);

    if (!vehicle) {
        return (
            <PageLayout>
                <Header />
                <p className="page-description">차량 정보를 찾을 수 없어요.</p>
            </PageLayout>
        );
    }

    const handleConfirm = () => {
        setVehicleAndReset(vehicle);
        navigate("/goal-setting");
    };

    return (
        <PageLayout>
            <Header />
            <h1 className="page-title">차량 상세</h1>
            <p className="page-description">
                선택한 차량을 확인하고
                <br />
                목표 선수금을 설정해보세요.
            </p>

            <ImageBox>
                <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="vehicle-detail-image"
                />
                <h2 className="vehicle-detail-name">{vehicle.name}</h2>
                <div className="vehicle-detail-divider" />
                <div className="vehicle-detail-price-row">
                    <span className="vehicle-detail-price-label">예상 차량 가격</span>
                    <span className="vehicle-detail-price-value">
            {formatToManwon(vehicle.price)}
          </span>
                </div>
            </ImageBox>

            <p className="vehicle-detail-notice">
                현재 기준 예상 차량 가격이며, 제조사 정책 및 옵션 선택에 따라
                <br />
                실제 구매 가격은 달라질 수 있습니다.
            </p>

            <Button onClick={handleConfirm}>목표 선수금 설정하기</Button>
        </PageLayout>
    );
}