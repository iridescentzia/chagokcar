import {useNavigate} from "react-router-dom";
import ImageBox from "../components/ImageBox";
import Button from "../components/Button";
import PageLayout from "../components/PageLayout";

export default function Onboarding() {
    const navigate = useNavigate();

    return (
        <PageLayout>
            <p className="brand-name">차곡카</p>
            <h1 className="page-title">
                사고 싶은 차,
                <br/>
                얼마씩 모으면 살 수 있을까요?
            </h1>
            <p className="page-description">
                원하는 차량과 선수금 목표를 설정하면
                <br/>
                매월 필요한 금액과 구매 계획을 알려드려요.
            </p>

            <ImageBox>
                <img
                    src="/imgs/logo2.png"
                    alt=""
                    className="onboarding-illustration"
                />
                <p className="image-box-caption">
                    <span className="image-box-caption-emphasis">
                    내 차를 사기 위한 계획을
                    <br/>
                    한눈에 확인해보세요.
                        </span>
                    <br/>
                    <br/>
                    차량 가격 · 목표 선수금 · 월 필요 저축액
                </p>
            </ImageBox>

            <div className="onboarding-cta">
                <Button onClick={() => navigate("/vehicle-select")}>시작하기</Button>
            </div>
        </PageLayout>
    );
}