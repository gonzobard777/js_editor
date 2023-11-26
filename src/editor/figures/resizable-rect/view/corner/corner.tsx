import {useEffect, useRef} from 'react';
import cn from 'classnames';
import {ICornerData} from '../../contract';
import s from './corner.module.css';

export function Corner({props}: IProps) {
  const containerRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    props.setElement(containerRef.current!);
  }, []);

  return (
    <circle className={cn(
      s.container,
      {
        [s.isHovered]: props.isHovered,
        [s.isMoving]: props.isMoving,
      }
    )}
            cx={props.point[0]}
            cy={props.point[1]}
            r={4.5}
            ref={containerRef}/>
  );
}

interface IProps {
  props: ICornerData;
}
