import { PI } from './utils/math';

const DEFAULT = {
  type: 'arc',
  startAngle: 5 * PI / 6,
  endAngle: PI / 6,
  unit: 'vw',
  width: 40,
  speed: 1,
  animation: true,
  lineWidth: 1,
  bgColor: '#fff',
  font: 'serif',
  fontColor: '#468af6',
  fontSize: 3,
  withBaseProgressColor: true,
  baseProgressColor: '#ddd',
  progressColor: '#468af6',
  ratio: 2, // width / height
};

export default DEFAULT;
