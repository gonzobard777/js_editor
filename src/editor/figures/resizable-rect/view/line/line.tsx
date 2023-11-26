import {StraightLine} from '@do-while-for-each/math';
import s from './line.module.css';

export function Line({line}: IProps) {
  return (
    <line className={s.container}
          x1={line.p1[0]} y1={line.p1[1]}
          x2={line.p2[0]} y2={line.p2[1]}/>
  );
}

interface IProps {
  line: StraightLine;
}
