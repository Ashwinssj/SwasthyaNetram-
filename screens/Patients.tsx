import React from 'react';
import { Patient } from '../types';

interface PatientsProps {
    patients: Patient[];
    onSelectPatient: (patient: Patient) => void;
}

const Patients: React.FC<PatientsProps> = ({ patients, onSelectPatient }) => {
    const headingId = "patients-list-heading";
    const getStatusClass = (status: 'Stable' | 'Critical' | 'Discharged') => {
        if (status === 'Stable') return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        if (status === 'Critical') return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
        return 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
    };

    return (
        <section aria-labelledby={headingId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
            <header className="flex flex-wrap justify-between items-center mb-6 border-b pb-4 gap-4 border-slate-200 dark:border-slate-700">
                <div>
                    <h1 id={headingId} className="text-2xl font-bold text-slate-800 dark:text-slate-100">Patient Directory</h1>
                    <p className="text-slate-500 dark:text-slate-400">Browse and manage patient records.</p>
                </div>
                <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-sm">
                    + Add New Patient
                </button>
            </header>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Name</th>
                            <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 hidden md:table-cell">Age & Gender</th>
                            <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 hidden lg:table-cell">Last Visit</th>
                            <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Status</th>
                            <th className="p-3 font-semibold text-slate-600 dark:text-slate-400"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((p) => (
                            <tr key={p.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                                <td className="p-3">
                                    <div className="flex items-center">
                                        <img src={p.avatar} alt={p.name} className="w-10 h-10 rounded-full mr-3"/>
                                        <span className="font-medium text-slate-800 dark:text-slate-200">{p.name}</span>
                                    </div>
                                </td>
                                <td className="p-3 text-slate-600 dark:text-slate-300 hidden md:table-cell">{p.age} / {p.gender}</td>
                                <td className="p-3 text-slate-600 dark:text-slate-300 hidden lg:table-cell">{p.lastVisit}</td>
                                <td className="p-3">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(p.status)}`}>
                                        {p.status}
                                    </span>
                                </td>
                                <td className="p-3 text-right">
                                    <button onClick={() => onSelectPatient(p)} className="text-teal-600 dark:text-teal-500 hover:underline font-medium">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Patients;
