import React from 'react';
// FIX: Corrected import path for constants
import { ICONS } from '../constants';

const EmergencyAction: React.FC<{ icon: JSX.Element, title: string, description: string, bgColor: string }> = ({ icon, title, description, bgColor }) => (
    <button className={`w-full text-left p-6 rounded-2xl shadow-lg transition-transform transform hover:scale-105 ${bgColor}`}>
        <div className="flex items-center">
            <div className="text-4xl mr-4">{icon}</div>
            <div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="opacity-90">{description}</p>
            </div>
        </div>
    </button>
);

const Emergency: React.FC = () => {
  const headingId = "emergency-heading";
  return (
    <section aria-labelledby={headingId} className="bg-red-50 dark:bg-red-900/20 p-6 rounded-2xl shadow-md border-2 border-red-200 dark:border-red-500/30">
      <header className="text-center mb-8">
        <div className="flex justify-center items-center text-red-600 dark:text-red-400 mb-2">
            {React.cloneElement(ICONS.EMERGENCY, { className: "h-12 w-12" })}
        </div>
        <h1 id={headingId} className="text-3xl font-extrabold text-red-800 dark:text-red-200">Emergency Center</h1>
        <p className="text-red-600 dark:text-red-300">Access critical information and actions immediately.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <EmergencyAction
            icon={ICONS.PHONE}
            title="Call 911"
            description="Immediately contact emergency services."
            bgColor="bg-red-500 text-white"
          />
          <EmergencyAction
            icon={ICONS.EMPLOYEE}
            title="Alert On-Call Doctor"
            description="Notify the doctor on duty of the situation."
            bgColor="bg-amber-500 text-white"
          />
      </div>

      <div>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Emergency Contacts</h2>
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm">
              <ul className="divide-y divide-slate-200 dark:divide-slate-700">
                  <li className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Dr. Emily Carter (Cardiology)</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">On-call specialist</p>
                      </div>
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600">Call</button>
                  </li>
                   <li className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Hospital Security</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Internal security team</p>
                      </div>
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600">Call</button>
                  </li>
                  <li className="p-4 flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-800 dark:text-slate-200">Facility Manager</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">For structural emergencies</p>
                      </div>
                      <button className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-600">Call</button>
                  </li>
              </ul>
          </div>
      </div>
    </section>
  );
};

export default Emergency;