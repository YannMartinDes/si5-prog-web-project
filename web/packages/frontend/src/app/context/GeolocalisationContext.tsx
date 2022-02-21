import React, { createContext, useEffect, useState} from 'react';
import PropTypes from 'prop-types';


const initialState = {
	position: {
        lat:43.7,
        lon:7.289429    
    },
};
export const GeolocalisationContext = createContext({ position:initialState.position });


export const GeolocalisationContextProvider = ({ children }:any) => {
    const [position,setPosition] = useState(initialState.position)
    useEffect(()=>{
        if(navigator.geolocation) {
            //Init position
            Promise.resolve(navigator.geolocation.getCurrentPosition((position) => {
                console.log('Position : initialize');
                const pos = {lat: position.coords.latitude, lon: position.coords.longitude};
                setPosition(pos);
            },(error)=>{console.log(error)}))
            //onChange position
            // navigator.geolocation.watchPosition((position)=>{
            //     const pos = {lat: position.coords.latitude, lon: position.coords.longitude};
            //     console.log('Position : updated');
            //     setPosition(pos);
            // })
        }
        else {
            console.log('Impossible to use location');
        }
    },[])

    
	return (
		<GeolocalisationContext.Provider value={{ position }} >
			{children}
		</GeolocalisationContext.Provider>
	);
};

GeolocalisationContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};