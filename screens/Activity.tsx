import React from 'react';
import { ActivityLog } from '../types';
import { ICONS } from '../constants';

interface ActivityProps {
    activities: ActivityLog[];
}

const ActivityItem: React.FC<{ log: ActivityLog }> = ({ log }) => {
    const iconMap = {
        user: ICONS.EMPLOYEE,
        system: ICONS.SETTINGS,
        alert: ICONS.EMERGENCY,
    };
    const colorMap = {
        user: 'text-sky-500 bg-sky-100 dark:bg-sky-900/50 dark:text-sky-400',
        system: 'text-slate-500 bg-slate-100 dark:bg-slate-700 dark:text-slate-400',
        alert: 'text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-400',
    };

    return (
        <li className="flex items-start space-x-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg">
            <div className={`p-3 rounded-full ${colorMap[log.type]}`}>
                {iconMap[log.type]}
            </div>
            <div>
                <p className="text-slate-800 dark:text-slate-200">
                    <span className="font-bold">{log.user}</span> {log.action}
                </p>
                <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">{log.timestamp}</p>
            </div>
        </li>
    );
};

const Activity: React.FC<ActivityProps> = ({ activities }) => {
    const headingId = "activity-heading";
    return (
        <section aria-labelledby={headingId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
            <header className="mb-4 border-b pb-4 border-slate-200 dark:border-slate-700">
                <h1 id={headingId} className="text-2xl font-bold text-slate-800 dark:text-slate-100">Activity Log</h1>
                <p className="text-slate-500 dark:text-slate-400">A timeline of all recent activities in the system.</p>
            </header>
            <div>
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                    {activities.map(log => <ActivityItem key={log.id} log={log} />)}
                </ul>
            </div>
        </section>
    );
};

export default Activity;
