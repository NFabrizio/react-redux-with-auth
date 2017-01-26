'use strict';

/**
 * Set up a dummy store for use in testing React components
 *
 * @parent /tests/dashboardContainer.spec.js
 * @parent /tests/loginContainer.spec.js
 * @parent /tests/logout.spec.js
 *
 * @export storeDummy
 */

/**
 * storeDummy function
 *
 * Returns empty methods to mimic the Redux store. This is used to test React
 * components using Redux.
 *
 * @param {Object} $state -
 */
export const storeDummy = (state) => {
	return {
		default: () => {},
		subscribe: () => {},
		dispatch: () => {},
		getState: () => {
			return { ...state };
		},
	};
};
