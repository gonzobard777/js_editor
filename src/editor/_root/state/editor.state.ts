import {cell, makeObservable} from '@do-while-for-each/tree-cell';
import {EditorEvents} from './editor-events';
import {IEditorFigure, IEditorInit} from '../../contract';
import {ResizableRectFigure} from '../../figures';

export class EditorState {

  figures: IEditorFigure[] = [];
  events = new EditorEvents();

  constructor(init: IEditorInit[] = []) {
    init.forEach(x => {
      switch (x.type) {
        case 'resizable-rect':
          this.addFigure(new ResizableRectFigure(x));
          break;
      }
    });
    makeObservable(this, {
      figures: cell,
    });
  }


  addFigure(figure: IEditorFigure) {
    figure.setEditorState(this);
    this.figures = [...this.figures, figure];
  }

  getFigure<T>(id: string) {
    const index = this.figures.findIndex(x => x.id === id);
    return index < 0
      ? {index}
      : {index, figure: this.figures[index] as unknown as T};
  }

  dispose() {
    this.figures.forEach(x => x.dispose());
    this.figures.length = 0;
    this.events.dispose();
  }

}
