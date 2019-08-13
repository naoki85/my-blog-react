import React, {FC} from "react";
// @ts-ignore
import {loadCSS} from 'fg-loadcss';
import clsx from "clsx";
import Icon from "@material-ui/core/Icon";
import '../styles/paginate.css'
import {range} from "../utils/Array";

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

  const getPages = (): number[] => {
    if (props.maxPage > 0 && props.maxPage <= 5) {
      return range(1, props.maxPage)
    }
    if (props.page - 3 <= 0) {
      return range(1, 5)
    }
    const tmpPages: number[] = [];
    const iterater: number[] = [-2, -1, 0, 1, 2];
    iterater.forEach(i => {
      const tmpPage = props.page + i;
      if (tmpPage > props.maxPage) {
        return true
      }
      tmpPages.push(tmpPage)
    });

    return tmpPages
  };

  const pages = getPages();

  return (
    <div className={"paginate-area"}>
      <ul className="paginate">
        {(props.page > 1) && (
          <li
            onClick={() => props.fetchPosts(props.page - 1)}
          >
            <Icon className={clsx('fas fa-chevron-left')} />
          </li>
        )}
        {pages.map(i => {
          return (
            <li
              key={i}
              className={props.page === i ? 'current' : ''}
              onClick={() => props.fetchPosts(i)}
            >
              {i}
            </li>
          )
        })}
        {(props.page < props.maxPage) && (
          <li
            onClick={() => props.fetchPosts(props.page + 1)}
          >
            <Icon className={clsx('fas fa-chevron-right')} />
          </li>
        )}
      </ul>
    </div>
  )
};

export default Paginate;
