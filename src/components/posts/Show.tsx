import React, { FC } from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface PostProps extends RouteComponentProps<{ id: string }> {}

const PostShowComponent: FC<PostProps> = ({ match }) => {
  const postId = match.params.id;

  return (
    <h2>{ `postId: ${postId} の記事だよ` }</h2>
  );
};

export default PostShowComponent;
