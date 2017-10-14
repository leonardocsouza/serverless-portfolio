import React from 'react';

// doesn't work with new version of enzyme
// import { shallow } from 'enzyme';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleWork, { ExampleWorkBubble } from '../js/example-work';

configure({ adapter: new Adapter() });

const myWork = [
  {
    'title': 'Work Example',
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

  it("Should be a 'section' element", () => {
    //console.log(component.debug());
    expect(component.type()).toEqual('section');
  });

  it("Should contain as many childrens as there are work examples", () => {
    expect(component.find('ExampleWorkBubble').length).toEqual(myWork.length);
  });
});

describe("ExampleWorkBubble component", () => {
  let component = shallow(<ExampleWorkBubble example={myWork[1]} />);

  let images = component.find('img');

  it("Should contain a single 'img' element", () => {
    expect(images.length).toEqual(1);
  });

  it("Should have the image src set correctly", () => {
    expect(images.getElement().props.src).toEqual(myWork[1].image.src);
    expect(5).toEqual(6);
  });
});