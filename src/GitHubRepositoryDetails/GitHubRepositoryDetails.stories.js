import React from 'react';
import { storiesOf } from '@storybook/react';

import GitHubRepositoryDetails from './index';
import test from './test.md';

storiesOf('GitHubRepositoryDetails', module)
  .add('basic usage', () => (
    <GitHubRepositoryDetails show readme={test}/>
  )
);
