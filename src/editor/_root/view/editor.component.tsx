import {useCellState} from '@do-while-for-each/tree-cell-react';
import {useEffect, useRef} from 'react';
import s from './editor.module.css';
import {Editor} from '../editor';

/**
 * У редактора должен быть:
 *   • корневой элемент и контроллер, обслуживающий его
 *   • состояние, расшаренное между внутренними частями
 */
export function EditorComponent({editor}: IProps) {
  const containerRef = useRef<SVGSVGElement>(null);
  const [{isReady, figures, width, height}] = useCellState(() => editor.renderState);

  useEffect(() => {
    editor.setElement(containerRef.current!);
    return () => editor.dispose();
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
  editor: Editor;
}
