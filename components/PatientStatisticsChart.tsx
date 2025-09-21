import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// FIX: Corrected import path for types
import { ChartData } from '../types';

const data: ChartData[] = [
    { name: 'Jan', total: 400, inpatient: 240 },
    { name: 'Feb', total: 300, inpatient: 139 },
    { name: 'Mar', total: 200, inpatient: 980 },
    { name: 'Apr', total: 278, inpatient: 390 },
    { name: 'May', total: 189, inpatient: 480 },
    { name: 'Jun', total: 239, inpatient: 380 },
    { name: 'Jul', total: 349, inpatient: 430 },
];

const TimeframeSelector: React.FC<{
    active: string;
    onSelect: (timeframe: 'Week' | 'Month' | 'Year') => void;
}> = ({ active, onSelect }) => {
    const timeframes: ('Week' | 'Month' | 'Year')[] = ['Week', 'Month', 'Year'];
    return (
        <div className="flex bg-slate-100 dark:bg-slate-700 rounded-full p-1">
            {timeframes.map(t => (
                <button
                    key={t}
                    onClick={() => onSelect(t)}
                    className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors ${active === t ? 'bg-white dark:bg-slate-600 text-teal-600 dark:text-white shadow' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'}`}
                >
                    {t}
                </button>
            ))}
        </div>
    );
};

const PatientStatisticsChart: React.FC = () => {
    const [timeframe, setTimeframe] = useState<'Week' | 'Month' | 'Year'>('Month');
    const headingId = "patient-stats-heading";

    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md h-full" role="region" aria-labelledby={headingId}>
            <div className="flex justify-between items-center mb-4">
                <h2 id={headingId} className="text-lg font-bold text-slate-800 dark:text-slate-100">Patient Statistics</h2>
                <TimeframeSelector active={timeframe} onSelect={setTimeframe} />
            </div>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(203, 213, 225, 0.5)" />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} className="dark:fill-slate-400" />
                        <YAxis tickLine={false} axisLine={false} tick={{ fill: '#64748b' }} className="dark:fill-slate-400" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: 'var(--tooltip-bg, white)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.75rem',
                          }}
                          wrapperClassName="dark:[--tooltip-bg:theme(colors.slate.800)] dark:border-slate-700"
                        />
                        <Legend iconType="circle" iconSize={8} wrapperStyle={{color: '#334155'}}/>
                        <Line type="monotone" dataKey="inpatient" stroke="#14b8a6" strokeWidth={3} dot={false} name="Inpatient"/>
                        <Line type="monotone" dataKey="total" stroke="#f97316" strokeWidth={3} dot={false} name="Total Patient"/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default PatientStatisticsChart;
