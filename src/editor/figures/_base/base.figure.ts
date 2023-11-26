import {IEditorFigure, IEditorFigureBase, IEditorFigureType} from '../../contract';
import {EditorState} from '../../_root';

export abstract class BaseFigure implements IEditorFigure {

  id: any;
  type: IEditorFigureType;
  editor: EditorState;

  protected constructor(init: IEditorFigureBase) {
    this.id = init.id;
    this.type = init.type;
  }

  setEditorState(editorState: EditorState): void {
    this.editor = editorState;
  }

  abstract getComponent(): any;

  abstract dispose(): void ;

}
