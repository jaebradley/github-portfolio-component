import React from 'react';
import { storiesOf } from '@storybook/react';

import GitHubRepository from './index';

storiesOf('GitHubRepository', module)
  .add('basic usage', () => (
    <GitHubRepository owner={'reactstrap'} name={'reactstrap'}/>
  )
);
