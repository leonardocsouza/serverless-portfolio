import React from 'react';
import ReactDOM from 'react-dom';
import ExampleWork from './example-work';

const myWork = [
  {
    'title': 'Work Example',
    'href': 'http://example.com',
    'desc': 'Nostrud excepteur deserunt minim velit sunt incididunt ad cillum duis Lorem sunt magna aute irure. Aute aliquip ex irure commodo ex ullamco nostrud pariatur consectetur. Elit aute aute qui ullamco aute ad adipisicing magna officia esse cillum. Id laboris ullamco officia officia duis tempor labore.',
    'image': {
      'desc': 'example screenshot of a project involving code',
      'src': 'images/example1.png',
      'comment': ''
    }
  },
  {
    'title': 'Portfolio Boilerplate',
    'href': 'http://example.com',
    'desc': 'Est enim fugiat in ad commodo cillum ut duis cupidatat enim commodo. Exercitation laboris consectetur ex sit veniam exercitation magna aliqua anim quis veniam ullamco. Qui tempor exercitation id culpa pariatur. Nulla velit est Lorem qui labore minim veniam fugiat magna veniam enim. Elit exercitation ex consectetur laborum veniam. Laboris nisi exercitation do esse adipisicing dolor.',
    'image': {
      'desc': 'A Serverless Portfolio',
      'src': 'images/example2.png',
      'comment': `“Chemistry” by Surian Soosay is licensed under CC BY 2.0
                  https://www.flickr.com/photos/ssoosay/4097410999`
    }
  },
  {
    'title': 'Work Example',
    'href': 'http://example.com',
    'desc': 'In quis commodo dolor ex velit aliquip enim. Anim commodo ullamco voluptate exercitation esse occaecat qui qui ex Lorem. Qui est proident officia commodo. Dolore aute enim magna nulla consectetur labore pariatur. Ex laborum excepteur Lorem laborum. Amet adipisicing ex non elit eu ut.',
    'image': {
      'desc': 'example screenshot of a project involving cats',
      'src': 'images/example3.png',
      'comment': `“Bengal cat” by roberto shabs is licensed under CC BY 2.0
                  https://www.flickr.com/photos/37287295@N00/2540855181`
    }
  }
];

ReactDOM.render(<ExampleWork work={myWork}/>, document.getElementById('example-work'));