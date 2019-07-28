import React, { FC } from 'react';
import CalcRow, { Formula } from './CalcRow'
// import { tsPropertySignature } from '@babel/types';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

interface AppProps {
  formulas: Formula[];
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
}));

const AppComponent: FC<AppProps> = (props: AppProps) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>演算子</TableCell>
            <TableCell>数字</TableCell>
            <TableCell>結果</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.formulas.map(formula => {
            return (
              <CalcRow formula={formula} />
            )
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default AppComponent;
