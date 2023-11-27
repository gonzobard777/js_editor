import {cell, makeObservable} from '@do-while-for-each/tree-cell';
import {randomIntFromRange} from '@do-while-for-each/common';
import {EditorComponent} from './view/editor.component';
import {IEditorFigure, IEditorInit} from '../contract';
import {ResizableRectFigure} from '../figures';
import {EditorEvents} from './editor-events';

export class Editor {

  figures: IEditorFigure[] = [];
  events = new EditorEvents();

  get isReady() {
    return this.events.isReady;
  }

  private component: any;

  constructor(public width: number,
              public height: number,
              init: IEditorInit[] = []) {
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
    figure.setEditor(this);
    this.figures = [...this.figures, figure];
  }

  getFigure<T>(id: string) {
    const index = this.figures.findIndex(x => x.id === id);
    return index < 0
      ? {index}
      : {index, figure: this.figures[index] as unknown as T};
  }


//region View

  get renderState() {
    return {
      width: this.width,
      height: this.height,
      isReady: this.isReady,
      figures: this.figures.map(x => x.getComponent()),
    };
  }

  getComponent() {
    if (!this.component) {
      this.component = <EditorComponent key={randomIntFromRange(1, 10_000)} editor={this}/>;
    }
    return this.component;
  }

  setElement(element: SVGSVGElement) {
    this.events.init(element);
  }

//endregion View


  dispose() {
    this.figures.forEach(x => x.dispose());
    this.figures.length = 0;
    this.events.dispose();

    this.component = null;
  }

}
