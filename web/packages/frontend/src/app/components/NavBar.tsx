import React, { useState } from 'react'
import { useNavigateNoUpdates } from '../context/RouterUtils';
import FilterBar from './FilterBar';
import "./NavBar.scss"

export default function NavBar() {

    const [hideBar, setHideBar] = useState(true);
    const navigate = useNavigateNoUpdates();

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
          </div>
          {!hideBar && <FilterBar />}
        </div> 
    )
}
