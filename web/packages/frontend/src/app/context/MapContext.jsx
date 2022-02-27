import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
    const [map,setMap] = useState()	
	const [navControl,setNavControl] = useState()
	return (
		<MapContext.Provider value={{map, setMap,navControl,setNavControl}} >
			{children}
		</MapContext.Provider>
	);
};

MapContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};