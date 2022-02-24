import { createContext, useState,useEffect} from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {


	const [isDarkTheme,setDarkTheme] = useState(false)

	
	return (
		<ThemeContext.Provider value={{isDarkTheme, setDarkTheme}} >
            <div className={`app-container ${(isDarkTheme)?"theme--dark":"theme--default"}`}>
			    {children}
            </div>
		</ThemeContext.Provider>
	);
};

ThemeContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};