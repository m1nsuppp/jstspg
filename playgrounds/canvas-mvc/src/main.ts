import { CalcController } from "./calc/calc.controller";
import { CalcModel } from "./calc/calc.model";
import { CalcView } from "./calc/calc.view";

document.addEventListener("DOMContentLoaded", () => {
  const appRoot = document.getElementById("app");

  if (!appRoot) {
    throw new Error();
  }

  const canvas = document.createElement("canvas");
  appRoot.appendChild(canvas);

  const calcView = new CalcView(canvas);
  const calcModel = new CalcModel();
  const calcController = new CalcController();

  calcView.setCalcModel(calcModel);

  calcController.setCalcModel(calcModel);
  calcController.setCalcView(calcView);

  calcView.setCalcController(calcController);

  calcView.redraw();
});
