import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slick from 'react-slick';

import { Overlay, Global, Header, CloseBtn, ImageWrapper, Indicator, SlickWrapper } from './styles'


const ImagesZoom = ( { images, onClose} ) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <Overlay>
            <Global />
            <Header>
                <h1>Image Detail</h1>
                <CloseBtn onClick={onClose}>X</CloseBtn>
            </Header>
            <SlickWrapper>
                <div>
                    <Slick
                        initialSlide={0}
                        beforeChange={(slide) => setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                    {/* 만들어 놓은 slick 컴포넌트 안에 사진을 반복문으로 배치해주는 작업을 진행하여 준다 */}
                        {images.map((v) => (
                            <ImageWrapper key={v.src}>
                                <img src={v.src} alt={v.src} />
                            </ImageWrapper>
                        ))}
                    </Slick>
                    <Indicator>
                        <div>
                            {currentSlide + 1}
                            {''}
                            /
                            {images.length}
                        </div>
                    </Indicator>
                </div>
            </SlickWrapper>
        </Overlay>
    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    // 함수는 PropTypes.func 
    onClose: PropTypes.func.isRequired,
};

export default ImagesZoom;