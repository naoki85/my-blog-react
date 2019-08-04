import React, { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export type Operator = "+" | "-";

export interface Post {
  Id: number;
  Title: string;
}

interface CalcRowStateProps {
  post: Post;
}

interface CalcRowProps extends CalcRowStateProps {}
const CalcRow: FC<CalcRowProps> = (props: CalcRowProps) => {
  return (
    <TableRow>
      <TableCell>{props.post.Id}</TableCell>
      <TableCell>hoge</TableCell>
      <TableCell>fuga</TableCell>
      <TableCell>{props.post.Title}</TableCell>
    </TableRow>
  )
};

export default CalcRow;
