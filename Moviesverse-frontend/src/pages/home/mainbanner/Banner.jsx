import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import data from "../../../../public/data/movieData.json";

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import "./style.css";

import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

function Banner() {

    return (
        <Swiper
            effect={'coverflow'}
            grabCursor={true}
            navigation={true}
            loop={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            coverflowEffect={{
                rotate: 35,
                stretch: 200,
                depth: 250,
                modifier: 1,
                slideShadows: true,
            }}
            autoplay={{
                delay: 2000,
                disableOnInteraction: true,
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="gameSwiper"
        >
            {
                data.map(data => (
                    <SwiperSlide>
                        <div className="gameSlider">
                            <img src={data.bgImg} alt={data.title} />
                        </div>
                    </SwiperSlide>
                ))
            }
        </Swiper>
    )
}

export default Banner;