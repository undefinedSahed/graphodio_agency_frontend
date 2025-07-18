"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ContactContextType {
    isContactOpen: boolean;
    setIsContactOpen: (open: boolean) => void;
}

const ContactContext = createContext<ContactContextType | undefined>(undefined);

export const ContactProvider = ({ children }: { children: ReactNode }) => {
    const [isContactOpen, setIsContactOpen] = useState<boolean>(false);

    return (
        <ContactContext.Provider value={{ isContactOpen, setIsContactOpen }}>
            {children}
        </ContactContext.Provider>
    );
};

export const useContact = () => {
    const context = useContext(ContactContext);
    if (!context) {
        throw new Error('useContact must be used within a ContactProvider');
    }
    return context;
};
