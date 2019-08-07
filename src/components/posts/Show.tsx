import React, { FC } from 'react';

export interface Post {
  Id: number;
  Title: string;
  Content?: string;
  PublishedAt: string;
  ImageUrl: string;
}

interface PostShowStateProps {
  post: Post;
}

export interface PostProps extends PostShowStateProps {}

const PostShowComponent: FC<PostProps> = (props) => {
  return (
    <h2>{ `postId: ${props.post.Id} の記事だよ` }</h2>
  );
};

export default PostShowComponent;
