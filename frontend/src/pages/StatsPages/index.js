import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Header from '../../components/Header';
import { Container } from 'react-bootstrap';
import { parseISO, formatRelative } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR'

import ShortinerServices from '../../services/shortinerServices';

import { StatsContainer, StatsRow, StatsBox, StatsBoxTitle } from './styles';

class StatusPages extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            shortnedURL: {},
            errorMessage: "",
        }
    }

    async conponentDidMount() {
        const { code } = this.props.match.params;

        try {
            const service = new ShortinerServices();
            const shortnedURL = await service.getStatus(code)


            const parseDate = parseISO(shortnedURL.updatedAt);
            const currentDate = new Date();

            const relativeDate = formatRelative(parseDate, currentDate, {
                locale: ptBR
            });
            shortnedURL.relativeDate = relativeDate;

            this.setState({ isLoading: false, shortnedURL })

        } catch (error) {
            this.setState({ isLoading: false, errorMessage: 'Ops!! a URL solicitada não existe' })
        }
    }

    render() {

        const { shortnedURL, errorMessage } = this.state;
        return (
            <Container>
                <Header>
                    Estastisticas:
                </Header>
                {errorMessage ? (
                    <StatsContainer className="text-center" >
                        <FontAwesomeIcon size="3x" color="#f8d7da" icon="exclamation-triangle" />
                        <p className="m-3" >{errorMessage}</p>
                        <Link className="btn btn-primary" to="/">Encurtar uma nova URL </Link>
                    </StatsContainer>
                ) : (
                        <StatsContainer className="text-center" >
                            <p><b>https://upserver.tk/{shortnedURL.code}</b></p>
                            <p>Redirecionar para:<br /> <strong><Link to={shortnedURL.url}>{shortnedURL.url}</Link></strong> </p>
                            <StatsRow>
                                <StatsBox>
                                    <b>{shortnedURL.hits}</b>
                                    <StatsBoxTitle>Visitas</StatsBoxTitle>

                                </StatsBox>
                                <StatsBox>
                                    <b>{shortnedURL.relativeDate}</b>
                                    <StatsBoxTitle>Últimas Visitas</StatsBoxTitle>

                                </StatsBox>
                            </StatsRow>
                            <Link className="btn btn-primary" to="/">*Encurtar uma nova URL </Link>
                        </StatsContainer>
                    )}
            </Container>
        )
    }

}

export default StatusPages;