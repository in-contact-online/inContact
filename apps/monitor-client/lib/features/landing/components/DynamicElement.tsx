import React from 'react';
import { useIntersection } from '../hooks';
import Fade from '@mui/material/Fade';

interface DynamicElementType {
    children: JSX.Element;
    timeout: number;
    sectionRef: React.RefObject<HTMLElement>;
}

export function DynamicElement({ children, timeout, sectionRef }: DynamicElementType) {
    const intersectionRoadMap = useIntersection(sectionRef, {});
    return (
        <Fade in={intersectionRoadMap?.isIntersecting} timeout={timeout}>
            {children}
        </Fade>
    );
}
