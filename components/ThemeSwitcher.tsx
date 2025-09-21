import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';

interface ThemeSwitcherProps {
    theme: string;
    setTheme: (theme: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
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
    
    const options = [
        { name: 'Light', value: 'light', icon: ICONS.THEME_LIGHT },
        { name: 'Dark', value: 'dark', icon: ICONS.THEME_DARK },
        { name: 'System', value: 'system', icon: ICONS.THEME_SYSTEM },
    ];

    const currentOption = options.find(opt => opt.value === theme) || options[2];

    const handleSelect = (value: string) => {
        setTheme(value);
        setIsOpen(false);
    };

    return (
        <div className="relative" ref={wrapperRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                aria-label={`Current theme: ${currentOption.name}. Change theme.`}
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                {React.cloneElement(currentOption.icon, { className: "h-6 w-6"})}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-slate-800 rounded-lg shadow-xl z-10 border border-slate-200 dark:border-slate-700">
                    <ul>
                        {options.map(option => (
                            <li key={option.value}>
                                <button
                                    onClick={() => handleSelect(option.value)}
                                    className={`w-full flex items-center px-4 py-2 text-sm text-left text-slate-700 dark:text-slate-300 hover:bg-teal-50 dark:hover:bg-slate-700 ${theme === option.value ? 'font-semibold text-teal-600 dark:text-teal-500' : ''}`}
                                >
                                    <span className="mr-3">{React.cloneElement(option.icon, { className: "h-5 w-5"})}</span>
                                    <span>{option.name}</span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ThemeSwitcher;
