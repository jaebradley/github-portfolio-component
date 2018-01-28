import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import axios from 'axios';
import cheerio from 'cheerio';

import 'bootstrap/dist/css/bootstrap.css';

class GitHubRepository extends Component {
  constructor(props) {
    super(props);

    const { owner, name } = this.props;

    this.state = {
      owner,
      name,
      description: '',
      tags: [],
    };
  }

  componentDidMount() {
    const { owner, name } = this.props;

    axios({ method: 'get', url: `http://cors-anywhere.herokuapp.com/https://github.com/${owner}/${name}`, headers: { origin: null } })
      .then(response => response.data)
      .then(html => cheerio.load(html))
      .then($ => {
        const repositoryName = $('strong[itemprop=name] > a').text();
        const description = $('meta[name=description]').attr('content');
        const tagLinks = $('a[class="topic-tag topic-tag-link"]');
        const tags = tagLinks.get().map(tagLink => tagLink.attribs['data-octo-dimensions'].match(/^topic:(.*)/)[1]);
        this.setState({
          name: repositoryName,
          description,
          tags,
        });
      }).catch();
  }

  render() {
    const { owner, name, description, tags } = this.state;
    return (
      <Card>
        <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" />
        <CardBody>
          <CardTitle>{ `${owner}/${name}` }</CardTitle>
          <CardSubtitle>{ description }</CardSubtitle>
          <Button color='primary'>Details</Button>
        </CardBody>
      </Card>
    )
  }
}

export default GitHubRepository;
