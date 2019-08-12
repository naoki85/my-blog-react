import React, {FC} from "react";
// @ts-ignore
import {loadCSS} from 'fg-loadcss';
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import '../styles/paginate.css'

export interface PaginateStateProps {
  page: number;
  maxPage: number;
}
export interface PaginateDispatchProps {
  fetchPosts: (page: number) => void;
}

export interface PaginateProps
  extends PaginateStateProps, PaginateDispatchProps {}

const Paginate: FC<PaginateProps> = (props: PaginateProps) => {
  React.useEffect(() => {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#font-awesome-css'),
    );
  }, []);

  return (
    <div className={"paginate-area"}>
      <ul className="paginate">
        <li>
          <Icon className={clsx('fas fa-chevron-left')} />
        </li>
        <li>1</li>
        <li className={'current'}>2</li>
        <li onClick={() => props.fetchPosts(3)}>3</li>
        <li>4</li>
        <li>5</li>
        <li>
          <Icon className={clsx('fas fa-chevron-right')} />
        </li>
      </ul>
    </div>
  )
};

export default Paginate;
