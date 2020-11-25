import React from 'react';
import { HeaderContainer, Logo} from './styles';
import Icone from '../../assets/logo.png';


function Header(props) {
    return (

        <>
        <HeaderContainer>
            <Logo src={Icone} alt= "UP - encurtador de URL" />
            <h1>*UP_</h1>
            <p>{props.children}</p>
        </HeaderContainer>
        </>
    )

}

export default Header;