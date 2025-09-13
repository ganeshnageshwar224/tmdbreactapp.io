import React from "react";
import Slider from "react-slick";
import HeaderBg from "../headerBg/HeaderBg";
import SliderImg1 from "../../assets/img/Movie-poster.png"
import SliderImg2 from "../../assets/img/pushpa2.jpeg"
import SliderImg3 from "../../assets/img/images.webp"
import SliderImg4 from "../../assets/img/asq.jpeg"
import SliderImg5 from "../../assets/img/conjuring.jpeg"
import SliderImg6 from "../../assets/img/jaran.jpeg"

const HeaderSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div>
        <HeaderBg
          image={SliderImg1}
        />
      </div>
      <div>
        <HeaderBg
          image={SliderImg2}
        />
      </div>
      <div>
        <HeaderBg
          image={SliderImg3}
        />
      </div>
      <div>
        <HeaderBg
          image={SliderImg4}
        />
      </div>
      <div>
        <HeaderBg 
          image={SliderImg5}
        />
      </div>
      <div>
        <HeaderBg
          image={SliderImg6}
        />
      </div>
    </Slider>
  );
}

export default HeaderSlider