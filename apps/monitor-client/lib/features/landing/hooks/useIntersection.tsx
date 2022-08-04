import React, { useState, useEffect, RefObject } from 'react';

export const useIntersection = (element: RefObject<any>, rootMargin: string) => {
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
