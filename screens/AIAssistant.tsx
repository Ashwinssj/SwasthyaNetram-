import { GoogleGenAI } from "@google/genai";
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants';
import { ChatMessage } from '../types';

const AIAssistant: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: 1, text: "Hello! I'm HealthBot. Ask me about patient summaries, bed availability, or staff schedules.", sender: 'ai', timestamp: new Date().toLocaleTimeString() }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const headingId = "ai-assistant-heading";
    
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            text: input,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            // FIX: Initialize GoogleGenAI with apiKey from environment variables.
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });
            // FIX: Use the correct model name 'gemini-2.5-flash'.
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                // FIX: Pass the user's input in the `contents` property.
                contents: currentInput,
            });

            const aiMessage: ChatMessage = {
                id: Date.now() + 1,
                // FIX: Extract text directly from response.text property.
                text: response.text,
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: ChatMessage = {
                id: Date.now() + 1,
                text: "Sorry, I encountered an error. Please try again.",
                sender: 'ai',
                timestamp: new Date().toLocaleTimeString()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section aria-labelledby={headingId} className="flex flex-col h-[calc(100vh-10rem)] bg-white dark:bg-slate-800 rounded-2xl shadow-md">
            <header className="p-4 border-b border-slate-200 dark:border-slate-700">
                <h1 id={headingId} className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center">
                    {React.cloneElement(ICONS.AI_ASSISTANT, { className: "h-6 w-6 mr-3 text-teal-500"})}
                    AI Assistant
                </h1>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                       {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AI</div>}
                        <div className={`max-w-md p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-teal-500 text-white rounded-br-none' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none'}`}>
                            <p>{msg.text}</p>
                            <p className="text-xs opacity-70 mt-1 text-right">{msg.timestamp}</p>
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">AI</div>
                        <div className="max-w-md p-3 rounded-2xl bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-bl-none">
                            <div className="flex items-center space-x-1">
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="h-2 w-2 bg-slate-400 rounded-full animate-bounce"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <footer className="p-4 border-t border-slate-200 dark:border-slate-700">
                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about patients, schedules, or reports..."
                        className="w-full p-3 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-400"
                        disabled={isLoading}
                    />
                    <button type="submit" className="px-4 py-3 bg-teal-500 text-white rounded-xl font-semibold hover:bg-teal-600 disabled:bg-slate-400 transition-colors" disabled={isLoading}>
                        Send
                    </button>
                </form>
            </footer>
        </section>
    );
};

export default AIAssistant;
