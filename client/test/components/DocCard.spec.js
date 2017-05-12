/*
global expect:true
global shallow:true
global mount:true
global sinon: true
*/

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

  it('should have a root div', () => {
    const wrapper = shallow(
      <DocCard
        title="title"
        id={3}
        icon="/img/f.png"
      />
    );
    expect(wrapper.find('.doc-card-root')).to.have.length(1);
  });

  it('render the icon props passed to it', () => {
    const wrapper = shallow(
      <DocCard
        title="title"
        id={3}
        icon="/img/f.png"
      />
    );
    expect(wrapper.find('.doc-card-img-icon').props().src)
      .to.eql('/img/f.png');
  });

  it('should hide the actions icon if showActions is false', () => {
    const wrapper = shallow(
      <DocCard
        showActions={false}
        title="title"
        id={3}
        icon="/img/f.png"
      />
    );
    expect(wrapper.find('.doc-card-action-container'))
      .to.have.length(0);
  });

  it('should call onDelete props when delete icon is clicked', () => {
    const props = {
      title: 'title',
      id: 3,
      icon: '/img/f.png',
      onDelete: sinon.spy()
    };
    const wrapper = shallow(
      <DocCard {...props} />
    );
    wrapper.find('.del-doc-btn').simulate('click');
    expect(props.onDelete.calledOnce)
      .to.eql(true);
  });

  it('should call onEdit props when edit icon is clicked', () => {
    const props = {
      title: 'title',
      id: 3,
      icon: '/img/f.png',
      onEdit: sinon.spy()
    };
    const wrapper = shallow(
      <DocCard {...props} />
    );
    wrapper.find('.edit-doc-btn').simulate('click');
    expect(props.onEdit.calledOnce)
      .to.eql(true);
  });

  it('should chave a remove icon when remove prop is defined', () => {
    const props = {
      title: 'title',
      id: 3,
      icon: '/img/f.png',
      remove: sinon.spy()
    };
    const wrapper = shallow(
      <DocCard {...props} />
    );
    wrapper.find('.rm-doc-btn').simulate('click');
    expect(wrapper.find('.rm-doc-btn')).to.have.length(1);
    expect(props.remove.calledOnce)
      .to.eql(true);
  });

  it('should display the documents title', () => {
    const props = {
      title: 'title',
      id: 3,
      icon: '/img/f.png'
    };
    const wrapper = shallow(
      <DocCard {...props} />
    );
    expect(wrapper.find('.document-name').props().children.props.children)
      .to.eql('title');
  });
});
