import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Row, Col, Button, Stack } from 'react-bootstrap';
import './App.css'
import { useTranslator } from './hooks/useTranslator';
import { AUTO_LANGUAGE } from './constants';
import { ArrowsIcon } from './components/Icons';
import { LanguageSelector } from './components/LanguageSelector';
import { SectionType } from './types.d';
import { TextArea } from './components/TextArea';


function App() {

  const {
    state, 
    setFromLanguage, 
    setToLanguage, 
    interchangeLanguages, 
    setFromText, 
    setResult
  } = useTranslator()

  // Contaniner con propiedad fluid, para ajustarlo al ancho de la pagina
  return (
    <Container fluid> 
      <h2>Google Translator</h2>
      

      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.From}
              value={state.fromLanguage}
              onChange={setFromLanguage}
            />
            <TextArea
            type={SectionType.From}
            value={state.fromText}
            onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={state.fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon/>
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector 
              type={SectionType.To}
              value={state.toLanguage}
              onChange={setToLanguage}
            />
            <TextArea
            type={SectionType.To}
            value={state.result}
            onChange={setResult}
            loading={state.loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App
