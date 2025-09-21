import React, { useState, useEffect } from 'react';
import { SOAPNote as SOAPNoteType, Patient } from '../types';

const pastNotes: SOAPNoteType[] = [
  { id: '1', patientName: 'John Doe', date: '2024-08-15', subjective: 'Patient reports feeling better.', objective: 'Vitals stable.', assessment: 'Improving.', plan: 'Continue current medication.' },
  { id: '2', patientName: 'Jane Smith', date: '2024-08-18', subjective: 'Complains of headache.', objective: 'BP 130/85.', assessment: 'Possible tension headache.', plan: 'Administer Tylenol.' },
];

interface SOAPNoteProps {
    patient?: Patient | null;
}

const SOAPNote: React.FC<SOAPNoteProps> = ({ patient }) => {
    const [patientName, setPatientName] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [subjective, setSubjective] = useState('');
    const [objective, setObjective] = useState('');
    const [assessment, setAssessment] = useState('');
    const [plan, setPlan] = useState('');

    useEffect(() => {
        if (patient) {
            setPatientName(patient.name);
        }
    }, [patient]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission logic
        console.log({ patientName, date, subjective, objective, assessment, plan });
        alert('SOAP Note saved!');
    };
    
    const headingId = "soap-note-heading";

    const FormTextarea: React.FC<{label: string, value: string, onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void, id: string}> = ({ label, value, onChange, id }) => (
        <div>
            <label htmlFor={id} className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{label}</label>
            <textarea
                id={id}
                value={value}
                onChange={onChange}
                rows={4}
                className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
        </div>
    );

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <section aria-labelledby={headingId} className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                 <header className="mb-6 border-b pb-4 border-slate-200 dark:border-slate-700">
                    <h1 id={headingId} className="text-2xl font-bold text-slate-800 dark:text-slate-100">Create SOAP Note</h1>
                    <p className="text-slate-500 dark:text-slate-400">Document patient encounters efficiently.</p>
                </header>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                            <label htmlFor="patient-name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Patient Name</label>
                            <input type="text" id="patient-name" value={patientName} onChange={e => setPatientName(e.target.value)} className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 rounded-lg disabled:opacity-75" required disabled={!!patient} />
                        </div>
                         <div>
                            <label htmlFor="note-date" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Date</label>
                            <input type="date" id="note-date" value={date} onChange={e => setDate(e.target.value)} className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg" required />
                        </div>
                    </div>
                    <FormTextarea label="S - Subjective" value={subjective} onChange={e => setSubjective(e.target.value)} id="subjective" />
                    <FormTextarea label="O - Objective" value={objective} onChange={e => setObjective(e.target.value)} id="objective" />
                    <FormTextarea label="A - Assessment" value={assessment} onChange={e => setAssessment(e.target.value)} id="assessment" />
                    <FormTextarea label="P - Plan" value={plan} onChange={e => setPlan(e.target.value)} id="plan" />
                    <button type="submit" className="w-full px-4 py-3 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 transition-colors shadow-sm">
                        Save Note
                    </button>
                </form>
            </section>
            <aside className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                 <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Recent Notes</h2>
                 <ul className="space-y-3">
                     {pastNotes.map(note => (
                         <li key={note.id} className="p-3 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer">
                            <p className="font-semibold text-slate-800 dark:text-slate-200">{note.patientName}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{note.date}</p>
                         </li>
                     ))}
                 </ul>
            </aside>
        </div>
    );
};

export default SOAPNote;
