import React, { useState } from 'react';
import { LabReport } from '../types';
import FileUpload from './FileUpload';

interface AddLabReportModalProps {
    onSave: (item: LabReport) => void;
    onClose: () => void;
}

const AddLabReportModal: React.FC<AddLabReportModalProps> = ({ onSave, onClose }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [reportName, setReportName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!reportName.trim() || !file) {
            alert('Please enter a report name and upload a file.');
            return;
        }
        // In a real app, we'd upload the file and get a URL.
        // For this simulation, we'll create a blob URL.
        const fileUrl = URL.createObjectURL(file);
        
        onSave({
            id: `lr-${Date.now()}`,
            name: reportName,
            date,
            fileUrl,
        });
    };

    const handleFileUpload = (uploadedFile: File) => {
        // This is a placeholder for potential upload logic
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="add-report-title">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg animate-fade-in-up">
                <h2 id="add-report-title" className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Add Lab Report</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="report-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Report Name</label>
                        <input type="text" id="report-name" value={reportName} onChange={e => setReportName(e.target.value)} placeholder="e.g., Blood Test Results" className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"/>
                    </div>
                    <div>
                        <label htmlFor="report-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                        <input type="date" id="report-date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"/>
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Report File</label>
                        <FileUpload onUpload={handleFileUpload} onFileSelect={setFile} />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 disabled:bg-slate-400" disabled={!file || !reportName.trim()}>
                            Save Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddLabReportModal;