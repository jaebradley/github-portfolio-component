import { configure } from '@storybook/react';

function loadStories() {
  require('../src/GitHubRepository/GitHubRepository.stories.js');
  require('../src/GitHubRepositoryDetails/GitHubRepositoryDetails.stories.js');
  require('../src/GitHubProjects/GitHubProjects.stories.js');
}

configure(loadStories, module);
