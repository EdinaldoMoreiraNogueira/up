import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Header from '../../components/Header';
import {Container} from 'react-bootstrap';
import { parseISO, formatRelative } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR'

import ShortinerServices from '../../services/shortinerServices';

import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

class StatsPages extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false, 
            shortnedURL: {},
            errorMessage: '', 
        }
    }

    async conponentDidMount() {
        const{ code }= this.props.match.params;

        try{
            const service = new ShortinerServices();
            const shortnedURL = await service.getStats(code)
            this.setState({isLoading: false, shortnedURL})

            const parseDate = parseISO(shortnedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parseDate, currentDate, {
                locale: ptBr
            });
            shortnedURL.relativeDate = relativeDate;

        }catch(error){
            this.setState({isLoading: false, shortnedURL:'Ops!! a URL solicitada não existe'})
        }
    }

    render() {

        const { errorMessage, shortnedURL } = this.state;
        return (
            <Container>
                <Header>
                    _Estastisticas*:
                </Header>
                {errorMessage ? (
                    <StatsContainer className="text-center" >
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                    <p className="m-3" >{errorMessage}</p>
                    <a className="btn btn-primary" href="/">Encurtar Nova URL </a>
                    </StatsContainer>
                ): (
                    <StatsContainer className="text-center" >
                        <p><b>https://up.tk/{shortnedURL.code}</b></p>
                        <p>_Redirecionar para:<br/>{shortnedURL.url} </p>
                        <StatsRow>
                            <StatsBox>
                                <b>{ shortnedURL.hits }</b>
                                <StatsBoxTitle>_Visitas* </StatsBoxTitle>

                            </StatsBox>
                            <StatsBox>
                                <b>{ shortnedURL.relativeDate }</b>
                                <StatsBoxTitle>_Últimas Visitas* </StatsBoxTitle>
                                
                            </StatsBox>
                        </StatsRow>
                        <a className="btn btn-primary" href="/">*Encurtar uma nova URL </a>
                    </StatsContainer>
                )}
            </Container>
        )
    }

}

export default StatsPages;