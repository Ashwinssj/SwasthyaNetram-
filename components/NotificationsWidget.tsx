import React from 'react';
// FIX: Corrected import path for constants
import { ICONS } from '../constants';
// FIX: Corrected import path for types
import { Notification } from '../types';

const notifications: Notification[] = [
    { title: 'Facilities Update', description: 'Elevator in Wing B is under maintenance.', time: '10 min ago', icon: ICONS.FACILITIES },
    { title: 'Maintenance Request', description: 'AC unit in Room 302 not working.', time: '1 hour ago', icon: ICONS.MAINTENANCE },
    { title: 'New Patient Admitted', description: 'Jane Doe admitted to ICU.', time: '2 hours ago', icon: ICONS.PATIENTS },
];

const NotificationsWidget: React.FC = () => {
    const headingId = "notifications-widget-heading";
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md" aria-labelledby={headingId}>
            <h2 id={headingId} className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Notifications</h2>
            <ul className="space-y-4">
                {notifications.map(note => (
                    <li key={note.title} className="flex items-start">
                         <div className="p-3 bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full mr-4" aria-hidden="true">
                            {note.icon}
                        </div>
                        <div>
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{note.title}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-300">{note.description}</p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{note.time}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default NotificationsWidget;
