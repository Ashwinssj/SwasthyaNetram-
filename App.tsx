import React, { useState, useMemo, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIAssistant from './screens/AIAssistant';
import SOAPNote from './screens/SOAPNote';
import PrescriptionScheduler from './screens/PrescriptionScheduler';
import PersonalHealth from './screens/PersonalHealth';
import Emergency from './screens/Emergency';
import RecycleMedicine from './screens/RecycleMedicine';
import Employees from './screens/Employees';
import Payments from './screens/Payments';
import Activity from './screens/Activity';
import Patients from './screens/Patients';
import PatientDetail from './screens/PatientDetail';
import LandingPage from './screens/LandingPage';
import { Hospital, Patient, Employee, Prescription, PaymentTransaction, ActivityLog } from './types';

// Mock Data
const hospitals: Hospital[] = [
  { id: 1, name: 'General Hospital', city: 'Metropolis' },
  { id: 2, name: 'City Central', city: 'Gotham' },
  { id: 3, name: 'Unity Health', city: 'Star City' },
];

const patients: Patient[] = [
    { id: 'p1', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?u=p1', age: 45, gender: 'Male', lastVisit: '2024-08-15', status: 'Stable', contact: '555-0101', email: 'john.doe@example.com', address: '123 Maple St, Metropolis', allergies: ['Peanuts'], medicalHistory: [{ date: '2024-08-15', note: 'Annual check-up. All vitals normal.' }], healthMetrics: [
            { name: 'Heart Rate', value: '72', unit: 'bpm', trend: 'stable' },
            { name: 'Blood Pressure', value: '120/80', unit: 'mmHg', trend: 'stable' },
            { name: 'Glucose', value: '95', unit: 'mg/dL', trend: 'down' },
            { name: 'Steps', value: '8,230', unit: 'today', trend: 'up' },
        ], labReports: [
            { id: 'lr1', name: 'Lipid Panel', date: '2024-08-15', fileUrl: '/reports/lipid_panel_p1.pdf' },
            { id: 'lr2', name: 'Complete Blood Count', date: '2024-08-15', fileUrl: '/reports/cbc_p1.pdf' },
        ] },
    { id: 'p2', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?u=p2', age: 34, gender: 'Female', lastVisit: '2024-08-18', status: 'Critical', contact: '555-0102', email: 'jane.smith@example.com', address: '456 Oak Ave, Metropolis', allergies: ['Penicillin'], medicalHistory: [{ date: '2024-08-18', note: 'Admitted for observation due to high fever.' }], healthMetrics: [
            { name: 'Heart Rate', value: '105', unit: 'bpm', trend: 'up' },
            { name: 'Blood Pressure', value: '140/90', unit: 'mmHg', trend: 'up' },
            { name: 'Glucose', value: '110', unit: 'mg/dL', trend: 'stable' },
            { name: 'Steps', value: '1,102', unit: 'today', trend: 'down' },
        ], labReports: [
            { id: 'lr3', name: 'Urinalysis', date: '2024-08-18', fileUrl: '/reports/urinalysis_p2.pdf' },
        ] },
    { id: 'p3', name: 'Robert Johnson', avatar: 'https://i.pravatar.cc/150?u=p3', age: 52, gender: 'Male', lastVisit: '2024-07-20', status: 'Discharged', contact: '555-0103', email: 'robert.j@example.com', address: '789 Pine Ln, Metropolis', allergies: [], medicalHistory: [{ date: '2024-07-20', note: 'Follow-up for knee surgery. Recovery is on track.' }], healthMetrics: [
            { name: 'Heart Rate', value: '68', unit: 'bpm', trend: 'stable' },
            { name: 'Blood Pressure', value: '118/75', unit: 'mmHg', trend: 'stable' },
            { name: 'Glucose', value: '88', unit: 'mg/dL', trend: 'stable' },
            { name: 'Steps', value: '5,670', unit: 'today', trend: 'up' },
        ], labReports: [] },
];

const employees: Employee[] = [
    { id: 'e1', name: 'Dr. Emily Carter', avatar: 'https://i.pravatar.cc/150?u=e1', role: 'Cardiologist', status: 'Active' },
    { id: 'e2', name: 'Michael Chen', avatar: 'https://i.pravatar.cc/150?u=e2', role: 'Nurse', status: 'Active' },
    { id: 'e3', name: 'Dr. Sarah Lee', avatar: 'https://i.pravatar.cc/150?u=e3', role: 'Pediatrician', status: 'On Leave' },
];

const prescriptions: Prescription[] = [
    { id: 'rx1', patient: 'John Doe', drug: 'Lisinopril', dosage: '10mg', schedule: 'Once daily', status: 'Active' },
    { id: 'rx2', patient: 'Jane Smith', drug: 'Amoxicillin', dosage: '500mg', schedule: 'Twice daily', status: 'Active' },
    { id: 'rx3', patient: 'Robert Johnson', drug: 'Ibuprofen', dosage: '200mg', schedule: 'As needed for pain', status: 'Inactive' },
];

