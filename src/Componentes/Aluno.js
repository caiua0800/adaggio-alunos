import './style/Aluno.css'
import React from 'react'

export default function Aluno({ onClick, nome, curso }) {
    let cursos = ''

    if (Array.isArray(curso)) {
        for (let i = 0; i < curso.length; i++) {
            if(i != 0)
                cursos += `, ${curso[i]}`;
            else
                cursos += `${curso[i]}`;
        }

    } else cursos = curso;
    

    return (
        <div className='Aluno' onClick={onClick}>
            <h2>{nome}</h2>
            <h6>{cursos}</h6>
        </div>
    );
}
