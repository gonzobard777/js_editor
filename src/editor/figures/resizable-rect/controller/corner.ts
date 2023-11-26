import {ICornerPointPosition, IPoint} from '@do-while-for-each/math';
import {cell, makeObservable} from '@do-while-for-each/tree-cell';
import {ResizableRectFigure} from './resizable-rect.figure';
import {ICornerData} from '../contract';

/**
 * Угловая точка прямоугольника.
 */
export class Corner {

  element: SVGCircleElement;

  isMoving = false;
  isHovered = false;

  constructor(public readonly position: ICornerPointPosition,
              public point: IPoint,
              private resizableRect: ResizableRectFigure) {
    makeObservable(this, {
      point: cell,
      isMoving: cell,
      isHovered: cell,
    });
  }

  get state(): ICornerData {
    return {
      position: this.position,
      point: this.point,
      isHovered: this.isMoving || this.isHovered,
      isMoving: this.isMoving,
      setElement: this.setElement,
    };
  }

  setElement = (element: SVGCircleElement) => {
    this.element = element;
    this.element.addEventListener('mouseenter', this.onMouseEnter);
    this.element.addEventListener('mouseleave', this.onMouseLeave);
    this.element.addEventListener('mousedown', this.onMouseDown);
  };

  onMouseEnter = (event: MouseEvent) => {
    this.isHovered = true;
  };

  onMouseLeave = (event: MouseEvent) => {
    this.isHovered = false;
  };

  onMouseDown = (event: MouseEvent) => {
    this.resizableRect.onMouseDownOnCorner([event.pageX, event.pageY], this.position);
  };


  dispose() {
    if (this.element) {
      this.element.removeEventListener('mouseenter', this.onMouseEnter);
      this.element.removeEventListener('mouseleave', this.onMouseLeave);
      this.element.removeEventListener('mousedown', this.onMouseDown);
      this.element = null as any;
    }
  }
}
