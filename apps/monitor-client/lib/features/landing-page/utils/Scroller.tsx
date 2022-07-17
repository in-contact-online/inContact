import React from 'react';

export function Scroller({ className, children, trackIds, onScrollToElement }: any) {
    return (
        <div
            className={className}
            onScroll={(e) => {
                for (let i = 0; i <= trackIds.length - 1; i++) {
                    const id = trackIds[i];
                    const trackedEl = document.getElementById(id);
                    const scrollerEl = e.currentTarget;

                    if (
                        trackedEl &&
                        scrollerEl.scrollTop > trackedEl.offsetTop + trackedEl.offsetHeight - scrollerEl.offsetHeight
                    ) {
                        onScrollToElement(trackedEl);
                    }
                }
            }}
        >
            {children}
        </div>
    );
}
