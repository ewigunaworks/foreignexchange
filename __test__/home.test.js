// Copyright 2004-present Facebook. All Rights Reserved.

'use strict';

import React from 'react';
import Home from '../src/pages/home';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(<Home />).toJSON();
  expect(tree).toMatchSnapshot();
});