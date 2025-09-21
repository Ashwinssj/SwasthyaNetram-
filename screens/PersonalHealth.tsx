import React from 'react';
import { HealthMetric } from '../types';
import { ICONS } from '../constants';

const metricIcons: { [key: string]: JSX.Element } = {
    'Heart Rate': ICONS.HEART,
    'Blood Pressure': ICONS.BLOOD_PRESSURE,
    'Glucose': ICONS.GLUCOSE,
    'Steps': ICONS.PATIENTS,
};

const MetricCard: React.FC<{ metric: HealthMetric }> = ({ metric }) => {
    const trendIcon = {
        up: <span className="text-green-500">{ICONS.TREND_UP}</span>,
        down: <span className="text-red-500">{ICONS.TREND_DOWN}</span>,
        stable: <span className="text-slate-500 dark:text-slate-400 transform -rotate-45">{ICONS.TREND_UP}</span>
    };
    const cardId = `metric-card-${metric.name.replace(/\s+/g, '-')}`;
    const icon = metricIcons[metric.name] || ICONS.HEART;

    return (
        <article aria-labelledby={cardId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md flex items-start justify-between">
            <div>
                <p id={cardId} className="font-bold text-slate-700 dark:text-slate-200">{metric.name}</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-slate-100 my-2">{metric.value} <span className="text-lg text-slate-500 dark:text-slate-400">{metric.unit}</span></p>
                <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                    {trendIcon[metric.trend]}
                    <span className="ml-1">{metric.trend.charAt(0).toUpperCase() + metric.trend.slice(1)}</span>
                </div>
            </div>
            <div className="p-3 bg-teal-100 text-teal-600 rounded-full text-2xl" aria-hidden="true">
                {icon}
            </div>
        </article>
    );
};


interface PersonalHealthProps {
    metrics: HealthMetric[];
}

const PersonalHealth: React.FC<PersonalHealthProps> = ({ metrics }) => {
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md" aria-labelledby="health-metrics-heading">
            <h2 id="health-metrics-heading" className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Health Metrics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {metrics.map(metric => <MetricCard key={metric.name} metric={metric} />)}
            </div>
        </section>
    );
};

export default PersonalHealth;
