import React from 'react';
import { storiesOf } from '@storybook/react';

import GitHubRepository from './index';
import test from '../GitHubRepositoryDetails/test.md';

storiesOf('GitHubRepository', module)
  .add('basic usage', () => (
    <GitHubRepository
      owner={'reactstrap'}
      name={'reactstrap'}
      description={'test component'}
      readme={test}
    />
  )
);
