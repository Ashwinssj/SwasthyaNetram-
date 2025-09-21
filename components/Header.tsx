import React, { useState, useRef, useEffect } from 'react';
import { Hospital } from '../types';
import ThemeSwitcher from './ThemeSwitcher';

interface HeaderProps {
    hospitals: Hospital[];
    selectedHospital: Hospital | undefined;
    onHospitalChange: (hospitalId: number) => void;
    theme: string;
    setTheme: (theme: string) => void;
}

const HospitalSwitcher: React.FC<Pick<HeaderProps, 'hospitals' | 'selectedHospital' | 'onHospitalChange'>> = ({ hospitals, selectedHospital, onHospitalChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);
    
    return (
        <div className="relative" ref={wrapperRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 bg-white dark:bg-slate-800 p-2 rounded-full shadow"
            >
                 <span className="font-semibold text-sm text-slate-700 dark:text-slate-200">{selectedHospital?.name}</span>
                 <svg className={`w-4 h-4 transition-transform text-slate-600 dark:text-slate-300 ${isOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl z-10 border border-slate-200 dark:border-slate-700">
                    {hospitals.map(hospital => (
                        <a 
                            key={hospital.id}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onHospitalChange(hospital.id);
                                setIsOpen(false);
                            }}
                            className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700"
                        >
                           {hospital.name}, {hospital.city}
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
};

const Header: React.FC<HeaderProps> = ({ hospitals, selectedHospital, onHospitalChange, theme, setTheme }) => {
  return (
    <header className="bg-slate-100 dark:bg-slate-900 p-4 sm:p-6 flex flex-wrap items-center justify-between">
      <div className="w-full md:w-auto mb-4 md:mb-0">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Hello, Sourav</h1>
        <p className="text-slate-500 dark:text-slate-400">
            Welcome back to <span className="font-semibold text-teal-600 dark:text-teal-500">{selectedHospital?.name}</span>
        </p>
      </div>
      <div className="w-full md:w-auto flex items-center space-x-4">
        <HospitalSwitcher 
            hospitals={hospitals} 
            selectedHospital={selectedHospital} 
            onHospitalChange={onHospitalChange}
        />
        <div className="flex items-center space-x-2">
            <button className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700" aria-label="View notifications">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V4a2 2 0 10-4 0v1.341A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
            </button>
            <ThemeSwitcher theme={theme} setTheme={setTheme} />
            <div className="flex items-center space-x-3 bg-white dark:bg-slate-800 p-1 rounded-full">
              <img
                src="https://picsum.photos/id/237/200/200"
                alt="User Sourav"
                className="h-10 w-10 rounded-full"
              />
              <div className="pr-3 hidden sm:block">
                  <p className="font-semibold text-sm text-slate-800 dark:text-slate-200">Sourav</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Admin</p>
              </div>
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
