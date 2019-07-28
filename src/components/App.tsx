import React, { FC } from 'react';
// import { makeStyles, createStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
// import CardContent from '@material-ui/core/CardContent';
// import Icon from '@material-ui/core/Icon';
// import Typography from '@material-ui/core/Typography';

const AppComponent: FC<{}> = () => {
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
        <tr>
          <td>1</td>
          <td>
            <form>
              <label htmlFor={"plus"}>
                +
              </label>
            </form>
          </td>
          <td>
            <form>
              <label htmlFor={"plus"}>
                +
              </label>
            </form>
          </td>
          <td>result</td>
        </tr>
      </tbody>
    </table>
  );
};

export default AppComponent;
