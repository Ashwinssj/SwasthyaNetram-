import React, { useState } from 'react';
import { Patient } from '../types';

interface EditPatientModalProps {
    patient: Patient;
    onSave: (patient: Patient) => void;
    onClose: () => void;
}

const ModalInput: React.FC<{label: string, id: string, value: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ label, id, value, onChange }) => (
    <div>
        <label htmlFor={id} className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{label}</label>
        <input type="text" id={id} value={value} onChange={onChange} className="w-full p-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"/>
    </div>
);

const EditPatientModal: React.FC<EditPatientModalProps> = ({ patient, onSave, onClose }) => {
    const [formData, setFormData] = useState(patient);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleAllergiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prev => ({ ...prev, allergies: value.split(',').map(s => s.trim()) }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-patient-title">
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg animate-fade-in-up">
                <h2 id="edit-patient-title" className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Edit Patient: {patient.name}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <ModalInput label="Phone Number" id="contact" value={formData.contact} onChange={handleChange} />
                    <ModalInput label="Email Address" id="email" value={formData.email} onChange={handleChange} />
                    <ModalInput label="Address" id="address" value={formData.address} onChange={handleChange} />
                    <ModalInput label="Allergies (comma-separated)" id="allergies" value={formData.allergies.join(', ')} onChange={handleAllergiesChange} />
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-500">
                            Cancel
                        </button>
                        <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPatientModal;
