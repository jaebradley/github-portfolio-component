import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'reactstrap';
import GitHubRepository from '../GitHubRepository';

const DEFAULT_ROW_SIZE = 3;

const ProjectRow = ({ projects, rowSize }) => (
  <Row>
    { projects.map((project, i) => (<Col key={`${i}-project`} md={ { size: rowSize }}>{ project }</Col>)) }
  </Row>
);

class GitHubProjects extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
  }

  renderDecks() {
    const { rowSize } = this.props;
    const children = this.renderChildren();
    return children.map((e, i) => i % rowSize === 0 ? (<ProjectRow projects={ children.slice(i, i + rowSize) } />) : null);
  }

  renderChildren() {
    const { children, owner } = this.props;

    return React.Children.map(children, child => {
      if (!child.props.owner) {
        return React.cloneElement(child, { owner });
      }

      return child;
    })
  }
  render() {
    return (
      <div>
        { this.renderDecks() }
      </div>
    )
  }
}

ProjectRow.defaultProps = {
  rowSize: DEFAULT_ROW_SIZE,
};

ProjectRow.propTypes = {
  projects: PropTypes.arrayOf(PropTypes.node).isRequired,
  rowSize: PropTypes.number,
};

GitHubProjects.defaultProps = {
  rowSize: DEFAULT_ROW_SIZE,
};

GitHubProjects.propTypes = {
  owner: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node).isRequired,
  rowSize: PropTypes.number,
};

export default GitHubProjects;
