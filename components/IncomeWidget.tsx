import React from 'react';
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

const data = [
    { name: 'W1', income: 400 },
    { name: 'W2', income: 300 },
    { name: 'W3', income: 600 },
    { name: 'W4', income: 450 },
];

const IncomeWidget: React.FC = () => {
    const headingId = "income-widget-heading";
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md" role="region" aria-labelledby={headingId}>
            <h2 id={headingId} className="text-lg font-bold text-slate-800 dark:text-slate-100">Total Income</h2>
            <p className="text-2xl font-bold text-green-600">$45,231</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">from this week</p>
            <div className="h-24 mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                        <Tooltip
                          cursor={{fill: 'rgba(20, 184, 166, 0.1)'}}
                          contentStyle={{
                            backgroundColor: 'var(--tooltip-bg, white)',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.75rem',
                          }}
                          wrapperClassName="dark:[--tooltip-bg:theme(colors.slate.800)] dark:border-slate-700"
                         />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} className="dark:fill-slate-400"/>
                        <Bar dataKey="income" fill="#14b8a6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </section>
    );
};

export default IncomeWidget;
