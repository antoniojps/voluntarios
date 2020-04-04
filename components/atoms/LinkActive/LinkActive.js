import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

const LinkActive = ({ href, activeClassName, children, target }) => {
  const router = useRouter();

  const child = React.Children.only(children);

  let className = child.props.className || '';
  if (router.pathname === href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  if (target) {
    return <Link href={href}><a target={target}>{React.cloneElement(child, { className })}</a></Link>;
  }
  return <Link href={href}>{React.cloneElement(child, { className })}</Link>;
};

LinkActive.propTypes = {
  href: PropTypes.string,
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
};
LinkActive.defaultProps = {
  href: '',
  activeClassName: '',
};

export default LinkActive;
