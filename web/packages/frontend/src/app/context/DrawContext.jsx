import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const DrawContext = createContext();

export const DrawContextProvider = ({ children }) => {
    const [groupLayer,setGroupLayer] = useState()
	const [groupNavLayer,setNavGroupeLayer] = useState()
	return (
		<DrawContext.Provider value={[groupLayer, setGroupLayer,groupNavLayer,setNavGroupeLayer]} >
			{children}
		</DrawContext.Provider>
	);
};

DrawContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};