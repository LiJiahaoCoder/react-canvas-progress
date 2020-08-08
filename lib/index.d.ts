import React from 'react';
export interface Props {
    percentage: number;
    text?: string;
    font?: string;
    fontSize?: number;
    fontColor?: string;
    withBaseProgressColor?: boolean;
    baseProgressColor?: string;
    progressColor?: string;
    startAngle?: number;
    endAngle?: number;
    speed?: number;
    animation?: boolean;
    width?: number;
    height?: number;
    lineWidth?: number;
    unit?: 'px' | 'vw';
    bgColor?: string;
    style?: React.CSSProperties;
    className?: string;
}
declare const ReactCanvasProcessor: React.FC<Props>;
export default ReactCanvasProcessor;
