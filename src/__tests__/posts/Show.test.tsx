import React from 'react';
import Show from '../../components/posts/Show';
import { shallow } from 'enzyme';

const post = {
  Id: 1,
  Title: 'test title',
  Content: 'test content',
  PublishedAt: '2019-01-01',
  ImageUrl: 'http://localhost/image.png',
};

it('renders without crashing', () => {
  const wrapper = shallow(
    <Show post={post} recommendedBooks={[]} />
  );
  expect(wrapper).toExist();
});
