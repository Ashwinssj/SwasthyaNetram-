
import React from 'react';
import SummaryCard from './SummaryCard';
import PatientStatisticsChart from './PatientStatisticsChart';
import BalanceWidget from './BalanceWidget';
import IncomeWidget from './IncomeWidget';
import RoomOccupancyWidget from './RoomOccupancyWidget';
import CalendarWidget from './CalendarWidget';
import NotificationsWidget from './NotificationsWidget';
// FIX: Corrected import path for constants
import { ICONS } from '../constants';
// FIX: Corrected import path for types
import { SummaryData } from '../types';

const summaryData: SummaryData[] = [
    { title: 'Appointments', value: '1,240', percentageChange: 12.5, icon: ICONS.APPOINTMENTS, color: 'text-sky-500' },
    { title: 'Call Consultancy', value: '320', percentageChange: -5.2, icon: ICONS.PHONE, color: 'text-orange-500' },
    { title: 'Surgeries', value: '84', percentageChange: 20.0, icon: ICONS.SURGERY, color: 'text-red-500' },
    { title: 'Total Patients', value: '1,500', percentageChange: 8.7, icon: ICONS.PATIENTS, color: 'text-green-500' },
];

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {summaryData.map(data => (
                    <SummaryCard key={data.title} data={data} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <PatientStatisticsChart />
                </div>
                <div className="space-y-6">
                    <BalanceWidget />
                    <IncomeWidget />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <RoomOccupancyWidget />
                <CalendarWidget />
                <NotificationsWidget />
            </div>
        </div>
    );
};

export default Dashboard;
