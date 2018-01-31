import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import renderHTML from 'react-render-html';
import showdown from 'showdown';
import PropTypes from 'prop-types';

import 'bootstrap/dist/css/bootstrap.css';
import '../css/style.css';

class GitHubRepositoryDetails extends Component {
  constructor(props) {
    super(props);

    const { show } = props;

    this.converter = new showdown.Converter();
    this.close = this.close.bind(this);

    this.state = { show };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  close() {
    this.setState({ show: false });

    this.props.onClose();
  }

  render() {
    const { readme } = this.props;
    const { show } = this.state;

    return (
      <Modal
        className='project-details'
        isOpen={show}
        toggle={this.close}
      >
        <ModalHeader toggle={this.close} />
        <ModalBody>
          { renderHTML(this.converter.makeHtml(readme)) }
        </ModalBody>
        <ModalFooter>
          <Button onClick={this.close}>Close</Button>
        </ModalFooter>
      </Modal>
    )
  }
}

GitHubRepositoryDetails.defaultProps = {
  onClose: null,
};

GitHubRepositoryDetails.propTypes = {
  show: PropTypes.bool.isRequired,
  readme: PropTypes.string.isRequired,
  onClose: PropTypes.func,
};

export default GitHubRepositoryDetails;
