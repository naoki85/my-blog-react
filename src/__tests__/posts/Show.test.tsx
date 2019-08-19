import React from 'react';
import Show from '../../components/posts/Show';
import { shallow } from 'enzyme';
import CircularProgress from "@material-ui/core/CircularProgress";

const post = {
  Id: 1,
  Title: 'test title',
  Content: 'test content',
  PublishedAt: '2019-01-01',
  ImageUrl: 'http://localhost/image.png',
};

it('renders without crashing', () => {
  const wrapper = shallow(
    <Show post={post} loading={false} recommendedBooks={[]} />
  );
  expect(wrapper).toExist();
  expect(wrapper.find(CircularProgress).length).toEqual(0);
});

it('renders loading components if loading props is true', () => {
  const wrapper = shallow(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <Show post={post} loading={true} recommendedBooks={[]} />
  );
  expect(wrapper.find(CircularProgress).length).toEqual(1);
});
