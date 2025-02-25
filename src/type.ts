export type Unit = 'px' | 'vw';

export interface ReactCanvasProcessorProps {
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
  unit?: Unit;
  bgColor?: string;
  style?: React.CSSProperties;
  className?: string;
  onAnimationStart?: () => void;
  onAnimationEnd?: () => void;
}
