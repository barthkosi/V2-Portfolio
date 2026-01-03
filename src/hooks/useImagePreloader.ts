import { useState, useEffect, useCallback } from 'react';

export function useImagePreloader(imageUrls: string[]) {
    const [progress, setProgress] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [loadKey, setLoadKey] = useState(0);

    const reset = useCallback(() => {
        setProgress(0);
        setIsComplete(false);
        setLoadKey(prev => prev + 1);
    }, []);

    useEffect(() => {
        // Reset state at the start
        setProgress(0);
        setIsComplete(false);

        if (imageUrls.length === 0) {
            setProgress(100);
            setIsComplete(true);
            return;
        }

        let loadedCount = 0;
        const totalImages = imageUrls.length;
        let isCancelled = false;

        const updateProgress = () => {
            if (isCancelled) return;
            loadedCount++;
            const newProgress = Math.round((loadedCount / totalImages) * 100);
            setProgress(newProgress);

            if (loadedCount === totalImages) {
                setIsComplete(true);
            }
        };

        // Use requestAnimationFrame to batch cached image updates
        let cachedCount = 0;

        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;

            if (img.complete) {
                // Image is already cached - count it
                cachedCount++;
            } else {
                img.onload = updateProgress;
                img.onerror = updateProgress; // Count errors as "loaded" to not block
            }
        });

        // Process cached images in one batch after a microtask
        if (cachedCount > 0) {
            Promise.resolve().then(() => {
                if (isCancelled) return;
                loadedCount = cachedCount;
                const newProgress = Math.round((loadedCount / totalImages) * 100);
                setProgress(newProgress);
                if (loadedCount === totalImages) {
                    setIsComplete(true);
                }
            });
        }

        return () => {
            isCancelled = true;
        };
    }, [imageUrls, loadKey]);

    return { progress, isComplete, reset };
}
