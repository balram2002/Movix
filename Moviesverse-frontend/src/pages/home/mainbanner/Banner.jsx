import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useSelector } from "react-redux";
import PosterFallback from "../../../assets/no-poster.png";
import demoData from "./demoData.json";



import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import "./style.css";

import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';

function Banner() {
    const { url } = useSelector((state) => state.home);
    const [data, setData] = useState();

    useEffect(() => {
        setData(demoData.results);
    }, [])

    return (
        <>
            <div className="bannerjjsxgty">
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
                        data?.map((item) => {
                            const backdrop_path = item.backdrop_path
                                ? url.backdrop + item.backdrop_path
                                : PosterFallback;

                            return (
                                <SwiperSlide>
                                    <div className="gameSlider">
                                        <img src={backdrop_path} alt={data.title} />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                    }
                </Swiper>
            </div>
            <div className="alternateswipergfhf6677">
                <span className='fhfhfhyf67576'>Use Desktop to experience more features.</span>
                <span className='fhfhfhyf67576'>Make an account to like and add to watchlist content and get recommendations accordingly..</span>
            </div>
        </>
    )
}

export default Banner;