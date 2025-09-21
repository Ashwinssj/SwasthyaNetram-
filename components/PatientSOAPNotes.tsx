import React from 'react';
import { SOAPNote } from '../types';

interface PatientSOAPNotesProps {
  notes: SOAPNote[];
}

const PatientSOAPNotes: React.FC<PatientSOAPNotesProps> = ({ notes }) => {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
      <h2 className="text-lg font-bold mb-4 text-slate-800 dark:text-slate-100">Recent SOAP Notes</h2>
      {notes.length > 0 ? (
        <ul className="space-y-3">
          {notes.map(note => (
            <li key={note.id} className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg">
              <p className="font-semibold text-slate-800 dark:text-slate-200">Note from {note.date}</p>
              <div className="text-sm mt-2 space-y-1 text-slate-600 dark:text-slate-300">
                <p><strong className="font-medium text-slate-700 dark:text-slate-200">S:</strong> {note.subjective}</p>
                <p><strong className="font-medium text-slate-700 dark:text-slate-200">O:</strong> {note.objective}</p>
                <p><strong className="font-medium text-slate-700 dark:text-slate-200">A:</strong> {note.assessment}</p>
                <p><strong className="font-medium text-slate-700 dark:text-slate-200">P:</strong> {note.plan}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-500 dark:text-slate-400">No SOAP notes found for this patient.</p>
      )}
    </section>
  );
};

export default PatientSOAPNotes;
