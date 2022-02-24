import React, { createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const MarkerListContext = createContext();

export const MarkerListContextProvider = ({ children }) => {
    const [markerList,setMarkerList] = useState()
	const [posDraged,setPosDraged] = useState()
	const [clicked,setClicked] = useState()
	return (
		<MarkerListContext.Provider value={[posDraged,setPosDraged,clicked,setClicked]} >
			{children}
		</MarkerListContext.Provider>
	);
};

MarkerListContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};