/* global expect:true */
/* global shallow:true */
/* global mount:true */

import React from 'react';//eslint-disable-line

import Document from '../../src/components/Document.component';

describe('<Dashboard />', () => {
  it('should connect to the redux store', () => {
    const wrapper = shallow(
      <Document />
    );
    expect(wrapper.find()).to.have.length(1);
  });
});
