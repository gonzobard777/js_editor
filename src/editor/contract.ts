import {EditorState} from './_root';
import {IResizableRectFigureInit} from './figures';

export type IEditorFigureType = 'resizable-rect';

export interface IEditorFigureBase {
  id: any;
  type: IEditorFigureType;
}

export interface IEditorFigure extends IEditorFigureBase {

  getComponent(): any; // Компонент для рендера фигуры

  setEditorState(state: EditorState): void;

  dispose(): void;

}


export type IEditorInit = IResizableRectFigureInit;
