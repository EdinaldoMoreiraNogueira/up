import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import { StatsContainer } from './styles'

import ShortinerServices from '../../services/shortinerServices';


class RedirectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            url:'',
            errorMessage: '',
        }
    }

    async conponentDidMount() {
        const{ code }= this.props.match.params;

        try{
            const service = new ShortinerServices();
            const { url } = await service.getLink(code);
           
            window.location = url;

           

        }catch(error){
            this.setState({isLoading: false, errorMessage:'Ops!! a URL solicitada não existe'})
        }
    }

    render() {

        const {errorMessage} = this.state;
        return (
          <Container>
              {
              errorMessage ? (
                  <>
                  <Header>*Seu novo encurtador de URL_</Header>
                   <StatsContainer className="text-center" >
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                    <p className="m-3" >{errorMessage}</p>
                    <a className="btn btn-primary" href="/">Encurtar Nova URL </a>
                    </StatsContainer>
                  </>
              ) : (
                  <p className="text-center"> >*Redirecionando...</p>
              )
              }
              
          </Container>
        )
    }

}

export default RedirectPage;