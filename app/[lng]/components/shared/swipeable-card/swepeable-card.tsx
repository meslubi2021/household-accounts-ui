'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform } from "framer-motion"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { TransactionType } from '../../../models';

interface SwipeableCardType{
    transaction: {
        _id: string;
        date: string;
        category: string;
        note?: string;
        amount: number;
        type: TransactionType;
        paymentMethod: string;
    }
    editOnClick: (e:any) => void
}

export const SwipeableCard:React.FC<SwipeableCardType> = ({transaction, editOnClick}) => {
    const [isDragging, setIsDragging] = useState(false);
    const x = useMotionValue(0);
    const boxShadow = useTransform(
        x,
        [-180, 0],
        ["1px 1px 10px gray", "0px 0px 0px gray"]
    )
    const width = useTransform(
        x,
        [-180, 0],
        [180, 0]
    )
    const childWidth = useTransform(
        x,
        [-180, 0],
        [100, 0]
    )
    const opacity = useTransform(x, [-11, -10, 0], [1, 0, 0]);

    function handleOnClick(e:any, callback: (e: any) => void){
        if(isDragging){
            e.preventDefault();
            e.stopPropagation();
        }else{
            callback(e);
        }
    }

    return(<motion.div className="relative overflow-hidden text-2xl border"
        data-id={transaction._id}
        data-date-str={transaction.date.split("T")[0]}
        data-amount={transaction.amount}
        data-category={transaction.category}
        data-note={transaction.note}
        onClick={(e) => handleOnClick(e, editOnClick)}
    >
        <motion.div className="flex justify-between items-center m-0.5 p-2 cursor-pointer"
            drag="x"
            dragConstraints={{            
                left: -180,
                right: 0,
            }}
            dragElastic={{left: 0, right: 0}}
            style={{ x, boxShadow }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={(event,info) => {
                if(x.get() > -180 && x.get() < -110){
                    x.set(-180);
                }else{
                    x.set(0);
                }

                if(x.get() === 0) {
                    setIsDragging(false)
                }else{
                    setIsDragging(true)
                }
            }}
        >
            <div className="flex items-center">
                <div>{transaction.category}</div>
                <div className="ml-2  text-gray-500">{transaction.note}</div>
            </div>
            <div className={'text-red-500  font-bold'}>
                -${transaction.amount}
            </div>
        </motion.div>
        <motion.div className="actions absolute top-0 right-0 p-2 flex overflow-hidden" style={{ opacity, width }}>                
            <motion.button className="px-2 flex flex-col items-center overflow-hidden text-blue-500 hover:text-blue-600" style={{ width: childWidth }} 
                data-id={transaction._id}
                data-date-str={transaction.date.split("T")[0]}
                data-amount={transaction.amount}
                data-category={transaction.category}
                data-note={transaction.note}
                onClick={editOnClick}
            >
                <PencilSquareIcon width={"18px"} />
                <span>Edit</span>
            </motion.button>
            <motion.button className="px-2 flex flex-col items-center overflow-hidden text-red-500 hover:text-red-600" style={{ width: childWidth }}>
                <TrashIcon width={"18px"}/>
                <span>Delete</span>
            </motion.button>
        </motion.div>
    </motion.div>
)};