import { configure } from '@storybook/react';

function loadStories() {
  require('../src/GitHubRepository/GitHubRepository.stories.js');
}

configure(loadStories, module);
