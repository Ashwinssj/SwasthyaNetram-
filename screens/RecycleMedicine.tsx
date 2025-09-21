import React from 'react';
// FIX: Corrected import path for types
import { RecycledMedicine } from '../types';

const recycledData: RecycledMedicine[] = [
    { id: 'MED001', name: 'Lisinopril 10mg', patient: 'Jane Smith', date: '2024-08-20', status: 'Processed' },
    { id: 'MED002', name: 'Amoxicillin 250mg', patient: 'Emily White', date: '2024-08-21', status: 'Pending' },
    { id: 'MED003', name: 'Metformin 500mg', patient: 'Robert Johnson', date: '2024-08-22', status: 'Pending' },
];

const RecycleMedicine: React.FC = () => {
    const headingId = "recycle-medicine-heading";
    const getStatusClass = (status: 'Pending' | 'Processed') => {
        return status === 'Processed' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    };

    return (
        <div className="space-y-6">
            <section aria-labelledby="log-medicine-heading" className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                 <h2 id="log-medicine-heading" className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Log a Medicine Return</h2>
                 <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div>
                        <label htmlFor="med-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Medicine Name</label>
                        <input type="text" id="med-name" placeholder="e.g., Atorvastatin" className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="patient-return" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Returning Patient</label>
                        <input type="text" id="patient-return" placeholder="e.g., Michael Brown" className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="return-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                        <input type="date" id="return-date" className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"/>
                    </div>
                    <button type="submit" className="w-full lg:w-auto px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors">
                        Log Return
                    </button>
                 </form>
            </section>
            
            <section aria-labelledby={headingId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                <header className="mb-4">
                    <h1 id={headingId} className="text-xl font-bold text-slate-800 dark:text-slate-100">Medicine Recycle Log</h1>
                    <p className="text-slate-500 dark:text-slate-400">Track all returned medications pending disposal.</p>
                </header>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">ID</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Medicine Name</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 hidden md:table-cell">Patient</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 hidden lg:table-cell">Date</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recycledData.map(item => (
                                <tr key={item.id} className="border-b hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700">
                                    <td className="p-3 font-mono text-sm text-slate-500 dark:text-slate-400">{item.id}</td>
                                    <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{item.name}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-300 hidden md:table-cell">{item.patient}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-300 hidden lg:table-cell">{item.date}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default RecycleMedicine;
