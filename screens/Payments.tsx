import React from 'react';
import { PaymentTransaction } from '../types';
import { ICONS } from '../constants';

interface PaymentsProps {
    transactions: PaymentTransaction[];
}

const PaymentSummaryCard: React.FC<{ title: string, amount: string, icon: JSX.Element, color: string }> = ({ title, amount, icon, color }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">{amount}</p>
            </div>
            <div className={`text-3xl p-3 rounded-full bg-opacity-20 ${color}`}>
                {icon}
            </div>
        </div>
    </div>
);

const Payments: React.FC<PaymentsProps> = ({ transactions }) => {
    const headingId = "payments-heading";

    const getStatusClass = (status: 'Paid' | 'Pending' | 'Overdue') => {
        if (status === 'Paid') return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
        if (status === 'Pending') return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300';
        return 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300';
    };
    
    const totalRevenue = transactions.filter(tx => tx.status === 'Paid').reduce((acc, tx) => acc + tx.amount, 0);
    const pendingPayments = transactions.filter(tx => tx.status === 'Pending').reduce((acc, tx) => acc + tx.amount, 0);
    const overduePayments = transactions.filter(tx => tx.status === 'Overdue').reduce((acc, tx) => acc + tx.amount, 0);


    return (
        <section aria-labelledby={headingId}>
            <header className="mb-6">
                <h1 id={headingId} className="text-2xl font-bold text-slate-800 dark:text-slate-100">Payments & Billing</h1>
                <p className="text-slate-500 dark:text-slate-400">Track all financial transactions.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <PaymentSummaryCard title="Total Revenue" amount={`$${totalRevenue.toFixed(2)}`} icon={ICONS.PAYMENTS} color="text-green-500 bg-green-100" />
                <PaymentSummaryCard title="Pending Payments" amount={`$${pendingPayments.toFixed(2)}`} icon={ICONS.ACTIVITY} color="text-amber-500 bg-amber-100" />
                <PaymentSummaryCard title="Overdue" amount={`$${overduePayments.toFixed(2)}`} icon={ICONS.EMERGENCY} color="text-red-500 bg-red-100" />
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md">
                <div className="flex justify-between items-center mb-4">
                     <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Transaction History</h2>
                     <button className="px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">Export CSV</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-700">
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Invoice ID</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Patient</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 hidden md:table-cell">Date</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 hidden lg:table-cell">Amount</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">Status</th>
                                <th className="p-3 font-semibold text-slate-600 dark:text-slate-400"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map(tx => (
                                <tr key={tx.invoiceId} className="border-b hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700">
                                    <td className="p-3 font-mono text-sm text-slate-500 dark:text-slate-400">{tx.invoiceId}</td>
                                    <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{tx.patient}</td>
                                    <td className="p-3 text-slate-600 dark:text-slate-300 hidden md:table-cell">{tx.date}</td>
                                    <td className="p-3 font-medium text-slate-800 dark:text-slate-100 hidden lg:table-cell">${tx.amount.toFixed(2)}</td>
                                    <td className="p-3">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusClass(tx.status)}`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="p-3 text-right">
                                        <button className="text-teal-600 dark:text-teal-500 hover:underline font-medium">Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default Payments;
