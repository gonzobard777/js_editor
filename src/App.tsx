import {autorun} from '@do-while-for-each/tree-cell';
import {useState} from 'react';
import {EditorComponent, EditorState} from './editor';
import {ResizableRectFigure} from './editor/figures';

const figureId = 'map-template-area';

export function App() {

  const [editorState] = useState(() => {
    const editorState = new EditorState([
      {
        id: figureId,
        type: 'resizable-rect',
        corners: {
          leftTop: [300, 200],
          rightTop: [500, 200],
          rightBottom: [500, 400],
          leftBottom: [300, 400],
        },
      },
    ]);

    let {figure} = editorState.getFigure<ResizableRectFigure>(figureId);
    autorun(() => {
      // console.log(``, figure!.state)
    });

    return editorState;
  });

  return (
    <EditorComponent width={1000} height={800} editorState={editorState}/>
  );
}
