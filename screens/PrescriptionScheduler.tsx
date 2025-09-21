import React from 'react';
import { Prescription, Patient } from '../types';

interface PrescriptionSchedulerProps {
    patient?: Patient | null;
    prescriptions: Prescription[];
}

const PrescriptionScheduler: React.FC<PrescriptionSchedulerProps> = ({ patient, prescriptions }) => {
  const headingId = "prescription-scheduler-heading";

  const getStatusClass = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
  };

  const filteredData = patient ? prescriptions.filter(p => p.patient === patient.name) : prescriptions;
  
  return (
    <section aria-labelledby={headingId} className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
      <header className="flex flex-wrap justify-between items-center mb-6 border-b pb-4 gap-4 border-slate-200 dark:border-slate-700">
        <div>
            <h1 id={headingId} className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                {patient ? `Prescriptions for ${patient.name}` : 'Prescription Scheduler'}
            </h1>
            <p className="text-slate-500 dark:text-slate-400">Manage and track all patient prescriptions.</p>
        </div>
        <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-sm">
            + New Prescription
        </button>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="border-b-2 border-slate-200 dark:border-slate-700">
            <tr>
              <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Patient</th>
              <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hidden md:table-cell">Drug</th>
              <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hidden lg:table-cell">Dosage & Schedule</th>
              <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Status</th>
              <th className="p-3 text-sm font-semibold text-slate-600 dark:text-slate-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((p) => (
              <tr key={p.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{p.patient}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300 hidden md:table-cell">{p.drug}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300 hidden lg:table-cell">
                    <div>{p.dosage}</div>
                    <div className="text-xs">{p.schedule}</div>
                </td>
                <td className="p-3">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(p.status)}`}>
                    {p.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-teal-600 dark:text-teal-500 hover:underline font-medium" aria-label={`Edit prescription for ${p.patient}`}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PrescriptionScheduler;
