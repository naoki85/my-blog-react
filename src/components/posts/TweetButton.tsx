import React, {FC} from "react";
import '../../styles/button.scss';

export interface TweetButtonStateProps {
  id: number;
  title: string;
}

const TweetButton: FC<TweetButtonStateProps> = (props: TweetButtonStateProps) => {
  const getLinkHref = (): string => {
    const baseUrl = 'https://twitter.com/share';
    const url = 'https://naoki85.me/posts/' + props.id;

    return baseUrl + '?text=' + props.title + '&url=' + url;
  };

  return (
    <a
      className={'btn-container'}
      href={getLinkHref()}
      target={'_blank'}
      rel={'noopener noreferrer'}
    >
      <button className={'btn-twitter'}>
        Tweet
      </button>
    </a>
  )
};

export default TweetButton;
