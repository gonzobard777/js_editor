import {useCellState} from '@do-while-for-each/tree-cell-react';
import {useEffect} from 'react';
import {ResizableRectFigure} from '../controller/resizable-rect.figure';
import {Corner} from './corner/corner';
import {Line} from './line/line';

export function ResizableRectComponent({controller}: IProps) {
  const [{corners, lines}] = useCellState(() => controller.state);

  useEffect(() => () => controller.dispose(), []);

  return (
    <g>
      <g>{lines.map((line, index) => <Line key={index} line={line}/>)}</g>
      <g>{corners.map((props, index) => <Corner key={props.position} props={props}/>)}</g>
    </g>
  );
}


interface IProps {
  controller: ResizableRectFigure;
}
