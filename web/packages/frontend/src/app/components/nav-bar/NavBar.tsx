import React, {useContext, useState} from 'react'
import "./NavBar.scss"
import { Form } from 'react-bootstrap';
import FilterBar from './FilterBar';
import { useNavigateNoUpdates } from '../../context/RouterUtils';
import { AuthContext } from '../../context/AuthContext';


export default function NavBar() {

    const [hideBar, setHideBar] = useState(true);
    const navigate = useNavigateNoUpdates();
    const {token, user} = useContext(AuthContext);
    const buttonValue = (token==='') ? 'Se connecter' : user;

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
                <button className="loginButton buttonStyle" onClick={(e) => navigate(`login`)}>{buttonValue}</button>
                {!hideBar && <FilterBar />}
            </div>
        </div>
    )
}
