import React from 'react';
// FIX: Corrected import path for types
import { CalendarEvent } from '../types';

const events: CalendarEvent[] = [
    { time: '10:00 AM', title: 'Meeting with Dr. Smith', type: 'meeting' },
    { time: '12:30 PM', title: 'Surgery: John Doe', type: 'procedure' },
    { time: '02:00 PM', title: 'Team Sync', type: 'meeting' },
];

const CalendarWidget: React.FC = () => {
    const eventColor = {
        meeting: 'bg-blue-100 text-blue-800 border-blue-300 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-700',
        procedure: 'bg-red-100 text-red-800 border-red-300 dark:bg-red-900/50 dark:text-red-300 dark:border-red-700'
    };
    const headingId = "calendar-widget-heading";
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md" aria-labelledby={headingId}>
            <div className="flex justify-between items-center mb-4">
                <h2 id={headingId} className="text-lg font-bold text-slate-800 dark:text-slate-100">Today's Schedule</h2>
                <button className="px-3 py-1.5 bg-teal-500 text-white rounded-lg text-sm font-semibold hover:bg-teal-600 transition-colors">+ Add Patient</button>
            </div>
             <div className="flex items-center justify-between mb-4">
                <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" aria-label="Previous month">&lt;</button>
                <p className="font-semibold" aria-live="polite">August 2024</p>
                <button className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300" aria-label="Next month">&gt;</button>
            </div>
            <ul className="space-y-3">
                {events.map(event => (
                     <li key={event.title} className={`p-3 rounded-lg border-l-4 flex ${eventColor[event.type]}`}>
                        <p className="font-semibold w-24">{event.time}</p>
                        <p className="text-slate-700 dark:text-slate-300">{event.title}</p>
                     </li>
                ))}
            </ul>
        </section>
    );
};

export default CalendarWidget;
