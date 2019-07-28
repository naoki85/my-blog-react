import React, { FC } from 'react';
// import { tsPropertySignature } from '@babel/types';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Icon from '@material-ui/core/Icon';
// import Typography from '@material-ui/core/Typography';

export interface Formula {
  id: number;
  operator: "+" | "-";
  num: number;
  result: number;
}

interface AppProps {
  formulas: Formula[];
}

const AppComponent: FC<AppProps> = (props: AppProps) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>演算子</th>
          <th>数字</th>
          <th>結果</th>
        </tr>
      </thead>
      <tbody>
        {props.formulas.map(formula => {
          return (
            <tr>
              <td>{formula.id}</td>
              <td>
                <form>
                  <label htmlFor={"plus"}>
                    {formula.operator}
                  </label>
                </form>
              </td>
              <td>
                <form>
                  <label htmlFor={"plus"}>
                    {formula.num}
                  </label>
                </form>
              </td>
              <td>{formula.result}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  );
};

export default AppComponent;
