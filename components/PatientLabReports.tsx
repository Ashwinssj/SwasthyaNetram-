import React from 'react';
import { LabReport } from '../types';

interface PatientLabReportsProps {
  reports: LabReport[];
  onAdd: () => void;
}

const PatientLabReports: React.FC<PatientLabReportsProps> = ({ reports, onAdd }) => {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Lab Reports</h2>
        <button onClick={onAdd} className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors text-sm shadow-sm">
            + Upload New Report
        </button>
      </div>
      {reports.length > 0 ? (
        <div className="overflow-x-auto">
            <table className="w-full text-left">
            <thead>
                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                <th className="p-2 font-semibold text-slate-600 dark:text-slate-400">Report Name</th>
                <th className="p-2 font-semibold text-slate-600 dark:text-slate-400">Date</th>
                <th className="p-2 font-semibold text-slate-600 dark:text-slate-400"></th>
                </tr>
            </thead>
            <tbody>
                {reports.map(report => (
                <tr key={report.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="p-2 font-medium text-slate-800 dark:text-slate-200">{report.name}</td>
                    <td className="p-2 text-slate-600 dark:text-slate-300">{report.date}</td>
                    <td className="p-2 text-right">
                        <a href={report.fileUrl} target="_blank" rel="noopener noreferrer" className="text-teal-600 dark:text-teal-500 hover:underline font-medium">View</a>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
      ) : (
        <p className="text-slate-500 dark:text-slate-400 text-center py-4">No lab reports found for this patient.</p>
      )}
    </section>
  );
};

export default PatientLabReports;