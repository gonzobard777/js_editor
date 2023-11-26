import {EditorState} from '../state/editor.state';

export class EditorController {

  constructor(private editorState: EditorState) {
  }

  get state() {
    return {
      isReady: this.editorState.events.isReady,
      figures: this.editorState.figures.map(x => x.getComponent()),
    };
  }

  setContainerElement(element: SVGSVGElement) {
    this.editorState.events.init(element);
  }

  dispose() {
    this.editorState.dispose();
  }

}
