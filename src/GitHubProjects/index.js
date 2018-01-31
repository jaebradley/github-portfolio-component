import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';

const DEFAULT_ROW_SIZE = 3;

const ProjectRow = ({ projects, rowSize }) => (
  <Row>
    { projects.map((project, index) => (
        <Col
          key={`${index}-project`}
          md={ { size: rowSize } }
        >{ project }</Col>
      ))
    }
  </Row>
);

class GitHubProjects extends Component {
  constructor(props) {
    super(props);

    this.renderChildren = this.renderChildren.bind(this);
  }

  renderProjects() {
    const { rowSize } = this.props;

    const children = this.renderChildren();

    return children.map((el, index) => {
      if (index % rowSize === 0) {
        return (<ProjectRow projects={ children.slice(index, index + rowSize) } />);
      }
    });
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
    return (<div>{ this.renderProjects() }</div>);
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
