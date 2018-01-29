import React, { Component } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import axios from 'axios';
import PropTypes from 'prop-types';
import fontawesome from '@fortawesome/fontawesome';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/fontawesome-free-solid';

import 'bootstrap/dist/css/bootstrap.css';

import GitHubRepositoryDetails from '../GitHubRepositoryDetails';

import '../../css/style.css';

fontawesome.library.add(faExternalLinkAlt);

const DEFAULT_README = '# No README';

class BasicCard extends Component {
  constructor(props) {
    super(props);

    this.openModal = props.openModal.bind(this);
  }

  render() {
    const { owner, name, description } = this.props;
    return (
      <Card className='repository-card'>
        <CardBody>
          <CardTitle>
            <a href={`https://github.com/${owner}/${name}`} target='__blank'>{ name }</a>
            <span>{ ' ' }<FontAwesomeIcon className='repository-link' icon={'external-link-square-alt'} /></span>
          </CardTitle>
          <CardSubtitle>{ description }</CardSubtitle>
        </CardBody>
        <Button color='primary' onClick={this.openModal}>Details</Button>
      </Card>
    );
  }
}

class GitHubRepository extends Component {
  constructor(props) {
    super(props);

    this.openModal = this.openModal.bind(this);

    this.state = {
      showModal: false,
      readme: DEFAULT_README,
    };
  }

  openModal() {
    this.setState({ showModal: true });
  }

  componentDidMount() {
    const { owner, name, readme } = this.props;

    if (!readme) {
      axios({ method: 'get', url: `http://cors-anywhere.herokuapp.com/https://raw.githubusercontent.com/${owner}/${name}/master/README.md`, headers: { origin: null } })
        .then(response => this.setState({ readme: response.data }))
        .catch(this.setState({ readme: DEFAULT_README }));
    } else {
      this.setState({ readme });
    }
  }

  render() {
    const { owner, name, description } = this.props;
    const { showModal, readme } = this.state;
    return (
      <div>
        <BasicCard
          owner={owner}
          name={name}
          description={description}
          openModal={this.openModal}
        />
        <GitHubRepositoryDetails
          show={showModal}
          readme={readme}
        />
      </div>
    )
  }
}

BasicCard.propTypes = {
  owner: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
}

GitHubRepository.defaultProps = {
  readme: DEFAULT_README,
};

GitHubRepository.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
  readme: PropTypes.string,
};

export default GitHubRepository;
