import React, { useState } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Patient, Prescription, MedicalHistoryItem, SOAPNote as SOAPNoteType, NotificationScheduleItem, LabReport } from '../types';
import { ICONS } from '../constants';
import EditPatientModal from '../components/EditPatientModal';
import AddHistoryModal from '../components/AddHistoryModal';
import PatientPrescriptions from '../components/PatientPrescriptions';
import PatientSOAPNotes from '../components/PatientSOAPNotes';
import PersonalHealth from './PersonalHealth';
import NotificationScheduleModal from '../components/NotificationScheduleModal';
import PatientLabReports from '../components/PatientLabReports';
import AddLabReportModal from '../components/AddLabReportModal';

interface PatientDetailProps {
    patient: Patient;
    onBack: () => void;
    prescriptions: Prescription[];
    onNavigate: (screen: string) => void;
}

const PatientDetail: React.FC<PatientDetailProps> = ({ patient, onBack, prescriptions, onNavigate }) => {
    const [currentPatient, setCurrentPatient] = useState(patient);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
    const [isScheduling, setIsScheduling] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [notificationSchedule, setNotificationSchedule] = useState<NotificationScheduleItem[]>([]);
    const [isLabReportModalOpen, setIsLabReportModalOpen] = useState(false);

    const handleSavePatient = (updatedPatient: Patient) => {
        setCurrentPatient(updatedPatient);
        setIsEditModalOpen(false);
    };

    const handleAddHistory = (historyItem: MedicalHistoryItem) => {
        setCurrentPatient(prev => ({
            ...prev,
            medicalHistory: [...prev.medicalHistory, historyItem],
        }));
        setIsHistoryModalOpen(false);
    };
    
    const handleAddLabReport = (labReport: LabReport) => {
        setCurrentPatient(prev => ({
            ...prev,
            labReports: [...prev.labReports, labReport],
        }));
        setIsLabReportModalOpen(false);
    };

    const handleScheduleNotifications = async () => {
        setIsScheduling(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            const patientPrescriptions = prescriptions.filter(p => p.patient === currentPatient.name && p.status === 'Active');
            
            if (patientPrescriptions.length === 0) {
                alert("This patient has no active prescriptions to schedule notifications for.");
                setIsScheduling(false);
                return;
            }

            const prescriptionDetails = patientPrescriptions.map(p => `- ${p.drug} ${p.dosage}, taken ${p.schedule}`).join('\n');

            const prompt = `
                Based on the following prescription information for patient ${currentPatient.name}, create a friendly and simple daily WhatsApp notification schedule.
                The patient needs reminders for their medication.
                
                Prescriptions:
                ${prescriptionDetails}
                
                Generate a JSON array where each object represents a notification and contains:
                1. "drug_name": The name of the drug.
                2. "time_of_day": A general time like "Morning", "Afternoon", or "Evening".
                3. "message_content": A short, friendly reminder message. For example: "Hi ${currentPatient.name.split(' ')[0]}, it's time for your morning dose of Lisinopril."
            `;

            const responseSchema = {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    drug_name: { type: Type.STRING },
                    time_of_day: { type: Type.STRING },
                    message_content: { type: Type.STRING },
                  },
                  required: ["drug_name", "time_of_day", "message_content"],
                },
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema,
                }
            });

            const schedule = JSON.parse(response.text);
            setNotificationSchedule(schedule);
            setIsScheduleModalOpen(true);

        } catch (error) {
            console.error("Error generating notification schedule:", error);
            alert("Failed to generate the notification schedule. Please check the console for details.");
        } finally {
            setIsScheduling(false);
        }
    };

    const patientPrescriptions = prescriptions.filter(p => p.patient === currentPatient.name);
    const soapNotes: SOAPNoteType[] = [
      { id: 'sn1', patientName: currentPatient.name, date: '2024-08-15', subjective: 'Patient reports feeling better.', objective: 'Vitals stable.', assessment: 'Improving.', plan: 'Continue current medication.' }
    ];

    const ActionButton: React.FC<{ onClick: () => void, icon: JSX.Element, text: string, loading?: boolean }> = ({ onClick, icon, text, loading }) => (
        <button onClick={onClick} disabled={loading} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white dark:bg-slate-800 rounded-lg font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm disabled:opacity-50 disabled:cursor-wait">
            {loading ? (
                <>
                    <svg className="animate-spin h-5 w-5 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Scheduling...</span>
                </>
            ) : (
                <>
                    {icon}
                    <span>{text}</span>
                </>
            )}
        </button>
    );

    return (
        <div className="space-y-6">
            <header className="flex items-center justify-between">
                <button onClick={onBack} className="flex items-center text-teal-600 dark:text-teal-500 font-semibold hover:underline">
                    &lt; Back to All Patients
                </button>
                <button onClick={() => setIsEditModalOpen(true)} className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 shadow-sm">
                    Edit Patient
                </button>
            </header>

            <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <img src={currentPatient.avatar} alt={currentPatient.name} className="w-32 h-32 rounded-full border-4 border-teal-200 dark:border-teal-800" />
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{currentPatient.name}</h1>
                        <p className="text-slate-500 dark:text-slate-400">{currentPatient.age}, {currentPatient.gender}</p>
                        <div className="mt-2 flex items-center justify-center sm:justify-start gap-4 text-sm text-slate-600 dark:text-slate-300">
                            <span>{ICONS.PHONE} {currentPatient.contact}</span>
                            <span>|</span>
                            <span>{currentPatient.email}</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="flex flex-col sm:flex-row gap-4">
                <ActionButton icon={ICONS.SOAP_NOTE} text="Create SOAP Note" onClick={() => onNavigate('SOAP Note')} />
                <ActionButton icon={ICONS.PRESCRIPTION} text="Add Prescription" onClick={() => onNavigate('Prescription')} />
                <ActionButton icon={ICONS.AI_ASSISTANT} text="Schedule AI Notifications" onClick={handleScheduleNotifications} loading={isScheduling} />
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    {currentPatient.healthMetrics && currentPatient.healthMetrics.length > 0 && (
                        <PersonalHealth metrics={currentPatient.healthMetrics} />
                    )}
                    <PatientPrescriptions prescriptions={patientPrescriptions} />
                    <PatientLabReports reports={currentPatient.labReports} onAdd={() => setIsLabReportModalOpen(true)} />
                    <PatientSOAPNotes notes={soapNotes} />
                </div>
                <div className="space-y-6">
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                        <h2 className="text-lg font-bold mb-3 text-slate-800 dark:text-slate-100">Allergies</h2>
                        {currentPatient.allergies.length > 0 ? (
                            <ul className="list-disc list-inside text-red-600 dark:text-red-500">
                                {currentPatient.allergies.map(allergy => <li key={allergy}>{allergy}</li>)}
                            </ul>
                        ) : <p className="text-slate-500 dark:text-slate-400">No known allergies.</p>}
                    </section>
                    <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                        <div className="flex justify-between items-center mb-3">
                            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Medical History</h2>
                            <button onClick={() => setIsHistoryModalOpen(true)} className="text-sm font-semibold text-teal-600 dark:text-teal-500 hover:underline">+ Add</button>
                        </div>
                        <ul className="space-y-2">
                            {currentPatient.medicalHistory.map(item => (
                                <li key={item.date} className="text-sm p-2 bg-slate-50 dark:bg-slate-700 rounded">
                                    <p className="font-semibold text-slate-800 dark:text-slate-200">{item.date}</p>
                                    <p className="text-slate-600 dark:text-slate-300">{item.note}</p>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>

            {isEditModalOpen && <EditPatientModal patient={currentPatient} onSave={handleSavePatient} onClose={() => setIsEditModalOpen(false)} />}
            {isHistoryModalOpen && <AddHistoryModal onSave={handleAddHistory} onClose={() => setIsHistoryModalOpen(false)} />}
            {isScheduleModalOpen && <NotificationScheduleModal schedule={notificationSchedule} patientName={currentPatient.name} onClose={() => setIsScheduleModalOpen(false)} />}
            {isLabReportModalOpen && <AddLabReportModal onSave={handleAddLabReport} onClose={() => setIsLabReportModalOpen(false)} />}
        </div>
    );
};

export default PatientDetail;