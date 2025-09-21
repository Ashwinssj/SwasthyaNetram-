import React from 'react';
import { Employee } from '../types';

interface EmployeesProps {
    employees: Employee[];
}

const EmployeeCard: React.FC<{ employee: Employee }> = ({ employee }) => {
    const statusClass = employee.status === 'Active' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform">
            <img src={employee.avatar} alt={employee.name} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-slate-100 dark:border-slate-700" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">{employee.name}</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm">{employee.role}</p>
            <span className={`mt-3 inline-block px-3 py-1 text-xs font-semibold rounded-full ${statusClass}`}>
                {employee.status}
            </span>
            <div className="mt-4 flex justify-center space-x-2">
                <button className="text-sm font-medium text-teal-600 dark:text-teal-500 hover:underline">View Profile</button>
                <button className="text-sm font-medium text-slate-500 dark:text-slate-400 hover:underline">Edit</button>
            </div>
        </div>
    );
};

const Employees: React.FC<EmployeesProps> = ({ employees }) => {
    const headingId = "employees-heading";
    return (
        <section aria-labelledby={headingId}>
            <header className="flex flex-wrap justify-between items-center mb-6 gap-4">
                <div>
                    <h1 id={headingId} className="text-2xl font-bold text-slate-800 dark:text-slate-100">Employee Management</h1>
                    <p className="text-slate-500 dark:text-slate-400">Search, view, and manage hospital staff.</p>
                </div>
                 <div className="flex items-center space-x-4">
                     <input type="text" placeholder="Search employees..." className="px-4 py-2 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400" />
                    <button className="px-4 py-2 bg-teal-500 text-white rounded-lg font-semibold hover:bg-teal-600 shadow-sm">
                        + Add Employee
                    </button>
                </div>
            </header>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {employees.map(emp => <EmployeeCard key={emp.id} employee={emp} />)}
            </div>
        </section>
    );
};

export default Employees;
