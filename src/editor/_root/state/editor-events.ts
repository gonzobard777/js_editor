import {cell, makeObservable} from '@do-while-for-each/tree-cell';

export class EditorEvents {

  element: SVGSVGElement;

  mouseUp: MouseEvent;
  mouseMove: MouseEvent;
  mouseLeave: MouseEvent;

  get isReady() {
    return !!this.element;
  }

  constructor() {
    makeObservable(this, {
      mouseUp: cell,
      mouseMove: cell,
      mouseLeave: cell,
      element: cell,
    });
  }

  init(element: SVGSVGElement) {
    this.element = element;
    this.element.addEventListener('mouseup', this.onMouseUp);
    this.element.addEventListener('mousemove', this.onMouseMove);
    this.element.addEventListener('mouseleave', this.onMouseLeave);
  }

  onMouseUp = (event: MouseEvent) => this.mouseUp = event;
  onMouseMove = (event: MouseEvent) => this.mouseMove = event;
  onMouseLeave = (event: MouseEvent) => this.mouseLeave = event;

  dispose() {
    this.element.removeEventListener('mouseup', this.onMouseUp);
    this.element.removeEventListener('mousemove', this.onMouseMove);
    this.element.removeEventListener('mouseleave', this.onMouseLeave);
    this.element = null as any;
  }
}
