import React from 'react';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <a href="/" aria-label="SwasthyaNetram Home" className={`flex items-center space-x-2 text-xl font-bold ${className}`}>
            {/* Change the src path to this: */}
            <img src="/SwasthyaNetram.png" alt="SwasthyaNetram Logo" className="h-full w-auto" />
            
            <span className="text-slate-800 dark:text-white hidden sm:inline">SwasthyaNetram</span>
        </a>
    );
};

export default Logo;