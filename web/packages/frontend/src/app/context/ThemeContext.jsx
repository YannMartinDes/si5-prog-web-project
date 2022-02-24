import { createContext, useState,useEffect} from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [isDarkTheme,setDarkTheme] = useState(false)

	useEffect(()=>{
		const darkTheme = localStorage.getItem("dark-theme")
		if(darkTheme!==null){
			setDarkThemeCustom((darkTheme === 'true'))
		}
	},[])
	const setDarkThemeCustom = (isDark) => {
		setDarkTheme(isDark)
		localStorage.setItem("dark-theme",isDark)
	}
	return (
		<ThemeContext.Provider value={{isDarkTheme, setDarkTheme:setDarkThemeCustom}} >
            <div className={`app-container ${(isDarkTheme)?"theme--dark":"theme--default"}`}>
			    {children}
            </div>
		</ThemeContext.Provider>
	);
};

ThemeContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};