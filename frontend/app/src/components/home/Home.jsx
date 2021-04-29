import React from 'react'
import Main from '../template/Main'
import './Home.css' 

export default props =>
    <Main icon="home" title="Início">
        <p className="title-p">OLá, <span>me chamo Hermes e seja bem vindo.</span></p>
        <p className="mb-2">O projeto Trata-se de um CRUD desenvolvido em React.js ultilizando API Json-server!</p>
        <p className="mb-2">Primeiramente peço perdão, acabei não conseguindo ver o email~a tempo, perdendo algumas horas.</p>
        <p className="mb-2">Agradeço imensamente a oportunidade e até uma próxima. Sucesso!</p>
    </Main>