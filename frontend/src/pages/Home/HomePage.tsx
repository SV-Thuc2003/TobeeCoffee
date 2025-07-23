import React from "react";
import BannerSlider from "./BannerSlider";
// import HotSection from "./components/HotSection";
// import NewProducts from "./components/NewProducts";
// import SpinVoucher from "./SpinVoucher";
import LuckySpinWheel from "./LuckySpinWheel";
// import PromoSection from "./components/PromoSection";
// import FooterInfo from "./components/FooterInfo";

const HomePage: React.FC = () => {
  return (
    <div className="w-full">
      <BannerSlider />
      {/* <SpinVoucher/> */}
      <LuckySpinWheel/>
      {/* <HotSection />
      <NewProducts />
      <SpinVoucher />
      <PromoSection />
      <FooterInfo /> */}
    </div>
  );
};

export default HomePage;
