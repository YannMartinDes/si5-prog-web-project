import {useContext, useState} from 'react'
import "./NavBar.scss"
import FilterBar from './FilterBar';
import { useNavigateNoUpdates } from '../../context/RouterUtils';
import { AuthContext } from '../../context/AuthContext';
import Switch from "react-switch";
import { ThemeContext } from '../../context/ThemeContext';


export default function NavBar() {

    const [hideBar, setHideBar] = useState(true);
    const navigate = useNavigateNoUpdates();
    const { isLogged,user} = useContext(AuthContext);
    const buttonValue = (!isLogged) ? 'Se connecter' : user;
    const {isDarkTheme,setDarkTheme} = useContext(ThemeContext)

    const onHideShowClick = () => {
        setHideBar(!hideBar);
    }

    const onChangeTheme = (checked:boolean) => {
        setDarkTheme(checked);
    }

    return (
        <div className=''>
            <div className='navBar'>
                <button className="buttonStyle" onClick={(e) => navigate(`/`)}>Accueil</button>
                <button className="buttonStyle" onClick={(e) => navigate(`chart`)}>Graphiques</button>
                <button className={hideBar? "buttonStyle" :"buttonStyleRed"} onClick={(e) => onHideShowClick()}>{hideBar? "Afficher Filtre" : "Masquer Filtre"}</button>
                <button className="loginButton buttonStyle" onClick={(e) => navigate(`login`)}>{buttonValue}</button>
                {!hideBar && <FilterBar />}
                <Switch onHandleColor="#444" offHandleColor="#0A5C72" offColor="#333" onColor="#ccc" activeBoxShadow="0 0 2px 2px rgba(150,150,150,0.25)" className="custom-theme-switch" onChange={onChangeTheme} checked={isDarkTheme}/>
            </div>
        </div>
    )
}
