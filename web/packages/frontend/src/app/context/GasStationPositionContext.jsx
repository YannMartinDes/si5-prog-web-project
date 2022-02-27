
import { createContext, useState} from 'react';
import PropTypes from 'prop-types';

export const GasStationPositionContext = createContext();

export const GasStationPositionContextProvider = ({ children }) => {
    const [stationList,setStationList] = useState();
	return (
		<GasStationPositionContext.Provider value={[stationList, setStationList]} >
			{children}
		</GasStationPositionContext.Provider>
	);
};

GasStationPositionContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};