import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { PlusOutlined } from '@ant-design/icons';

// 제작해 놓은 ImagesZoom 컴포넌트를 불러와서 사용해 준다.
import ImagesZoom from './ImagesZoom';

const PostImages = ({ images }) => {
    const [showImageZoom, setShowImagesZoom] = useState(false);

    const onZoom = useCallback(() => {
         setShowImagesZoom(true);
    }, []);

    const onClose = useCallback(() => {
        setShowImagesZoom(false);
   }, []); 

    if (images.length === 1){
        return (
            <>
                <img role="presentation" src={images[0].src} alt={images[0].src} onClick={onZoom} />
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
            </>
        );
    }
    if (images.length === 2){
        return (
            <>
                <img role="presentation" style={{width:"50%", display: 'inline-block'}} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
                </>
        )
    }
    return (
        <div>
                <img role="presentation" style={{width:"50%"}} src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {showImageZoom && <ImagesZoom images={images} onClose={onClose} />}
                <div
                    role="presentation"
                    style={{ display: 'inline-block', width: '50%', textAlign:'center', verticalAlign:'middle'}}
                    onClick={onZoom}
                >
                    <PlusOutlined />
                    <br />
                    {images.length - 1}
                    개의 사진을 더보기
                </div>            
        </div>
    )
};

PostImages.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
}

export default PostImages;