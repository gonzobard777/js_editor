import {ICornerPointPosition, IPoint} from '@do-while-for-each/math';
import {IEditorFigureBase} from '../../contract';

export interface IResizableRectFigureInit extends IEditorFigureBase {
  corners: { [key in ICornerPointPosition]: IPoint };
}

export interface ICornerData {
  position: ICornerPointPosition;
  point: IPoint;
  isHovered: boolean;
  isMoving: boolean;
  setElement: (element: SVGCircleElement) => void;
}
