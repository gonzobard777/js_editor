import {ICornerPointPosition, IPoint, IStraightLineOpt, Matrix, Point, StraightLine} from '@do-while-for-each/math';
import {autorun, createDisposeManager} from '@do-while-for-each/tree-cell';
import {ResizableRectComponent} from '../view/resizable-rect.component';
import {CornerMoveHandler} from './corner-move-handler';
import {IResizableRectFigureInit} from '../contract';
import {BaseFigure} from '../../_base/base.figure';
import {Editor} from '../../../_root';
import {Corner} from './corner';

const lineOpt: IStraightLineOpt = {maxDecimalsInPointCoords: 2, makeCrisp: true};

/**
 * Прямоугольник, который можно ресайзить:
 *   • через смещение угловой точки
 *   •
 */
export class ResizableRectFigure extends BaseFigure {

  leftTop: Corner;
  rightTop: Corner;
  rightBottom: Corner;
  leftBottom: Corner;

  private component: any;
  private disposeAll = createDisposeManager();
  private cornerMoveHandler = new CornerMoveHandler();

  constructor(init: IResizableRectFigureInit) {
    super(init);
    const {leftTop, rightTop, rightBottom, leftBottom} = init.corners;
    this.leftTop = new Corner('leftTop', leftTop, this);
    this.rightTop = new Corner('rightTop', rightTop, this);
    this.rightBottom = new Corner('rightBottom', rightBottom, this);
    this.leftBottom = new Corner('leftBottom', leftBottom, this);
  }

  get state() {
    const leftTop = this.leftTop.state;
    const rightTop = this.rightTop.state;
    const rightBottom = this.rightBottom.state;
    const leftBottom = this.leftBottom.state;
    return {
      corners: [leftTop, rightTop, rightBottom, leftBottom],
      lines: [
        new StraightLine(leftTop.point, leftBottom.point, lineOpt),
        new StraightLine(leftTop.point, rightTop.point, lineOpt),
        new StraightLine(rightTop.point, rightBottom.point, lineOpt),
        new StraightLine(leftBottom.point, rightBottom.point, lineOpt)
      ]
    };
  }

  setEditor(editorState: Editor): void {
    super.setEditor(editorState);
    this.disposeAll.storage.push(
      autorun(() => [this.editor.events.mouseUp, this.editor.events.mouseLeave], {
        skipInitResult: true,
        onChange: () => setTimeout(this.stopCornerMovement), // при клике по угловой точке ведет себя некорректно без макротаски
      }),
    );
  }

  getCorner(pos: ICornerPointPosition) {
    switch (pos) {
      case 'leftTop':
        return this.leftTop;
      case 'rightTop':
        return this.rightTop;
      case 'rightBottom':
        return this.rightBottom;
      case 'leftBottom':
        return this.leftBottom;
    }
  }

  getOppositeCorner(pos: ICornerPointPosition) {
    switch (pos) {
      case 'leftTop':
        return this.rightBottom.point;
      case 'rightTop':
        return this.leftBottom.point;
      case 'rightBottom':
        return this.leftTop.point;
      case 'leftBottom':
        return this.rightTop.point;
    }
  }

  get width() {
    return Point.distance(this.leftTop.point, this.rightTop.point);
  }

  get height() {
    return Point.distance(this.leftTop.point, this.leftBottom.point);
  }


//region Ресайз через смещение угловой точки

  disposeCornerMoveEventListening = createDisposeManager();

  onMouseDownOnCorner(cursorCoordinates: IPoint, movableCornerPos: ICornerPointPosition) {
    this.cornerMoveHandler.init(
      this.getCorner(movableCornerPos),
      this.getOppositeCorner(movableCornerPos),
      this.width,
      this.height,
      cursorCoordinates
    );
    this.disposeCornerMoveEventListening.storage.push(
      autorun(() => this.editor.events.mouseMove, { // начинаем слушать перемещение курсора
        skipInitResult: true,
        onChange: this.onMoveCorner,
      }),
    );
  }

  onMoveCorner = (event: MouseEvent) => {

    // Определить матрицу, которая будет использована для масштабирования координат угловых точек прямоугольника
    const conv = this.cornerMoveHandler.getConverter(event);
    if (!conv) {
      return;
    }

    // Используя матрицу, задать угловым точкам прямоугольника новые координаты
    const leftTop = Matrix.apply(conv, this.leftTop.point);
    const rightTop = Matrix.apply(conv, this.rightTop.point);
    const leftBottom = Matrix.apply(conv, this.leftBottom.point);
    if ( // Контроль ширины/высоты, чтобы размеры прямоугольника не сжимались до нуля
      Point.distance(leftTop, rightTop) < 20 ||
      Point.distance(leftTop, leftBottom) < 20
    ) {
      this.stopCornerMovement();
      return;
    }
    this.leftTop.point = leftTop;
    this.rightTop.point = rightTop;
    this.leftBottom.point = leftBottom;
    this.rightBottom.point = Matrix.apply(conv, this.rightBottom.point);
  }

  stopCornerMovement = () => {
    this.disposeCornerMoveEventListening();
    this.cornerMoveHandler.dispose();
  }

//endregion Ресайз через смещение угловой точки


  getComponent() {
    if (!this.component) {
      this.component = <ResizableRectComponent key={this.id} controller={this}/>;
    }
    return this.component;
  }

  dispose() {
    this.disposeAll();
    this.stopCornerMovement();

    this.leftTop.dispose();
    this.rightTop.dispose();
    this.rightBottom.dispose();
    this.leftBottom.dispose();

    this.component = null;
  }

}
