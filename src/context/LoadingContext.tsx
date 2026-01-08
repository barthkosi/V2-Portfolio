import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    isContentReady: boolean;
    completeLoading: () => void;
    startLoading: () => void;
    addBlocker: (key: string) => void;
    removeBlocker: (key: string) => void;
    isBlocked: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentReady, setIsContentReady] = useState(false);
    const [activeBlockers, setActiveBlockers] = useState<Set<string>>(new Set());

    const startLoading = useCallback(() => {
        setIsLoading(true);
        setIsContentReady(false);
    }, []);

    const addBlocker = useCallback((key: string) => {
        setActiveBlockers(prev => {
            const newSet = new Set(prev);
            newSet.add(key);
            return newSet;
        });
    }, []);

    const removeBlocker = useCallback((key: string) => {
        setActiveBlockers(prev => {
            const newSet = new Set(prev);
            newSet.delete(key);
            return newSet;
        });
    }, []);

    const completeLoading = useCallback(() => {
        setIsLoading(false);
        // Delay before content animations can start
        setTimeout(() => {
            setIsContentReady(true);
        }, 300);
    }, []);

    return (
        <LoadingContext.Provider value={{
            isLoading,
            isContentReady,
            completeLoading,
            startLoading,
            addBlocker,
            removeBlocker,
            isBlocked: activeBlockers.size > 0
        }}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (context === undefined) {
        throw new Error('useLoading must be used within a LoadingProvider');
    }
    return context;
}
