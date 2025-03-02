export class CalcModel {
  constructor() {
    this.firstNumber = 100;
    this.secondNumber = 10;
  }

  private firstNumber: number;
  private secondNumber: number;

  getFirstNumber() {
    return this.firstNumber;
  }

  getSecondNumber() {
    return this.secondNumber;
  }

  setFirstNumber(value: number) {
    this.firstNumber = value;
  }

  setSecondNumber(value: number) {
    this.secondNumber = value;
  }

  decreaseFirstNumber() {
    this.firstNumber--;
  }

  decreaseSecondNumber() {
    this.secondNumber--;
  }

  increaseFirstNumber() {
    this.firstNumber++;
  }

  increaseSecondNumber() {
    this.secondNumber++;
  }
}
