import { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface LoadingContextType {
    isLoading: boolean;
    isContentReady: boolean;
    progress: number;
    setProgress: (progress: number) => void;
    completeLoading: () => void;
    startLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [isLoading, setIsLoading] = useState(true);
    const [isContentReady, setIsContentReady] = useState(false);
    const [progress, setProgress] = useState(0);

    const startLoading = useCallback(() => {
        setIsLoading(true);
        setIsContentReady(false);
        setProgress(0);
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
            progress,
            setProgress,
            completeLoading,
            startLoading
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
