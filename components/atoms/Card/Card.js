import React from 'react';
import PropTypes from 'prop-types';
import "./Card.module.scss";

const Card = ({
	Component, 
	className,
	children,
}) => (
	<Component 
		className={`card ${className}`} 
	>
		{children}
	</Component>
);

Card.propTypes = {
	Component: PropTypes.elementType,
	capitalized: PropTypes.bool,
	color: PropTypes.string,
	className: PropTypes.string,
};

Card.defaultProps = {
	Component: 'div',
	className: '',
};

export default Card;
