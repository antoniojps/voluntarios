import React from 'react';
import PropTypes from 'prop-types';

const Card = ({
	Component,
	className,
	children,
}) => (
	<Component
		className={`card ${className}`}
	>
		{children}
		<style jsx>{`
			@import "assets/styles/mixins.scss";
			.card {
				@include box-shadow;
				padding: var(--spacing-xs);
				width: fit-content;
				background-color: var(--bg);
				&--loading {
					min-height: 188px;
				}
			}
		`}
		</style>
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
