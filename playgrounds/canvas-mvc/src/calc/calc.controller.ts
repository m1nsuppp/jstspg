import { type CalcModel } from "./calc.model";
import { type CalcView } from "./calc.view";

export class CalcController {
  constructor() {
    this.calcModel = null;
    this.calcView = null;
  }

  private calcModel: CalcModel | null;
  private calcView: CalcView | null;

  setCalcView(calcView: CalcView): void {
    this.calcView = calcView;
  }

  setCalcModel(calcModel: CalcModel): void {
    this.calcModel = calcModel;
  }

  add(): number {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    const result =
      this.calcModel.getFirstNumber() + this.calcModel.getSecondNumber();

    return result;
  }

  divide(): number {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    const result =
      this.calcModel.getFirstNumber() / this.calcModel.getSecondNumber();

    return result;
  }

  multiply(): number {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    const result =
      this.calcModel.getFirstNumber() * this.calcModel.getSecondNumber();

    return result;
  }

  subtract(): number {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    const result =
      this.calcModel.getFirstNumber() - this.calcModel.getSecondNumber();

    return result;
  }

  decreaseFirstNumber(): void {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    this.calcModel.decreaseFirstNumber();
    this.calcView.redraw();
  }

  decreaseSecondNumber(): void {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    this.calcModel.decreaseSecondNumber();
    this.calcView.redraw();
  }

  increaseFirstNumber(): void {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    this.calcModel.increaseFirstNumber();
    this.calcView.redraw();
  }

  increaseSecondNumber(): void {
    if (!this.calcModel || !this.calcView) {
      throw new Error();
    }

    this.calcModel.increaseSecondNumber();
    this.calcView.redraw();
  }
}
