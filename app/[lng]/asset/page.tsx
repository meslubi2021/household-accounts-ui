"use client"

import { useTranslation } from '../../i18n/client';
import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');

    const [currentDate, setCurrentDate] = useState(new Date());
    const [nextDate, setNextDate] = useState(new Date());
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const controls = useAnimation();

    useEffect(() => {
        if (direction !== 0) {
          setCurrentDate(nextDate);
          setDirection(0);
        }
      }, [nextDate, direction]);

      const handleDragEnd = (event:any, info:any) => {
        console.log('test')
        if (info.offset.x < -100) {
          // Dragging left
          setDirection(1);
          setNextDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
        } else if (info.offset.x > 100) {
          // Dragging right
          setDirection(-1);
          setNextDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
        } else {
          // Snap back if the drag distance is too short
          controls.start({ x: 0 });
        }
      };

    // const handlePrev = () => {
    //     setDirection(-1);
    //     setNextDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    // };

    // const handleNext = () => {
    //     setDirection(1);
    //     setNextDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    // };

    const variants = {
        enter: (direction: number) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
        }),
        center: {
        x: 0,
        opacity: 1
        },
        exit: (direction: number) => ({
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
        })
    };

    return (<>
       Coming soon
       <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        animate={controls}
        key={currentDate.toString()}
        custom={direction}
        initial="center"
        exit="exit"
        variants={variants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ position: 'absolute', width: '100%' }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate={currentDate}
        />
      </motion.div>
      <motion.div
        key={`${nextDate.toString()}-next`}
        custom={direction}
        initial="enter"
        animate="center"
        exit="exit"
        variants={variants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        // style={{ position: 'absolute', width: '100%' }}
      >
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          initialDate={nextDate}
        />
      </motion.div>
    </div>
       {/* <div>
      <button onClick={handlePrev}>Previous</button>
      <button onClick={handleNext}>Next</button>
      <div style={{ position: 'relative', width: '100%', height: 'auto' }}>
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentDate.toString()}
            custom={direction}
            initial="center"
            animate="exit"
            exit="enter"
            variants={variants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              initialDate={currentDate}
            />
          </motion.div>
          <motion.div
            key={`${nextDate.toString()}-next`}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={variants}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{ position: 'absolute', width: '100%' }}
          >
            <FullCalendar
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              initialDate={nextDate}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div> */}
    </>
    );
}