const transactions: PaymentTransaction[] = [
    { invoiceId: 'INV001', patient: 'John Doe', date: '2024-08-15', amount: 250.00, status: 'Paid' },
    { invoiceId: 'INV002', patient: 'Jane Smith', date: '2024-08-18', amount: 1250.75, status: 'Pending' },
    { invoiceId: 'INV003', patient: 'Robert Johnson', date: '2024-07-20', amount: 800.00, status: 'Paid' },
    { invoiceId: 'INV004', patient: 'Emily White', date: '2024-06-10', amount: 450.00, status: 'Overdue' },
];

const activities: ActivityLog[] = [
    { id: 'a1', user: 'Dr. Carter', action: 'updated patient file for John Doe.', timestamp: '2 hours ago', type: 'user' },
    { id: 'a2', user: 'System', action: 'generated a low-stock alert for Amoxicillin.', timestamp: '5 hours ago', type: 'system' },
    { id: 'a3', user: 'System', action: 'critical alert: Bed 3 in ICU sensor offline.', timestamp: '1 day ago', type: 'alert' },
];


const App: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [activeScreen, setActiveScreen] = useState('Dashboard');
    const [selectedHospitalId, setSelectedHospitalId] = useState(1);
    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');

    useEffect(() => {
        const root = window.document.documentElement;
        const systemThemeQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleSystemThemeChange = (e: MediaQueryListEvent) => {
            if (localStorage.getItem('theme') === 'system') {
                if (e.matches) {
                    root.classList.add('dark');
                } else {
                    root.classList.remove('dark');
                }
            }
        };

        // Apply theme on initial load
        const currentTheme = localStorage.getItem('theme') || 'system';
        if (currentTheme === 'dark' || (currentTheme === 'system' && systemThemeQuery.matches)) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }

        systemThemeQuery.addEventListener('change', handleSystemThemeChange);

        return () => {
            systemThemeQuery.removeEventListener('change', handleSystemThemeChange);
        };
    }, []);

    const handleSetTheme = (newTheme: string) => {
        const root = window.document.documentElement;
        localStorage.setItem('theme', newTheme);
        setTheme(newTheme);

        if (newTheme === 'dark') {
            root.classList.add('dark');
        } else if (newTheme === 'light') {
            root.classList.remove('dark');
        } else {
            if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                root.classList.add('dark');
            } else {
                root.classList.remove('dark');
            }
        }
    };

    const selectedHospital = useMemo(() => hospitals.find(h => h.id === selectedHospitalId), [selectedHospitalId]);

    const handleSelectPatient = (patient: Patient) => {
        setSelectedPatient(patient);
        setActiveScreen('PatientDetail');
    };

    const handleBackToPatients = () => {
        setSelectedPatient(null);
        setActiveScreen('Patients');
    }

    const handleEnterDashboard = () => {
        setIsAuthenticated(true);
        setActiveScreen('Dashboard');
    }
    
    const handleNavigateFromDetail = (screen: string) => {
        setActiveScreen(screen);
    }

    if (!isAuthenticated) {
        return <LandingPage onEnter={handleEnterDashboard} />;
    }

    const renderScreen = () => {
        if (activeScreen === 'PatientDetail' && selectedPatient) {
            return <PatientDetail patient={selectedPatient} onBack={handleBackToPatients} prescriptions={prescriptions} onNavigate={handleNavigateFromDetail} />;
        }
        switch (activeScreen) {
            case 'Dashboard': return <Dashboard />;
            case 'Patients': return <Patients patients={patients} onSelectPatient={handleSelectPatient} />;
            case 'Prescription': return <PrescriptionScheduler prescriptions={prescriptions} patient={selectedPatient} />;
            case 'SOAP Note': return <SOAPNote patient={selectedPatient} />;
            case 'AI Assistant': return <AIAssistant />;
            case 'Employees': return <Employees employees={employees} />;
            case 'Payments': return <Payments transactions={transactions} />;
            case 'Activity': return <Activity activities={activities} />;
            case 'Emergency': return <Emergency />;
            case 'Recycle Medicine': return <RecycleMedicine />;
            case 'Settings': return <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-md"><h2>Settings</h2><p>Settings will be here.</p></div>;
            case 'Logout': 
                setIsAuthenticated(false);
                return <LandingPage onEnter={handleEnterDashboard} />;
            default: return <Dashboard />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 font-sans text-slate-800 dark:text-slate-200">
            <Sidebar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
            <div className="flex-1 flex flex-col md:ml-64">
                <Header 
                    hospitals={hospitals}
                    selectedHospital={selectedHospital}
                    onHospitalChange={setSelectedHospitalId}
                    theme={theme}
                    setTheme={handleSetTheme}
                />
                <main className="flex-1 p-6 overflow-y-auto">
                    {renderScreen()}
                </main>
            </div>
        </div>
    );
};

export default App;