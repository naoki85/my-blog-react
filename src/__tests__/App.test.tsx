import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const wrapper = shallow(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <App posts={[]} page={0} maxPage={0} fetchPosts={number => {}} />
  );
  expect(wrapper).toExist();
});
