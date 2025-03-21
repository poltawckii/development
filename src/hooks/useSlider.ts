"use client"
import { useState, useEffect, RefObject } from 'react';
function UseSlider(sliderRef: RefObject<HTMLDivElement>) {
    const [currentImage, setCurrentImage] = useState(0);
    const [imageCount, setImageCount] = useState(0); // Добавляем состояние для кол-ва картинок
    useEffect(() => {
        if (sliderRef.current) {
            const images = Array.from(sliderRef.current.querySelectorAll('#Film'));
            setImageCount(images.length); // Записываем кол-во картинок
            if (images.length > 0) {
                const imageWidth = 152;
                sliderRef.current.style.transform = `translateX(-${currentImage * imageWidth}px)`;
            }
        }
    }, [currentImage, sliderRef]); // Перерисовка при изменении currentImage или sliderRef

    const nextSlide = () => {
        if(!sliderRef.current) return;
        setCurrentImage((prevImage) => Math.min(prevImage + 5, imageCount - 1));
    };

    const prevSlide = () => {
        if(!sliderRef.current) return;
        setCurrentImage((prevImage) => Math.max(prevImage - 5, 0));
    };

    return [prevSlide, nextSlide];
}

export default UseSlider;