import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner from "../../assets/2.png";
import banner1 from "../../assets/1.png";

const BannerSlider: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="w-full mt-0 -mb-2">
      <Slider {...settings}>
        {[banner, banner1, banner].map((img, index) => (
          <div key={index}>
            <div className="relative w-full pt-[34%]"> 
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="absolute top-0 left-0 w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default BannerSlider;
