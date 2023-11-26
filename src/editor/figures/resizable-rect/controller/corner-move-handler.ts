import {cell, makeObservable} from '@do-while-for-each/tree-cell';
import {IPoint, Operator} from '@do-while-for-each/math';
import {Corner} from './corner';

/**
 * Обработчик, который:
 *   • на каждый сдвиг мышки вычисляет матрицу масштабирования. Эта матрица потом применяется ко всем угловым точкам - и в результате прямоугольник ресайзится;
 *   • содержит вспомогательные данные, которые необходимы для вычисления матрицы масштабирования.
 */
export class CornerMoveHandler {

  public movableCorner: Corner; // сейчас перемещаемая пользователем угловая точка прямоугольника

  private baseCornerForScaling: IPoint; // угловая точка прямоугольника, которая будет считаться началом координат для масштабирования
  private cursorCoordinatesPrev: IPoint; // вспомогательная переменная, нужная для вычисления смещения по осям: X и Y
  private width: number;  // линейные размеры прямоугольника
  private height: number; // меняются в процессе перемещения угловой точки

  constructor() {
    makeObservable(this, {
      movableCorner: cell,
    });
  }

  init(movableCorner: Corner,
       baseCornerForScaling: IPoint,
       width: number,
       height: number,
       cursorCoordinates: IPoint
  ) {
    this.movableCorner = movableCorner;
    this.movableCorner.isMoving = true;
    this.baseCornerForScaling = baseCornerForScaling;
    this.width = width;
    this.height = height;
    this.cursorCoordinatesPrev = cursorCoordinates;
  }

  getConverter({pageX, pageY}: MouseEvent) {
    // dX и dY - это на какую величину(в пикселях) пользователь вот прямо сейчас сместил угловую точку
    const dX = pageX - this.cursorCoordinatesPrev[0];
    const dY = pageY - this.cursorCoordinatesPrev[1];
    this.cursorCoordinatesPrev = [pageX, pageY];

    if (dX === 0 && dY === 0) {
      return;
    }

    let multiplierX = 1;
    let multiplierY = 1;
    switch (this.movableCorner.position) { // В зависимости от того,
      case 'leftTop':                      // какую угловую точку прямоугольника
        multiplierX = -1;                  // пользователь сейчас перемещает,
        multiplierY = -1;                  // dX и dY может потребоваться домножить до (-1)
        break;                             // Конкретные кейсы вычислены опытным путем.
      case 'rightTop':
        multiplierY = -1;
        break;
      case 'leftBottom':
        multiplierX = -1;
        break;
    }

    // пользователь сдвинул угловую точку прямоугольника
    // как результат ширина/высота прямоугольника изменилась
    const width = this.width + multiplierX * dX;
    const height = this.height + multiplierY * dY;

    // при помощи обычной пропорции вычислю коэффициенты масштабирования, на примере ширины:
    //   ТекущаяШирина === 1
    //   НоваяШирина   === sx
    //   -----
    //   sx = НоваяШирина / ТекущаяШирина;
    const sx = width / this.width;
    const sy = height / this.height;

    this.width = width;
    this.height = height;

    return Operator.scaleAtPoint(this.baseCornerForScaling, sx, sy);
  }

  dispose() {
    if (this.movableCorner) {
      this.movableCorner.isMoving = false;
      this.movableCorner = null as any;
    }
  }

}
