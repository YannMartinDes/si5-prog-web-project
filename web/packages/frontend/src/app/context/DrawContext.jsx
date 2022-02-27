import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const DrawContext = createContext();

export const DrawContextProvider = ({ children }) => {
    const [groupLayer,setGroupeLayer] = useState()
	return (
		<DrawContext.Provider value={[groupLayer, setGroupeLayer]} >
			{children}
		</DrawContext.Provider>
	);
};

DrawContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};