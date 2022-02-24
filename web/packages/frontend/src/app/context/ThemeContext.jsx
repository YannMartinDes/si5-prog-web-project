import { createContext, useState,useEffect} from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext();

export const ThemeContextProvider = ({ children }) => {
	const [isDarkTheme,setDarkTheme] = useState(false)

	// const [isDark] = useDarkreader()

	useEffect(() => {
		if(localStorage){
			let darkTheme =false;
			const darkThemeStr = localStorage.getItem("dark-theme")
			if(darkThemeStr!==null){
				darkTheme = Boolean(darkThemeStr)
			}
			setDarkTheme(Boolean(darkTheme))
		}
	}, [setDarkTheme])

	useEffect(() => {
		if(localStorage){
			localStorage.setItem("dark-theme",isDarkTheme)
		}
		if(isDarkTheme){
			document.body.classList.add("dark-body")
		}else{
			document.body.classList.remove("dark-body")

		}
	}, [isDarkTheme])
	
	console.log("hello" +isDarkTheme)
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