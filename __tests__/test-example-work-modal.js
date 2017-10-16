import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleWorkModal from '../js/example-work-modal';

configure({ adapter: new Adapter() });

const myExample = {
  'title': 'Work Example',
  'href': 'http://example.com',
  'desc': 'Nostrud excepteur deserunt minim velit sunt incididunt ad cillum duis Lorem sunt magna aute irure. Aute aliquip ex irure commodo ex ullamco nostrud pariatur consectetur. Elit aute aute qui ullamco aute ad adipisicing magna officia esse cillum. Id laboris ullamco officia officia duis tempor labore.',
  'image': {
    'desc': 'example screenshot of a project involving code',
    'src': 'images/example1.png',
    'comment': 'some comment blah'
  }
};

describe("ExampleWorkModal component", () => {
  let mockCloseModalFn = jest.fn();

  let component = shallow(<ExampleWorkModal example={myExample}
    open={false} closeModal={mockCloseModalFn}/>);
  let openComponent = shallow(<ExampleWorkModal example={myExample}
    open={true} closeModal={mockCloseModalFn}/>);

  let anchors = component.find('a');

  it("Should contain a single 'a' element", () => {
    expect(anchors.length).toEqual(1);
  });

  it("Should link to our project", () => {
    expect(anchors.getElement().props.href).toEqual(myExample.href);
  });

  it("Should have the modal class set correctly", () => {
    expect(component.find(".background--skyBlue").hasClass("modal--closed")).toBe(true);
    expect(openComponent.find(".background--skyBlue").hasClass("modal--open")).toBe(true);
  });

  it("Should be able to close modal", () => {
    openComponent.find('.modal__closeButton').simulate('click');
    expect(mockCloseModalFn).toHaveBeenCalled();
  });
});