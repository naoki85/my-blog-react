import React, { FC } from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export type Operator = "+" | "-";

export interface Post {
  id: number;
  title: string;
}

interface CalcRowStateProps {
  post: Post;
}

interface CalcRowProps extends CalcRowStateProps {}
const CalcRow: FC<CalcRowProps> = (props: CalcRowProps) => {
  return (
    <TableRow>
      <TableCell>{props.post.id}</TableCell>
      <TableCell>hoge</TableCell>
      <TableCell>fuga</TableCell>
      <TableCell>{props.post.title}</TableCell>
    </TableRow>
  )
};

export default CalcRow;
