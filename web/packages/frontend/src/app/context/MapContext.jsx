import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const MapContext = createContext();

export const MapContextProvider = ({ children }) => {
    const [map,setMap] = useState()
	return (
		<MapContext.Provider value={[map, setMap]} >
			{children}
		</MapContext.Provider>
	);
};

MapContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};