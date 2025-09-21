import React, { useState } from 'react';
import { MedicalHistoryItem } from '../types';

interface AddHistoryModalProps {
    onSave: (item: MedicalHistoryItem) => void;
    onClose: () => void;
}

const AddHistoryModal: React.FC<AddHistoryModalProps> = ({ onSave, onClose }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!note.trim()) {
            alert('Please enter a note.');
            return;
        }
        onSave({ date, note });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="add-history-title">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg animate-fade-in-up">
                <h2 id="add-history-title" className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Add Medical History Entry</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="history-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                        <input type="date" id="history-date" value={date} onChange={e => setDate(e.target.value)} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg"/>
                    </div>
                     <div>
                        <label htmlFor="history-note" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Note</label>
                        <textarea id="history-note" value={note} onChange={e => setNote(e.target.value)} rows={5} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg" placeholder="Enter clinical note..."/>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600">
                            Save Entry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddHistoryModal;
