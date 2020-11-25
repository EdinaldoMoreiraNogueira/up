import React from 'react';
import { Container, InputGroup, FormControl, Button, Alert, Spinner } from 'react-bootstrap';
import Header from '../../components/Header';
import { ContentContainer, Form, AdsBlock } from './styles';
import ShortinerServices from '../../services/shortinerServices';


class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            url: '',
            code: '',
            errorMessage: '',

        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        const { url } = this.state;

        this.setState({ isLoading: true, errorMessage: '' });

        if (!url) {
            this.setState({ isLoading: false, errorMessage: 'Insira a URL para encuratar' })
        } else {
            try {
                const service = new ShortinerServices();
                const result = await service.generate({ url });

                this.setState({ isLoading: false, code: result.code });

            } catch (error) {
                this.setState({ isLoading: false, errorMessage: 'Ops, ocorreu um erro ao encurtar a URL' })
            }
        }
    }

    copyToClipboard = async()=> {
        const element = this.inputURL;
        element.select();
        document.execCommand('copy');

    }

    render() {
        const { isLoading, errorMessage, code } = this.state;
        return (
            <Container>
                <Header >
                    *Seu Novo Encutador de URL_
                </Header>

                <ContentContainer>
                    <Form onSubmit={this.handleSubmit} >
                        <InputGroup className="mb-3" >
                            <FormControl
                                placeholder="Digite a URL para encurtar_"
                                defaultValue=""
                                onChange={e => this.setState({ url: e.target.value })}
                            />

                            <InputGroup.Append>
                                <Button variant="primary" type="submit">Encurtar</Button>
                            </InputGroup.Append>
                        </InputGroup>

                        {
                            isLoading ? (

                                <Spinner animation="border" />

                            ) : (code && (
                                <>
                                    <InputGroup className="mb-3" >
                                        <FormControl
                                            autoFocus= {true}
                                            defaultValue={`https:up.tk${code}`}
                                            ref={(input) => this.inputURL = input}
                                        />

                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={()=> this.copyToClipboard()}>Copiar</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                            <p>Para acessar as estástisticas acesse: https:up.tk/{code}</p>
                                </>
                            ))
                        }
                        {errorMessage && <Alert variant="danger" >{errorMessage}</Alert>}
                    </Form>
                </ContentContainer>

                <ContentContainer>
                    <AdsBlock>
                        Adense
                    </AdsBlock>
                </ContentContainer>


            </Container>
        )
    }

}

export default HomePage;