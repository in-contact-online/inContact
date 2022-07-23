import React, { useState, useEffect } from 'react';

export const useIntersection = (element: any, rootMargin: any) => {
    const [isVisible, setState] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setState(entry.isIntersecting);
            },
            { rootMargin }
        );

        observer.observe(element.current);
    }, []);

    return isVisible;
};
