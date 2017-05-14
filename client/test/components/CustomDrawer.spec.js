/* global expect:true */
/* global shallow:true */
/* global mount:true */

import React from 'react';//eslint-disable-line

import CustomDrawer from '../../src/components/CustomDrawer.component.jsx';

describe('<CustomDrawer />', () => {
  const props = {
    title: 'iamdocuman',
    username: 'user',
    fullname: 'Test User'
  };
  it('should display the title in h5 tag', () => {
    const wrapper = shallow(
      <CustomDrawer { ...props } />
    );
    expect(wrapper.find('h5.white-text').props().children)
      .to.eql('iamdocuman');
  });

  it('should display a round avatar with first letter of username in it', () => {
    const wrapper = shallow(
      <CustomDrawer { ...props } />
    );
    expect(wrapper.find('#user-basic-info').props().children[0].type.muiName)
      .to.eql('Avatar');
    expect(wrapper.find('#user-basic-info').props().children[0].props.children)
      .to.eql('U');
  });

  it('should display the user fullname', () => {
    const wrapper = shallow(
      <CustomDrawer { ...props } />
    );
    expect(wrapper.find('#user-basic-info').props().children[1].props.children)
      .to.eql(props.fullname);
  });

  it('should display the user username', () => {
    const wrapper = shallow(
      <CustomDrawer { ...props } />
    );
    expect(wrapper.find('#user-basic-info').props().children[2].props.children)
      .to.eql(props.username);
  });

  it('should display five list options if user is not admin', () => {
    const wrapper = shallow(
      <CustomDrawer { ...props } />
    );
    expect(wrapper.find('#user-options-list').props().children.props.children[5])
      .to.eql(undefined);
  });
  it('should display six list options if user is admin', () => {
    const newProps = { ...props, userRole: 'admin' };
    const wrapper = shallow(
      <CustomDrawer { ...newProps } />
    );
    expect(wrapper.find('#user-options-list').props().children.props.children[5])
      .to.not.eql(undefined);
  });
});
