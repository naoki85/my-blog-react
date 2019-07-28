export const CHANGE_OPERATOR = "CHANGE_OPERATOR";
export const CHANGE_NUM = "CHANGE_NUM";
export const APPEND_ROW = "APPEND_ROW";
export type Operator = "+" | "-";

export const changeOperator = (operator: Operator) => {
  return {
    type: CHANGE_OPERATOR as typeof CHANGE_OPERATOR,
    payload: {
      operator
    }
  };
};

export const changeNum = (num: number) => {
  return {
    type: CHANGE_NUM as typeof CHANGE_NUM,
    payload: {
      num
    }
  };
};

export const appendRow = () => {
  return {
    type: APPEND_ROW as typeof APPEND_ROW
  };
};

export type Actions =
  | ReturnType<typeof changeOperator>
  | ReturnType<typeof changeNum>
  | ReturnType<typeof appendRow>
