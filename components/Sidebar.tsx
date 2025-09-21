import React, { useState } from 'react';
import { NAV_ITEMS, NAV_ITEMS_UTILITY, ICONS } from '../constants';
import { NavItem } from '../types';
import Logo from './Logo';

interface NavLinkProps {
  item: NavItem;
  isActive: boolean;
  onClick: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, isActive, onClick }) => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
            onClick();
        }
    };

    return (
        <li
            onClick={onClick}
            onKeyDown={handleKeyDown}
            role="link"
            tabIndex={0}
            aria-current={isActive ? 'page' : undefined}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 ${isActive ? 'bg-teal-500 text-white shadow-lg' : 'text-slate-500 dark:text-slate-400 hover:bg-teal-50 dark:hover:bg-slate-700 hover:text-teal-600 dark:hover:text-teal-500'}`}
        >
            <span className="mr-4">{item.icon}</span>
            <span className="font-medium">{item.name}</span>
        </li>
    );
};


interface SidebarProps {
    activeScreen: string;
    setActiveScreen: (screen: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeScreen, setActiveScreen }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigation = (screen: string) => {
      setActiveScreen(screen);
      setIsOpen(false);
    };

    return (
        <>
            <button
                className="fixed top-4 left-4 z-30 md:hidden bg-white dark:bg-slate-800 p-2 rounded-md shadow-lg text-slate-600 dark:text-slate-300"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle navigation"
                aria-controls="sidebar-nav"
                aria-expanded={isOpen}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                </svg>
            </button>
            <aside id="sidebar-nav" className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-slate-800 shadow-xl z-20 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out flex flex-col`}>
                <div className="p-6">
                    <div className="flex items-center mb-10" tabIndex={-1}>
                        <Logo textClassName="text-xl text-slate-800 dark:text-slate-100" />
                    </div>
                    <nav aria-label="Main navigation">
                        <ul>
                            {NAV_ITEMS.map((item) => (
                                <NavLink
                                    key={item.name}
                                    item={item}
                                    isActive={activeScreen === item.name}
                                    onClick={() => handleNavigation(item.name)}
                                />
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="mt-auto p-6">
                    <nav aria-label="Utility navigation">
                        <ul>
                           {NAV_ITEMS_UTILITY.map((item) => (
                                <NavLink
                                    key={item.name}
                                    item={item}
                                    isActive={activeScreen === item.name}
                                    onClick={() => handleNavigation(item.name)}
                                />
                            ))}
                        </ul>
                    </nav>
                     <button className="w-full flex items-center justify-center mt-4 p-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors" aria-label="Generate a new report">
                        {ICONS.REPORT}
                        <span className="ml-3 font-semibold text-slate-700 dark:text-slate-200">Report</span>
                    </button>
                </div>
            </aside>
             {isOpen && <div className="fixed inset-0 bg-black opacity-50 z-10 md:hidden" onClick={() => setIsOpen(false)}></div>}
        </>
    );
};

export default Sidebar;