import React from 'react';
import { storiesOf } from '@storybook/react';

import GitHubProjects from './index';
import GitHubRepository from '../GitHubRepository';
import test from '../GitHubRepositoryDetails/test.md';

storiesOf('GitHubProjects', module)
  .add('basic usage', () => (
    <GitHubProjects owner={'jaebradley'} rowSize={3}>
      <GitHubRepository owner={'reactstrap'} name={'reactstrap'} readme={test} description={'first description'} />
      <GitHubRepository name={'uber-cli'} readme={test} description={'second description'} />
      <GitHubRepository owner={'reactstrap'} name={'reactstrap'} readme={test} description={'third description'} />
      <GitHubRepository name={'uber-cli'} description={'fourth description'} />
    </GitHubProjects>
  )
);
