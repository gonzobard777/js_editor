import {IResizableRectFigureInit} from './figures';
import {Editor} from './_root';

export type IEditorFigureType = 'resizable-rect';

export interface IEditorFigureBase {
  id: any;
  type: IEditorFigureType;
}

export interface IEditorFigure extends IEditorFigureBase {

  getComponent(): any; // Компонент для рендера фигуры

  setEditor(state: Editor): void;

  dispose(): void;

}


export type IEditorInit = IResizableRectFigureInit;
