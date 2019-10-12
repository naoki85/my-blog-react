import React from 'react';
import App from '../components/App';
import { shallow } from 'enzyme';
import CircularProgress from '@material-ui/core/CircularProgress';

it('renders without crashing', () => {
  const wrapper = shallow(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <App posts={[]} page={0} maxPage={0} fetchPosts={(number, boolean) => {}} loading={false} />
  );
  expect(wrapper).toExist();
  expect(wrapper.find(CircularProgress).length).toEqual(0);
});

it('renders loading components if loading props is true', () => {
  const wrapper = shallow(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    <App posts={[]} page={0} maxPage={0} fetchPosts={(number, boolean) => {}} loading={true} />
  );
  expect(wrapper.find(CircularProgress).length).toEqual(1);
});
