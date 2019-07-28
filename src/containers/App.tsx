import React, { FC } from 'react';
import AppComponent, { Formula } from '../components/App';

const formulas: Formula[] = [
  {
    id: 1,
    operator: "+",
    num: 111,
    result: 111
  },
  {
    id: 2,
    operator: "-",
    num: 222,
    result: 333
  }
];


const AppContainer: FC = () => {
  return <AppComponent formulas={formulas} />;
};

export default AppContainer;
