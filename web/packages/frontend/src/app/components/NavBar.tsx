import React, { useContext, useState } from 'react'
import { useNavigateNoUpdates } from '../context/RouterUtils';
import { ThemeContext } from '../context/ThemeContext';
import "./NavBar.scss"
import { Form } from 'react-bootstrap';


export default function NavBar() {

    const [hideBar, setHideBar] = useState(true);
    const navigate = useNavigateNoUpdates();
    const {isDarkTheme,setDarkTheme} = useContext(ThemeContext)

    const onHideShowClick = () => {
        setHideBar(!hideBar);
        console.log("hello")
    }


    return (
        <div className=''>
           <div className='navBar'>
                <button className="buttonStyle" onClick={(e) => navigate(`/`)}>Accueil</button>
                <button className="buttonStyle" onClick={(e) => navigate(`chart`)}>Graphiques</button>
                <button className="buttonStyle filterButton" onClick={(e) => onHideShowClick()}>{hideBar? "Afficher Filtre" : "Masquer Filtre"}</button>
                <button className="loginButton buttonStyle" onClick={(e) => navigate(`login`)}>Profil Utilisateur</button>
                <Form.Check 
                    type="switch"
                    className='custom-theme-swtich'
                    checked={isDarkTheme}
                    onChange={event=>setDarkTheme(event.target.checked)}
                />
          </div>
        </div> 
    )
}
