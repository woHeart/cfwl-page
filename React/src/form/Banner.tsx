import FormSection from "@/component/formsection/FormSection";
import { useEffect, useState } from "react";
import type { BannerItem } from "@/api/banner";
import { getBanner } from "@/api/banner";

const Banner: React.FC = () => {

    const [bannerData, setBannerData] = useState<BannerItem[]>([]);

    useEffect(() => {
        const fetchBannerData = async () => {
            try{
                            const data = await getBanner();
            setBannerData(data);
            } catch (error) {
                console.error("获取轮播图数据失败:", error);
            }
        };
        fetchBannerData();
    }, []);

    return (
        <FormSection
            title={'轮播图'}
        >
            <div
                data-banner-container
                id="home-banner"
                className="flex flex-wrap gap-[4%]"
            >
                {bannerData.map((item) => (
                    <div key={item.url} className="w-[22%]">
                        <img src={item.url} alt={`Banner ${item.url}`} style={{ width: '100%', height: 'auto' }} />
                    </div>
                ))}
            </div>
        </FormSection>
    );
}

export default Banner;