import React from 'react';

// doesn't work with new version of enzyme
// import { shallow } from 'enzyme';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

configure({ adapter: new Adapter() });

const myWork = [
  {
    'title': 'Work Example Test',
    'image': {
      'desc': 'example screenshot of a project involving code',
      'src': 'images/example1.png',
      'comment': ''
    }
  },
  {
    'title': 'Portfolio Boilerplate',
    'image': {
      'desc': 'A Serverless Portfolio',
      'src': 'images/example2.png',
      'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
                  https://www.flickr.com/photos/ssoosay/4097410999`
    }
  }
]

describe("ExampleWork component", () => {
  // shallow - renders this component without any of its subcomponents
  let component = shallow(<ExampleWork work={myWork} />);

  it("Should be a 'span' element", () => {
    //console.log(component.debug());
    expect(component.type()).toEqual('span');
  });

  it("Should contain as many childrens as there are work examples", () => {
    expect(component.find('ExampleWorkBubble').length).toEqual(myWork.length);
  });

  it("Should allow modal to open and close", () => {
    // instance() is provided by enzyme, which gives us access to the component's methods
    component.instance().openModal();
    expect(component.instance().state.modalOpen).toBe(true);
    component.instance().closeModal();
    expect(component.instance().state.modalOpen).toBe(false);
  });
});

describe("ExampleWorkBubble component", () => {
  let mockOpenModalFn = jest.fn();
  let component = shallow(<ExampleWorkBubble example={myWork[1]}
    openModal={mockOpenModalFn}/>);

  let images = component.find('img');

  it("Should contain a single 'img' element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have the image src set correctly", () => {
    expect(images.getElement().props.src).toEqual(myWork[1].image.src);
  });

  it("Should call the openModal handler when clicked", () => {
    component.find('.section__exampleWrapper').simulate('click');
    expect(mockOpenModalFn).toHaveBeenCalled();
  });
});