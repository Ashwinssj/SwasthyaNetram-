import React from 'react';

const CircularProgress: React.FC<{ percentage: number }> = ({ percentage }) => {
    const radius = 50;
    const stroke = 10;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div
          className="relative w-32 h-32"
          role="progressbar"
          aria-valuenow={percentage}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Balance progress: ${percentage}%`}
        >
            <svg height="100%" width="100%" viewBox="0 0 120 120" aria-hidden="true">
                <circle
                    className="text-slate-200 dark:text-slate-700"
                    stroke="currentColor"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius+10}
                    cy={radius+10}
                />
                <circle
                    stroke="#14b8a6"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={circumference + ' ' + circumference}
                    style={{ strokeDashoffset, strokeLinecap: 'round' }}
                    transform={`rotate(-90 ${radius+10} ${radius+10})`}
                    r={normalizedRadius}
                    cx={radius+10}
                    cy={radius+10}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-teal-600">{percentage}%</span>
            </div>
        </div>
    );
};


const BalanceWidget: React.FC = () => {
    const headingId = "balance-widget-heading";
    return (
        <section className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-md flex flex-col items-center" aria-labelledby={headingId}>
            <h2 id={headingId} className="text-lg font-bold self-start text-slate-800 dark:text-slate-100">Balance</h2>
            <CircularProgress percentage={75} />
            <p className="text-2xl font-bold mt-2 text-slate-800 dark:text-slate-100">$25,869</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Balance</p>
        </section>
    );
};

export default BalanceWidget;
