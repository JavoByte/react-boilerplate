import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';

const RouterLink = props => (
  props.href.match(/^(https?:)?\/\//)
      ? <a href={props.href} target="_blank" rel="noopener noreferrer">{props.children}</a>
      : <Link to={props.href}>{props.children}</Link>
);


RouterLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

/** Simple ReactMarkdown Wrapper to render links with react-router Link **/
const InAppMarkdown = props => (
  <ReactMarkdown
    {...props}
    source={props.source}
    renderers={{
      Link: RouterLink,
      ...props.renderers,
    }}
  />
);

InAppMarkdown.propTypes = {
  renderers: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  source: PropTypes.string.isRequired,
};

InAppMarkdown.defaultProps = {
  renderers: {},
};

export default InAppMarkdown;
