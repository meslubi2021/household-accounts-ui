'use client';

import { useState } from 'react';
import { useTranslation } from '@/app/lib/i18n/client'
import { motion, useMotionValue, useTransform } from "framer-motion"
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { TransactionType } from '@/app/lib/models';
import { formatCurrency } from '@/app/lib/utils';
import { transactionService } from '@/app/lib/api-services';
import { LoadingSpinner } from '..';
import { Modal, RadioButton } from '@/app/ui/shared-components';

interface SwipeableCardType{
    lng: string,
    transaction: {
        _id: string;
        date: string;
        category: string;
        subcategory?: string;
        note?: string;
        amount: number;
        type: TransactionType;
        pending: boolean;
        fixedExpenseMonthly: boolean;
        fixedSeriesId?: string;
        endDate?: string;
        paymentMethod: string;
    }
    editOnClick: (e:any) => void
    triggerRefresh: () => void
}

export const SwipeableCard:React.FC<SwipeableCardType> = ({lng, transaction, editOnClick, triggerRefresh}) => {
    const { t } = useTranslation(lng, 'main');
    const [isDragging, setIsDragging] = useState(false);
    const [ isSaving, setIsSaving ] = useState(false);
    const [ alertDelete, setAlertDelete ] = useState(false);
    const [ deleteOption, setDeleteOption ] = useState("only_one");
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
    async function handleDelete(e:any){
        try{
            e.stopPropagation();
            setIsSaving(true);
            if(e.currentTarget.dataset.fixedExpenseMonthly && e.currentTarget.dataset.fixedSeriesId){
                const res = await transactionService.deleteFixedExpense(e.currentTarget.dataset.transactionId, e.currentTarget.dataset.fixedSeriesId, deleteOption);
            }else{
                const res = await transactionService.deleteTransaction(e.currentTarget.dataset.transactionId);
            }
        }catch(err){
            console.log(err);
        }finally{
            triggerRefresh();
            setIsSaving(false);
        }
    }

    return(<>
    <motion.div className="relative overflow-hidden text-2xl border"
        data-id={transaction._id}
        data-date-str={transaction.date.split("T")[0]}
        data-amount={transaction.amount}
        data-category={transaction.category}
        data-subcategory={transaction.subcategory}
        data-pending={transaction.pending}
        data-fixed-expense-monthly={transaction.fixedExpenseMonthly}
        data-fixed-series-id={transaction.fixedSeriesId}
        data-end-date={transaction.endDate && transaction.endDate.split("T")[0]}
        data-type={transaction.type}
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
                {
                    !transaction.subcategory
                    ? <div>{transaction.category}</div> 
                    : <div className="leading-5 me-2">
                        <div>{transaction.category}</div>
                        <div className="text-gray-500">({transaction.subcategory})</div>
                    </div>
                }
                <div className="ml-2  text-gray-500">{transaction.note}</div>
            </div>
            <div className={'text-red-500  font-bold whitespace-nowrap'}>
                -${formatCurrency(transaction.amount)}
            </div>
        </motion.div>
        <motion.div className="actions absolute top-0 right-0 p-2 flex overflow-hidden" style={{ opacity, width }}>                
            <motion.button className="px-2 flex flex-col items-center overflow-hidden text-blue-500 hover:text-blue-600" style={{ width: childWidth }} 
                data-id={transaction._id}
                data-date-str={transaction.date.split("T")[0]}
                data-amount={transaction.amount}
                data-category={transaction.category}
                data-subcategory={transaction.subcategory}
                data-pending={transaction.pending}
                data-fixed-expense-monthly={transaction.fixedExpenseMonthly}
                data-type={transaction.type}
                data-note={transaction.note}
                onClick={editOnClick}
            >
                <PencilSquareIcon className="pb-0.5" width={"18px"} />
                <span>{t('general.edit')}</span> 
            </motion.button>
            <motion.button onClick={(e) => {
                e.stopPropagation();
                setAlertDelete(true)                
            }}
                className="px-2 flex flex-col items-center overflow-hidden text-red-500 hover:text-red-600" style={{ width: childWidth }}>                
                {!isSaving ? <TrashIcon className="pb-0.5" width={"18px"}/> : <LoadingSpinner />}
                <span>{t('general.delete')}</span> 
            </motion.button>
        </motion.div>
    </motion.div>

    <Modal isOpen={alertDelete} onClose={() => setAlertDelete(false)}>
        <div>
            {
                transaction.fixedExpenseMonthly
                ? <>
                    <div className="mb-2">
                        {t('general.delete_repeat_alert')}
                    </div>
                    <RadioButton 
                        label={t('general.delete_repeat_option.this_expense')}
                        name="deleteOption"
                        value="only_one"
                        checked={deleteOption === 'only_one'}
                        onChange={(event: any) => setDeleteOption(event.target.value)}
                    />
                    <RadioButton 
                        label={t('general.delete_repeat_option.this_and_following')}
                        name="deleteOption"
                        value="following"
                        checked={deleteOption === 'following'}
                        onChange={(event: any) => setDeleteOption(event.target.value)}
                    />
                    <RadioButton 
                        label={t('general.delete_repeat_option.all_expenses')}
                        name="deleteOption"
                        value="all"
                        checked={deleteOption === 'all'}
                        onChange={(event: any) => setDeleteOption(event.target.value)}
                    />
                </>
                : t('general.delete_alert')
            }
        </div>
        <div className="mt-3 flex items-center justify-end">
            <button
                onClick={handleDelete}
                className="mr-3 bg-red-300 text-white py-2 px-4 rounded hover:bg-red-400"
                data-transaction-id={transaction._id} 
                data-fixed-expense-monthly={transaction.fixedExpenseMonthly} 
                data-fixed-series-id={transaction.fixedSeriesId}
                >
                {t('general.confirm')}
            </button>
            <button                         
                onClick={() => setAlertDelete(false)}
                className="text-red-300 py-2 px-4 rounded border border-red-300 hover:bg-red-300 hover:text-white"
                >
                {t('general.cancel')}
            </button>
        </div>
    </Modal>
    </>
)};