/* global expect:true */
/* global shallow:true */
/* global mount:true */

import React from 'react';// eslint-disable-line

import DocCard from '../../src/components/Document/DocCard.component.jsx';

describe('<DocCard />', () => {
  it('should have a root div', () => {
    const wrapper = shallow(
      <DocCard
        title="title"
        id={3}
        icon="/img/f.png"
        onDelete={() => null}
        onEdit={() => null}
        onView={() => null}
      />
    );
    expect(wrapper.find('.doc-card-root')).to.have.length(1);
  });
});
