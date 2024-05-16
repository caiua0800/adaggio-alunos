import './App.css';
import Navbar from './Componentes/Navbar';
import Container from './Componentes/Container';
import Alunos from './Componentes/Alunos';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Formulario from './Componentes/Formulario';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar Nav_Links={['ALUNOS', 'CADASTRO']} />
        <Routes>

          <Route path="/" element={
            <Container>
              <h1 className='container-title'>Página dos Alunos</h1>
              <Alunos />
            </Container>
          } />

          <Route path="/cadastro" element={
            <Container>
              <h1 className='container-title'>Página de Cadastro</h1>

              <Formulario>
                
              </Formulario>
            </Container>} />

        </Routes>

      </div>
    </Router>
  );
}

export default App;
