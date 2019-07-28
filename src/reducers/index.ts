import * as Action from '../actions';

export interface Formula {
  id: number;
  operator: Action.Operator;
  num: number;
  result: number;
}

export interface Result {
  formulas: Formula[];
  formula: Formula;
}

const initialState: Result = {
  formulas: [],
  formula: { id: 0, operator: "+", num: 0, result: 0 }
};

const calc = (formulas: Formula[], operator: Action.Operator, num: number) => {
  const result = formulas.length === 0 ? 0 : formulas[formulas.length - 1].result;
  switch (operator) {
    case "+":
      return result + num;
    case "-":
      return result - num;
    default:
      return NaN;
  }
}

export default (state=initialState, action: Action.Actions): Result => {
  switch (action.type) {
    case Action.CHANGE_OPERATOR: {
      const result = calc(
        state.formulas,
        action.payload.operator,
        state.formula.num
      );

      return {
        ...state,
        formula: { ...state.formula, operator: action.payload.operator, result }
      };
    }
    case Action.CHANGE_NUM: {
      const result = calc(
        state.formulas,
        state.formula.operator,
        action.payload.num
      );

      return {
        ...state,
        formula: { ...state.formula, num: action.payload.num, result }
      };
    }
    case Action.APPEND_ROW: {
      return {
        formulas: [
          ...state.formulas,
          {
            ...state.formula,
            id: state.formulas.length === 0 ? 1 : state.formulas[state.formulas.length - 1].id + 1
          }
        ],
        formula: {
          id: 0,
          operator: "+",
          num: 0,
          result: state.formula.result
        }
      };
    }
    default: {
      return state;
    }
  }
};
