import React from 'react';
// FIX: Corrected import path for types
import { SummaryData } from '../types';
// FIX: Corrected import path for constants
import { ICONS } from '../constants';

interface SummaryCardProps {
    data: SummaryData;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ data }) => {
    const { title, value, percentageChange, icon, color } = data;
    const isPositive = percentageChange >= 0;
    const titleId = `summary-title-${title.replace(/\s+/g, '-')}`;

    return (
        <article aria-labelledby={titleId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md flex items-center justify-between transition-transform transform hover:scale-105">
            <div>
                <p id={titleId} className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 my-1">{value}</p>
                <div className={`flex items-center text-xs font-semibold ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? ICONS.TREND_UP : ICONS.TREND_DOWN}
                    <span className="sr-only">{isPositive ? 'Increase of' : 'Decrease of'}</span>
                    <span className="ml-1">{Math.abs(percentageChange)}% this month</span>
                </div>
            </div>
            <div className={`text-4xl ${color}`} aria-hidden="true">
                {icon}
            </div>
        </article>
    );
};

export default SummaryCard;
