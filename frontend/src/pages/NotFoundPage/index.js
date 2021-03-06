import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NotFoundMessage404, StatsContainer } from "./styles";


class NotFoundPage extends React.Component {
  render() {
    return (
      <>
        <Container>
          <Header>Seu encurtador de URL</Header>
          <StatsContainer className="text-center">
            <FontAwesomeIcon
              size="3x"
              color="#FF6961"
              icon="exclamation-triangle"
            />
            <NotFoundMessage404>Página não encontrada.</NotFoundMessage404>
            <Link className="btn btn-primary" to="/">
              Encurtar nova URL
            </Link>
          </StatsContainer>
        </Container>
      </>
    );
  }
}

export default NotFoundPage;
