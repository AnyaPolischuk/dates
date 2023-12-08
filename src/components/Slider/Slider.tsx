import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { Swiper as SwiperType} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';

import { data } from '../../data';
import styles from './Slider.module.scss';

type SliderProps = {
  activeItem: number;
}

export const Slider: React.FC<SliderProps> = ({ activeItem }) => {
  const swiperRef = useRef<SwiperType>();

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.prevBtn} onClick={() => swiperRef.current?.slidePrev()}>{`<`}</button>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        //@ts-ignore
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
        className='mySwiper'
      >
        {data[activeItem].info.map(item => 
          <SwiperSlide>
            <div className={styles.info}>
              <h3>{item.year}</h3>
              <p className={styles.text}>{item.text}</p>
            </div>
          </SwiperSlide>
          )}
      </Swiper>
      <div>
        <button className={styles.nextBtn} onClick={() => swiperRef.current?.slideNext()}>{`>`}</button>
      </div>
    </div>
  )
}
