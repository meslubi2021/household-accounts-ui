"use client";

import { useTranslation } from '../../i18n/client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion"

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');

    const [currentIndex, setCurrentIndex] = useState(0);
    const slides = [
      { id: 1, content: 'Slide 1', backgroundColor: 'lightcoral' },
      { id: 2, content: 'Slide 2', backgroundColor: 'lightblue' },
      { id: 3, content: 'Slide 3', backgroundColor: 'lightgreen' },
    ];

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
  };
    return (<>
       Coming soon
       
    <div style={{ position: 'relative', width: '100%', height: '300px' }}>
      <button onClick={prevSlide} style={{ left: '10px', top: '50%' }}>
        Previous
      </button>
      <button onClick={nextSlide} style={{ right: '10px', top: '50%' }}>
        Next
      </button>
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === currentIndex ? (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -200 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: slide.backgroundColor,
              }}
            >
              <h2>{slide.content}</h2>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
    </div>    
    </>
    );
}