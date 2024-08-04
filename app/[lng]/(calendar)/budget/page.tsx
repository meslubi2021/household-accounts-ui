"use client"

import { useTranslation } from '../../../i18n/client';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { transactionService, budgetService, categoryService } from '../../api-services';
import { useSessionStorageState } from '../../utils/custom-hook';
import { calendarActions, refreshActions } from '../../utils/redux';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { format } from 'date-fns'
import {  Tabs, Tab  } from '../../components/shared';
import { formatCurrency } from '../../utils';
import { Budget, Category } from '../../models';

export default function Index({ params: { lng }} : any) {
    const { t } = useTranslation(lng, 'main');
    const dispatch = useDispatch();
    const { selectedDateStr } = useSelector((state:any) => state.calendar);
    const { isBudgetPageRefresh } = useSelector((state:any) => state.refresh);
    const [ userInfo, _ ] = useSessionStorageState("userInfo", "");
    const [ totalIncome, setTotalIncome ] = useState(0);
    const [ budget, setBudget ] = useState<Budget>();
    const [ expenseCategories, setExpenseCategories ] = useState<Category[]>();
    const [ activeTab, setActiveTab ] = useState(0);

    useEffect(() => {
        if(!isBudgetPageRefresh) return;
        if(selectedDateStr === "") return;
        init(selectedDateStr);
        dispatch(refreshActions.setIsBudgetPageRefresh(false));
      }, [isBudgetPageRefresh]);

    useEffect(() => {
        if(selectedDateStr === "") return;
        init(selectedDateStr);
    }, [selectedDateStr])

    async function init(selectedDateStr:string) {
        try{
            if(userInfo === ""){
              throw new Error("Userinfo is not correct.")
            }
            const [year, month] = selectedDateStr.split('-'); // ["2024", "08"]
            const prevMonth = parseInt(month) - 1;
            const transactionRes = await transactionService.getIncomeByUserId(userInfo._id, year, prevMonth.toString());
            const budget = await budgetService.getByUserId(userInfo._id, year, month);
            const categories = await categoryService.getByUserId(userInfo._id, 'expense');
            setExpenseCategories(categories)
            setBudget(budget);
            let totalAmount = 0;
            transactionRes?.forEach(transaction => totalAmount += transaction.totalAmount);
            setTotalIncome(totalAmount);
        }catch(err){
            console.log(err);
        }
    }
    const handleDatesSet = (arg: any) => {      
      const calendarApi = arg.view.calendar;
      const currentDate = calendarApi.getDate();
  
      // Selected Month, need to store it globally.
      dispatch(calendarActions.setSelectedDateStr(format(currentDate, 'yyyy-MM-dd')));
    };

    function calBalance(income:number, budget:number) {
      if(income - budget < 0){
        return <span className="text-red-500">-${formatCurrency(income - budget).split("-")[1]}</span>
      }else{
        return `$${formatCurrency(income - budget)}`
      }
    }

    return (<>
    <div className="budget-page-wrapper">
        <FullCalendar 
            plugins={[dayGridPlugin]}
            datesSet={handleDatesSet} // to handle pre / next on headerTool bar event.
            headerToolbar={{
                left: 'prev',
                center: 'title today',
                right: 'next'
            }}
         />
    </div>
    <div className="flex flex-col list-of-budgets p-4 h-[39vh]">
       <div className="flex justify-between mb-4">
            <div className="text-center">
                <p>{`${t('general.income')} (${t('general.last_month')})`}</p>
                <p className="text-green-500 font-bold">${formatCurrency(totalIncome)}</p>
            </div>
            <div className="text-center">
                <p>{t('general.budget')}</p>
                <p className="text-red-500 font-bold">${formatCurrency(budget?.totalAmount || 0)}</p>
            </div>
            <div className="text-center">
                <p>{t('general.balance')}</p>
                <p className="text-blue-500 font-bold">{calBalance(totalIncome, budget?.totalAmount || 0)}</p>
            </div>
        </div>
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab}>
                <Tab label={t("general.expense")}>
                {
                    expenseCategories && expenseCategories.length > 0
                    ?
                        expenseCategories.map(category => {
                            return (<div>{category.name}</div>)
                        })
                    : 
                        <div>Add new category</div>
                }
                </Tab>
                <Tab label={t("general.investment")}>
                    <div>Coming soon</div>
                </Tab>
            </Tabs>
    </div>
    </>
    );
}