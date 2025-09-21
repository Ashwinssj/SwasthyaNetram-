import React from 'react';
import { Prescription } from '../types';

interface PatientPrescriptionsProps {
  prescriptions: Prescription[];
}

const PatientPrescriptions: React.FC<PatientPrescriptionsProps> = ({ prescriptions }) => {
  const getStatusClass = (status: 'Active' | 'Inactive') => {
    return status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300';
  };

  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Prescriptions</h2>
      {prescriptions.length > 0 ? (
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="p-2 font-semibold text-slate-600 dark:text-slate-400">Drug</th>
              <th className="p-2 font-semibold text-slate-600 dark:text-slate-400">Dosage</th>
              <th className="p-2 font-semibold text-slate-600 dark:text-slate-400">Status</th>
            </tr>
          </thead>
          <tbody>
            {prescriptions.map(p => (
              <tr key={p.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                <td className="p-2 font-medium text-slate-800 dark:text-slate-200">{p.drug}</td>
                <td className="p-2 text-slate-600 dark:text-slate-300">{p.dosage} - {p.schedule}</td>
                <td className="p-2">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(p.status)}`}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-slate-500 dark:text-slate-400">No prescriptions found for this patient.</p>
      )}
    </section>
  );
};

export default PatientPrescriptions;
