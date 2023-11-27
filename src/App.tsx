import {useState} from 'react';
import {Editor} from './editor';

const figureId = 'map-template-area';

export function App() {

  const [editor] = useState(() => {
    const editor = new Editor(1000, 800, [
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
      {
        id: '12',
        type: 'resizable-rect',
        corners: {
          leftTop: [200, 150],
          rightTop: [400, 150],
          rightBottom: [400, 300],
          leftBottom: [200, 300],
        },
      },
    ]);

    // let {figure} = editor.getFigure<ResizableRectFigure>(figureId);
    // autorun(() => {
    //   console.log(``, figure!.state)
    // });

    return editor;
  });

  return editor.getComponent();
}
