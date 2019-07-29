import { connect } from "react-redux";
import { Dispatch, Action } from "redux";
import { Result } from "../reducers";
import * as Act from '../actions';
import AppComponent, { AppProcProps, AppStateProps } from '../components/App';

export const mapStateToProps = function(state: Result): AppStateProps {
  return {
    formulas: [...state.formulas, state.formula]
  }
};

export const mapDispatchToProps = function(
  dispatch: Dispatch<Action<{}>>
): AppProcProps {
  return {
    changeOperator: (operator: Act.Operator) =>
      dispatch(Act.changeOperator(operator)),
    changeNum: (num: number) => dispatch(Act.changeNum(num)),
    appendRow: () => dispatch(Act.appendRow())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent);
