import React, { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export type Operator = "+" | "-";
export interface Formula {
  id: number;
  operator: Operator;
  num: number;
  result: number;
}

export interface CalcRowProcProps {
  changeOperator: (operator: Operator) => void;
  changeNum: (num: number) => void;
  appendRow: () => void;
}

interface CalcRowStateProps {
  formula: Formula;
}

interface CalcRowProps extends CalcRowProcProps, CalcRowStateProps {}
const CalcRow: FC<CalcRowProps> = (props: CalcRowProps) => {
  if (props.formula.id === 0) {
    return (
      <TableRow>
        <TableCell>{props.formula.id}</TableCell>
        <TableCell>
          <form onSubmit={ e => { e.preventDefault(); }}>
            <label htmlFor={"plus"}>
              +
            </label>
            <input
              type="radio"
              id="plus"
              checked={props.formula.operator === "+"}
              onChange={() => props.changeOperator("+")}
            />
          </form>
          <form onSubmit={ e => { e.preventDefault(); }}>
            <label htmlFor={"minus"}>
              -
            </label>
            <input
              type="radio"
              id="minus"
              checked={props.formula.operator === "-"}
              onChange={() => props.changeOperator("-")}
            />
          </form>
        </TableCell>
        <TableCell>
          <form
            onSubmit={ e => {
              e.preventDefault();
              props.appendRow();
            }}
          >
            <input
              type="text"
              value={props.formula.num ? props.formula.num : ""}
              onChange={e => {
                if (e.target.value === "-") {
                  props.changeOperator("-")
                } else if (e.target.value === "+") {
                  props.changeOperator("+")
                } else if (Number(e.target.value)) {
                  props.changeNum(Number(e.target.value));
                }
              }}
            />
          </form>
        </TableCell>
        <TableCell>{props.formula.result}</TableCell>
      </TableRow>
    );
  }
  
  return (
    <TableRow>
      <TableCell>{props.formula.id}</TableCell>
      <TableCell>{props.formula.operator}</TableCell>
      <TableCell>{props.formula.num}</TableCell>
      <TableCell>{props.formula.result}</TableCell>
    </TableRow>
  )
};

export default CalcRow;
