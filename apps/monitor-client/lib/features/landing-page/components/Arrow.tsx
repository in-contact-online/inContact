import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { useIntersection } from '../hooks';
import { Zoom } from '@mui/material';

const StyledSvg = styled('svg')({
    position: 'absolute',
    left: 48,
    top: -74,
});

interface ArrowType {
    timeout: { appear?: number; enter?: number; exit?: number };
}

export function Arrow({ timeout }: ArrowType) {
    const featureRef = useRef(null);
    const visible = useIntersection(featureRef, '0px');

    return (
        <Zoom in={visible} style={{ transitionDelay: visible ? '200ms' : '0ms' }}>
            <StyledSvg
                ref={featureRef}
                width="46"
                height="133"
                viewBox="0 0 46 133"
                fill="none"
                xmlns="http://www.w3.org/2000/StyledSvg"
            >
                <path
                    d="M21.9393 131.061C22.5251 131.646 23.4749 131.646 24.0607 131.061L33.6066 121.515C34.1924 120.929 34.1924 119.979 33.6066 119.393C33.0208 118.808 32.0711 118.808 31.4853 119.393L23 127.879L14.5147 119.393C13.9289 118.808 12.9792 118.808 12.3934 119.393C11.8076 119.979 11.8076 120.929 12.3934 121.515L21.9393 131.061ZM21.5 0V2.95455H24.5V0L21.5 0ZM21.5 8.86364V14.7727H24.5V8.86364H21.5ZM21.5 20.6818V26.5909H24.5V20.6818H21.5ZM21.5 32.5L21.5 38.4091H24.5V32.5H21.5ZM21.5 44.3182V50.2273H24.5V44.3182H21.5ZM21.5 56.1364V62.0455H24.5V56.1364H21.5ZM21.5 67.9546V73.8636H24.5V67.9546H21.5ZM21.5 79.7727L21.5 85.6818H24.5L24.5 79.7727H21.5ZM21.5 91.5909V97.5H24.5V91.5909H21.5ZM21.5 103.409V109.318H24.5V103.409H21.5ZM21.5 115.227V121.136H24.5V115.227H21.5ZM21.5 127.045V130H24.5V127.045H21.5ZM20.8787 132.121C22.0503 133.293 23.9497 133.293 25.1213 132.121L44.2132 113.029C45.3848 111.858 45.3848 109.958 44.2132 108.787C43.0416 107.615 41.1421 107.615 39.9706 108.787L23 125.757L6.02944 108.787C4.85786 107.615 2.95837 107.615 1.7868 108.787C0.615224 109.958 0.615224 111.858 1.7868 113.029L20.8787 132.121ZM20 0V2.95455H26V0L20 0ZM20 8.86364V14.7727H26V8.86364H20ZM20 20.6818V26.5909H26V20.6818H20ZM20 32.5V38.4091H26V32.5H20ZM20 44.3182V50.2273H26V44.3182H20ZM20 56.1364V62.0455H26V56.1364H20ZM20 67.9546V73.8636H26V67.9546H20ZM20 79.7727L20 85.6818H26L26 79.7727H20ZM20 91.5909V97.5H26V91.5909H20ZM20 103.409V109.318H26V103.409H20ZM20 115.227V121.136H26V115.227H20ZM20 127.045V130H26V127.045H20Z"
                    fill="black"
                />
            </StyledSvg>
        </Zoom>
    );
}

Arrow.propTypes = {
    '': PropTypes.func,
};

Arrow.defaultProps = {
    '': () => {},
};
