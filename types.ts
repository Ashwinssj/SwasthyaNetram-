import React from 'react';

export interface NavItem {
  name: string;
  icon: JSX.Element;
}

export interface Hospital {
  id: number;
  name: string;
  city: string;
}

export interface SummaryData {
    title: string;
    value: string;
    percentageChange: number;
    icon: JSX.Element;
    color: string;
}

export interface ChartData {
    name: string;
    total: number;
    inpatient: number;
}

export interface RoomData {
    type: string;
    count: number;
    icon: JSX.Element;
}

export interface CalendarEvent {
    time: string;
    title: string;
    type: 'meeting' | 'procedure';
}

export interface Notification {
    title: string;
    description: string;
    time: string;
    icon: JSX.Element;
}

export interface ChatMessage {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: string;
}

export interface LabReport {
    id: string;
    name: string;
    date: string;
    fileUrl: string; // URL to the report file
}

export interface Patient {
    id: string;
    name: string;
    avatar: string;
    age: number;
    gender: 'Male' | 'Female' | 'Other';
    lastVisit: string;
    status: 'Stable' | 'Critical' | 'Discharged';
    contact: string;
    email: string;
    address: string;
    allergies: string[];
    medicalHistory: MedicalHistoryItem[];
    healthMetrics: HealthMetric[];
    labReports: LabReport[];
}

export interface MedicalHistoryItem {
    date: string;
    note: string;
}

export interface SOAPNote {
    id: string;
    patientName: string;
    date: string;
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
}

export interface Prescription {
    id: string;
    patient: string;
    drug: string;
    dosage: string;
    schedule: string;
    status: 'Active' | 'Inactive';
}

export interface HealthMetric {
    name: string;
    value: string;
    unit: string;
    trend: 'up' | 'down' | 'stable';
}

export interface RecycledMedicine {
    id: string;
    name: string;
    patient: string;
    date: string;
    status: 'Pending' | 'Processed';
}

export interface Employee {
    id: string;
    name: string;
    avatar: string;
    role: string;
    status: 'Active' | 'On Leave';
}

export interface PaymentTransaction {
    invoiceId: string;
    patient: string;
    date: string;
    amount: number;
    status: 'Paid' | 'Pending' | 'Overdue';
}

export interface ActivityLog {
    id: string;
    user: string;
    action: string;
    timestamp: string;
    type: 'user' | 'system' | 'alert';
}

export interface NotificationScheduleItem {
    drug_name: string;
    time_of_day: string;
    message_content: string;
}