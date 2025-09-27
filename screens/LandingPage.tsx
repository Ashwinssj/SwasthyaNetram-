import React from 'react';
import { ICONS } from '../constants';
import Logo from '../components/Logo';

interface LandingPageProps {
  onEnter: () => void;
}

const FeatureCard: React.FC<{ icon: JSX.Element, title: string, description: string }> = ({ icon, title, description }) => (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl text-center border border-white/20">
        <div className="flex justify-center items-center h-16 w-16 bg-teal-400/20 rounded-full mx-auto mb-4">
            <div className="text-teal-300 text-3xl">{icon}</div>
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-300">{description}</p>
    </div>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans">
      <div className="absolute inset-0 bg-grid-slate-800 [mask-image:linear-gradient(to_bottom,white_0%,transparent_100%)]"></div>
      
      <main className="container mx-auto px-6 py-12 relative z-10">
        <header className="flex justify-between items-center py-4">
             <Logo className="h-10" />
            <button onClick={onEnter} className="hidden md:inline-block px-6 py-2 border border-teal-400 text-teal-400 rounded-full font-semibold hover:bg-teal-400 hover:text-slate-900 transition-colors">
                Login
            </button>
        </header>

        <section className="text-center py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
            SwasthyaNetram
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Your Health, Our Vision
          </p>
          <button
            onClick={onEnter}
            className="px-8 py-4 bg-teal-500 text-white rounded-full font-bold text-lg shadow-lg shadow-teal-500/30 hover:bg-teal-600 transition-all transform hover:scale-105"
          >
            Enter Dashboard
          </button>
        </section>

        <section className="py-16">
          <h2 className="text-3xl font-bold text-center mb-12">All-in-One Healthcare Solution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard icon={ICONS.DASHBOARD} title="Unified Home" description="At-a-glance view of all critical hospital metrics in one place." />
            <FeatureCard icon={ICONS.AI_ASSISTANT} title="AI Assistant" description="Get instant insights and support with our integrated AI chatbot." />
            <FeatureCard icon={ICONS.PRESCRIPTION} title="Effortless Scheduling" description="Manage patient appointments and prescriptions with ease." />
            <FeatureCard icon={ICONS.SOAP_NOTE} title="Digital SOAP Notes" description="Create, store, and access patient notes securely and efficiently." />
            <FeatureCard icon={ICONS.EMERGENCY} title="Emergency Ready" description="Instant access to emergency protocols and contact information." />
            <FeatureCard icon={ICONS.PERSONAL_HEALTH} title="Patient Health Hub" description="Empower patients with access to their personal health data." />
          </div>
        </section>
      </main>
      
      <footer className="text-center py-8 text-slate-400 relative z-10 border-t border-slate-800">
        <p>&copy; {new Date().getFullYear()} SwasthyaNetram. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;