import { Rectangle } from "../rectangle";
import { type CalcController } from "./calc.controller";
import { type CalcModel } from "./calc.model";

const PADDING = 30 as const;
const COLUMN_WIDTH = 60 as const;
const ROW_HEIGHT = 24 as const;
const BUTTON_SIZE = 24 as const;

type Operation = "+" | "-" | "*" | "/";

export class CalcView {
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;

    const ctx = this.canvas.getContext("2d");

    if (!ctx) {
      throw new Error();
    }

    this.ctx = ctx;

    this.canvas.width = 300;
    this.canvas.height = 150;

    this.canvas.style.border = "1px solid gray";
    this.canvas.style.cursor = "pointer";

    this.calcModel = null;
    this.calcController = null;

    this.firstNumberIncreaseButtonArea = new Rectangle(
      PADDING,
      PADDING - ROW_HEIGHT,
      BUTTON_SIZE,
      BUTTON_SIZE
    );

    this.firstNumberDecreaseButtonArea = new Rectangle(
      PADDING + BUTTON_SIZE + 2,
      PADDING - ROW_HEIGHT,
      BUTTON_SIZE,
      BUTTON_SIZE
    );

    this.secondNumberIncreaseButtonArea = new Rectangle(
      PADDING + COLUMN_WIDTH * 2,
      PADDING - ROW_HEIGHT,
      BUTTON_SIZE,
      BUTTON_SIZE
    );

    this.secondNumberDecreaseButtonArea = new Rectangle(
      PADDING + COLUMN_WIDTH * 2 + BUTTON_SIZE + 2,
      PADDING - ROW_HEIGHT,
      BUTTON_SIZE,
      BUTTON_SIZE
    );

    this.canvas.addEventListener("mousedown", this.handleMouseDown.bind(this));
  }

  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  private calcModel: CalcModel | null;
  private calcController: CalcController | null;

  private firstNumberIncreaseButtonArea: Rectangle;
  private firstNumberDecreaseButtonArea: Rectangle;
  private secondNumberIncreaseButtonArea: Rectangle;
  private secondNumberDecreaseButtonArea: Rectangle;

  redraw(): void {
    if (!this.calcController) {
      throw new Error();
    }

    this.ctx.fillStyle = "white";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.drawPlusButton(this.firstNumberIncreaseButtonArea);
    this.drawMinusButton(this.firstNumberDecreaseButtonArea);

    this.drawPlusButton(this.secondNumberIncreaseButtonArea);
    this.drawMinusButton(this.secondNumberDecreaseButtonArea);

    let offsetX = PADDING;
    let offsetY = PADDING;

    offsetY += ROW_HEIGHT;
    let operation: Operation = "+";
    let result = this.calcController.add();
    this.drawResult(operation, result, offsetX, offsetY);

    offsetY += ROW_HEIGHT;
    operation = "-";
    result = this.calcController.subtract();
    this.drawResult(operation, result, offsetX, offsetY);

    offsetY += ROW_HEIGHT;
    operation = "*";
    result = this.calcController.multiply();
    this.drawResult(operation, result, offsetX, offsetY);

    offsetY += ROW_HEIGHT;
    operation = "/";
    result = this.calcController.divide();
    this.drawResult(operation, result, offsetX, offsetY);
  }

  drawResult(operator: Operation, result: number, sx: number, sy: number) {
    if (!this.calcModel) {
      return;
    }

    const firstNumber = this.calcModel.getFirstNumber();
    const secondNumber = this.calcModel.getSecondNumber();

    this.drawText(`${firstNumber}`, sx, sy);
    this.drawText(operator, sx + COLUMN_WIDTH, sy);
    this.drawText(`${secondNumber}`, sx + COLUMN_WIDTH * 2, sy);
    this.drawText("=", sx + COLUMN_WIDTH * 3, sy);
    this.drawText(`${result}`, sx + COLUMN_WIDTH * 4, sy);
  }

  drawPlusButton(buttonArea: Rectangle): void {
    const sx = buttonArea.x;
    const sy = buttonArea.y;

    const ex = sx + buttonArea.width;
    const ey = sy + buttonArea.height;

    const cx = buttonArea.x + buttonArea.width / 2;
    const cy = buttonArea.y + buttonArea.height / 2;

    this.drawRectangle(sx, sy, ex, ey);
    this.drawLine(sx + 5, cy, ex - 5, cy);
    this.drawLine(cx, sy + 5, cx, ey - 5);
  }

  drawMinusButton(buttonArea: Rectangle): void {
    const sx = buttonArea.x;
    const sy = buttonArea.y;

    const ex = sx + buttonArea.width;
    const ey = sy + buttonArea.height;

    const cy = buttonArea.y + buttonArea.height / 2;

    this.drawRectangle(sx, sy, ex, ey);
    this.drawLine(sx + 5, cy, ex - 5, cy);
  }

  setCalcModel(calcModel: CalcModel): void {
    this.calcModel = calcModel;
  }

  setCalcController(calcController: CalcController): void {
    this.calcController = calcController;
  }

  handleMouseDown(event: MouseEvent): void {
    console.log(event);
    const pressedPosition = this.getRelativePosition(event, this.canvas);

    if (
      this.firstNumberDecreaseButtonArea.contains(
        pressedPosition.x,
        pressedPosition.y
      )
    ) {
      if (!this.calcController) {
        throw new Error();
      }

      this.calcController.decreaseFirstNumber();
    } else if (
      this.firstNumberIncreaseButtonArea.contains(
        pressedPosition.x,
        pressedPosition.y
      )
    ) {
      if (!this.calcController) {
        throw new Error();
      }

      this.calcController.increaseFirstNumber();
    } else if (
      this.secondNumberDecreaseButtonArea.contains(
        pressedPosition.x,
        pressedPosition.y
      )
    ) {
      if (!this.calcController) {
        throw new Error();
      }

      this.calcController.decreaseSecondNumber();
    } else if (
      this.secondNumberIncreaseButtonArea.contains(
        pressedPosition.x,
        pressedPosition.y
      )
    ) {
      if (!this.calcController) {
        throw new Error();
      }

      this.calcController.increaseSecondNumber();
    }
  }

  getRelativePosition(
    event: MouseEvent,
    canvas: HTMLCanvasElement
  ): { x: number; y: number } {
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor(event.clientX - rect.left);
    const y = Math.floor(event.clientY - rect.top);

    return { x, y };
  }

  drawRectangle(sx: number, sy: number, ex: number, ey: number): void {
    const width = ex - sx;
    const height = ey - sy;

    this.ctx.strokeRect(sx, sy, width, height);
  }

  drawLine(sx: number, sy: number, ex: number, ey: number): void {
    this.ctx.beginPath();
    this.ctx.moveTo(sx, sy);
    this.ctx.lineTo(ex, ey);
    this.ctx.stroke();
  }

  drawText(text: string, sx: number, sy: number): void {
    this.ctx.fillStyle = "black";
    this.ctx.font = "12px Arial";
    this.ctx.fillText(text, sx, sy);
  }
}
