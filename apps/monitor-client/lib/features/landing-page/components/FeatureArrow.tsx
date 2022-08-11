import React from 'react';

interface FeatureArrowType {
    className?: string;
}

export function FeatureArrow({ className }: FeatureArrowType) {
    return (
        <svg
            className={className}
            width="221"
            height="36"
            viewBox="0 0 221 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M3 16.5C2.17157 16.5 1.5 17.1716 1.5 18C1.5 18.8284 2.17157 19.5 3 19.5V16.5ZM221 18L206 9.33975V26.6603L221 18ZM3 19.5H6.02778V16.5H3V19.5ZM12.0833 19.5H18.1389V16.5H12.0833V19.5ZM24.1944 19.5H30.25V16.5H24.1944V19.5ZM36.3056 19.5H42.3611V16.5H36.3056V19.5ZM48.4167 19.5H54.4722V16.5H48.4167V19.5ZM60.5278 19.5H66.5833V16.5H60.5278V19.5ZM72.6389 19.5H78.6945V16.5H72.6389V19.5ZM84.75 19.5H90.8056V16.5H84.75V19.5ZM96.8611 19.5H102.917V16.5H96.8611V19.5ZM108.972 19.5H115.028V16.5H108.972V19.5ZM121.083 19.5H127.139V16.5H121.083V19.5ZM133.194 19.5H139.25V16.5H133.194V19.5ZM145.306 19.5H151.361V16.5H145.306V19.5ZM157.417 19.5H163.472V16.5H157.417V19.5ZM169.528 19.5H175.583V16.5H169.528V19.5ZM181.639 19.5H187.694V16.5H181.639V19.5ZM193.75 19.5H199.806V16.5H193.75V19.5ZM205.861 19.5H211.917V16.5H205.861V19.5ZM3 15C1.34315 15 0 16.3431 0 18C0 19.6569 1.34315 21 3 21V15ZM221 18L191 0.679491V35.3205L221 18ZM3 21H6.02778V15H3V21ZM12.0833 21H18.1389V15H12.0833V21ZM24.1944 21H30.25V15H24.1944V21ZM36.3056 21H42.3611V15H36.3056V21ZM48.4167 21H54.4722V15H48.4167V21ZM60.5278 21H66.5833V15H60.5278V21ZM72.6389 21H78.6945V15H72.6389V21ZM84.75 21H90.8056V15H84.75V21ZM96.8611 21H102.917V15H96.8611V21ZM108.972 21H115.028V15H108.972V21ZM121.083 21H127.139V15H121.083V21ZM133.194 21H139.25V15H133.194V21ZM145.306 21H151.361V15H145.306V21ZM157.417 21H163.472V15H157.417V21ZM169.528 21H175.583V15H169.528V21ZM181.639 21H187.694V15H181.639V21ZM193.75 21H199.806V15H193.75V21ZM205.861 21H211.917V15H205.861V21Z"
                fill="black"
            />
        </svg>
    );
}
