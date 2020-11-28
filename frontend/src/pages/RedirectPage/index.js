import React from 'react';
import { Link } from "react-router-dom";
import { Container, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import { StatsContainer } from './styles'

import ShortinerServices from '../../services/shortinerServices';


class RedirectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            url:"",
            errorMessage:"",
        }
    }

    async conponentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortinerServices();
            const { url } = await service.getLinks(code);
           
            window.location = url;

           

        } catch (error) {
            this.setState({
                isLoading: false, 
                errorMessage:'Ops!! a URL solicitada não existe'})
        }
    }

    render() {

        const {errorMessage} = this.state;


        return (
          <Container>
              {
              errorMessage ? (
                  <>
                  <Header>
                      *Seu novo encurtador de URL_
                      </Header>
                   <StatsContainer className="text-center" >
                        <FontAwesomeIcon 
                        size="3x" 
                        color="#f8d7da" 
                        icon="exclamation-triangle" />
                    <p className="m-3"><strong>{errorMessage}</strong> </p>
                    <Link className="btn btn-primary" to="/">Encurtar Nova URL </Link>
                    </StatsContainer>
                  </>
              ) : (
                  <>
                <Header>
                *Seu novo encurtador de URL_
                </Header>
                  <p className="text-center" size="25" > *Redirecionando...</p>

                  <StatsContainer className="text-center" >
                  <Spinner animation="border" />
                  </StatsContainer>

                  </>
              )
              }
              
          </Container>
        )
    }

}

export default RedirectPage;