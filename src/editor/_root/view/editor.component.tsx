import {useCellState} from '@do-while-for-each/tree-cell-react';
import {useEffect, useRef, useState} from 'react';
import {EditorController} from '../controller/editor.controller';
import s from './editor.module.css';
import {EditorState} from '../state/editor.state';

/**
 * У редактора должен быть:
 *   • корневой элемент и контроллер, обслуживающий его
 *   • состояние, расшаренное между внутренними частями
 */
export function EditorComponent({width, height, editorState}: IProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [controller] = useState(() => new EditorController(editorState));
  const [{isReady, figures}] = useCellState(() => controller.state);

  useEffect(() => {
    controller.setContainerElement(containerRef.current!);
    return () => controller.dispose();
  }, []);

  return (
    <svg className={s.container}
         width={width} height={height} viewBox={`0 0 ${width} ${height}`}
         ref={containerRef}>
      {isReady ? figures : null}
    </svg>
  );
}


interface IProps {
  width: number;
  height: number;
  editorState: EditorState;
}
