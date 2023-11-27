import {IEditorFigure, IEditorFigureBase, IEditorFigureType} from '../../contract';
import {Editor} from '../../_root';

export abstract class BaseFigure implements IEditorFigure {

  id: any;
  type: IEditorFigureType;
  editor: Editor;

  protected constructor(init: IEditorFigureBase) {
    this.id = init.id;
    this.type = init.type;
  }

  setEditor(editor: Editor): void {
    this.editor = editor;
  }

  abstract getComponent(): any;

  abstract dispose(): void ;

}
