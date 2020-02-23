import React, {FC} from "react";
import '../../styles/button.scss';

export interface HatebuButtonStateProps {
  id: number;
  title: string;
}

const HatebuButton: FC<HatebuButtonStateProps> = (props: HatebuButtonStateProps) => {
  const getLinkHref = (): string => {
    const baseUrl = 'http://b.hatena.ne.jp/add?mode=confirm';
    const url = 'https://naoki85.me/posts/' + props.id;

    return baseUrl + '&title=' + encodeURIComponent(props.title) + '&url=' + encodeURIComponent(url);
  };

  return (
    <a
      className={'btn-container'}
      href={getLinkHref()}
      target={'_blank'}
      rel="noreferrer noopener"
    >
      <button className={'btn-hatebu'}>
        ブックマーク
      </button>
    </a>
  )
};

export default HatebuButton;
