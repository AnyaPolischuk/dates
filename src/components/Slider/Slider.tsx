import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { data } from "../../data";
import styles from './Slider.module.scss';

type SliderProps = {
  activeItem: number;
}

export const Slider = ({ activeItem }: SliderProps) => {

  return (
    <div className={styles.container}>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {data[activeItem].info.map(item => 
          <SwiperSlide>
            <h3>{item.year}</h3>
            <p>{item.text}</p>
          </SwiperSlide>
          )}
      </Swiper>
    </div>
  )
}
