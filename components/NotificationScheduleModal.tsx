import React from 'react';
import { NotificationScheduleItem } from '../types';
import { ICONS } from '../constants';

interface NotificationScheduleModalProps {
    schedule: NotificationScheduleItem[];
    patientName: string;
    onClose: () => void;
}

const NotificationScheduleModal: React.FC<NotificationScheduleModalProps> = ({ schedule, patientName, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="notification-schedule-title">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl animate-fade-in-up">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h2 id="notification-schedule-title" className="text-xl font-bold text-slate-800 dark:text-slate-100">AI-Generated Notification Schedule</h2>
                        <p className="text-slate-500 dark:text-slate-400">For {patientName}</p>
                    </div>
                     <button onClick={onClose} aria-label="Close modal" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-3xl leading-none">&times;</button>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto pr-2 space-y-4">
                    {schedule.map((item, index) => (
                        <div key={index} className="p-4 bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-teal-700 dark:text-teal-400">{item.drug_name}</p>
                                <span className="px-2 py-1 text-xs font-semibold rounded-full bg-slate-200 dark:bg-slate-600 text-slate-600 dark:text-slate-200">{item.time_of_day}</span>
                            </div>
                            <div className="flex items-start gap-3 p-3 bg-white dark:bg-slate-700 rounded-md shadow-sm">
                               <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white" aria-hidden="true">
                                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zM8.707 13.293a1 1 0 01-1.414 0L4 10.414l1.414-1.414L8 10.586l5.293-5.293L14.707 6.707 8.707 13.293z" />
                                   </svg>
                               </div>
                               <div>
                                   <p className="font-semibold text-slate-700 dark:text-slate-200">WhatsApp Message:</p>
                                   <p className="text-sm text-slate-600 dark:text-slate-300 italic">"{item.message_content}"</p>
                               </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">This is a simulation. No real messages will be sent.</p>
                    <button onClick={onClose} className="w-full sm:w-auto px-6 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-sm">
                        Confirm & "Schedule"
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotificationScheduleModal;
