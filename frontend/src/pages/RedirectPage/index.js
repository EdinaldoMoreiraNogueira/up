import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import { Container, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { RedirectParagraph, StatsContainer } from "./styles";


import ShortenerService from "../../services/shortinerServices";

class RedirectPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      url: "",
      errorMessage: ""
    };
  }

  async componentDidMount() {
    const { code } = this.props.match.params;

    try {
      const service = new ShortenerService();
      const { url } = await service.getLink(code);

      window.location = url;
    } catch (error) {
      this.setState({
        isLoading: false,
        errorMessage: "Ops! A URL solicitada não existe."
      });
    }
  }

  render() {
    const { errorMessage } = this.state;

    return (
      <Container>
        {errorMessage ? (
          <>
            <Header>Seu encurtador de URL</Header>
            <StatsContainer className="text-center">
              <FontAwesomeIcon
                size="3x"
                color="#FF6961"
                icon="exclamation-triangle"
              />
              <p className="m-3">
                <strong>{errorMessage}</strong>
              </p>
              <Link className="btn btn-primary" to="/">
                Encurtar nova URL
              </Link>
            </StatsContainer>
          </>
        ) : (
          <>
            <Header>Seu encurtador de URL</Header>
            <RedirectParagraph>Redirecionando...</RedirectParagraph>
            <StatsContainer className="text-center">
              <Spinner animation="border" />
            </StatsContainer>
          </>
        )}
      </Container>
    );
  }
}

export default RedirectPage;