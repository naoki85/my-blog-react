import React, { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export interface Formula {
  id: number;
  operator: "+" | "-";
  num: number;
  result: number;
}

interface CalcRowProps {
  formula: Formula;
}

const CalcRow: FC<CalcRowProps> = (props: CalcRowProps) => {
  return (
    <TableRow>
      <TableCell>{props.formula.id}</TableCell>
      <TableCell>
        <form>
          <label htmlFor={"plus"}>
            {props.formula.operator}
          </label>
        </form>
      </TableCell>
      <TableCell>
        <form>
          <label htmlFor={"plus"}>
            {props.formula.num}
          </label>
        </form>
      </TableCell>
      <TableCell>{props.formula.result}</TableCell>
    </TableRow>
  );
};

export default CalcRow;
