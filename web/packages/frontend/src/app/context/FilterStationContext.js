import React, {
	useReducer, createContext,
} from 'react';
import PropTypes from 'prop-types';

export const ADD_GAS_FILTER = 'ADD_GAS_FILTER';
export const SET_SERVICE_FILTER = 'ADD_SERVICE_FILTER';
export const REMOVE_GAS_FILTER = "REMOVE_GAS_FILTER"


export const RESET = 'RESET';

const initialState = {
	gasFilter: [],
    servicesFilter: []
};
export const FilterStationContext = createContext();


const reducer = (state, action) => {
	let nextState = {};
	switch (action.type) {
	case ADD_GAS_FILTER:
		nextState = {
			...state,
			gasFilter: [...state.gasFilter, action.payload],
		};
		break;
    case SET_SERVICE_FILTER:
		nextState = {
			...state,
			servicesFilter: action.payload,
		};
		break;
    case REMOVE_GAS_FILTER:
    nextState = {
        ...state,
        gasFilter: state.gasFilter.filter((elt)=>elt!==action.payload),
    };
    break;
	case RESET:
		nextState = initialState;
		break;
	default:
		throw new Error();
	}
	console.log(nextState);
	return nextState;
};

export const FilterStationContextProvider = ({ children }) => {
	const { NODE_ENV } = process.env;
	const [state, dispatch] = useReducer(reducer,initialState);
	return (
		<FilterStationContext.Provider value={{ state, dispatch }} >
			{children}
		</FilterStationContext.Provider>
	);
};

FilterStationContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};