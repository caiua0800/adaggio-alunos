import React, { useState } from "react";
import './style/Formulario.css'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore'; // Importando doc e setDoc
import { initializeApp } from 'firebase/app';


const firebaseConfig = {
    apiKey: "AIzaSyBnX3wO0f_KFhVIpyxrcBUh4S2zk3HBXuM",
    authDomain: "adaggio-ee93a.firebaseapp.com",
    projectId: "adaggio-ee93a",
    storageBucket: "adaggio-ee93a.appspot.com",
    messagingSenderId: "690208774678",
    appId: "1:690208774678:web:4fba4cbeef4c0f23947337",
    measurementId: "G-WFE77RXQJD"
};


initializeApp(firebaseConfig);

function Formulario() {
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [contato, setContato] = useState('');
    const [DOCGOOGLE, setDOCGOOGLE] = useState('');
    const [cursos, setCursos] = useState([{ id: 1, nome: "Selecione" }]);

    const adicionarCurso = () => {
        const novoId = cursos.length + 1;
        setCursos([...cursos, { id: novoId, nome: "Selecione" }]);
    };

    const excluirCurso = (id) => {
        const novosCursos = cursos.filter(curso => curso.id !== id);
        setCursos(novosCursos);
    };

    const salvarAluno = async () => {
        const db = getFirestore();
        const alunoRef = doc(db, 'Alunos', cpf); // Utilizando o CPF como identificador do documento
        
        const cursosArray = Array.isArray(cursos) ? cursos : [cursos];

        const alunoData = {
            nome: nome,
            cpf: cpf,
            contato: contato,
            curso: cursosArray.map(curso => curso.nome),
            docgoogle: DOCGOOGLE
        };

        try {
            await setDoc(alunoRef, alunoData);
            console.log("Aluno salvo com sucesso!");

            setContato('')
            setCpf('')
            setNome('')
        } catch (error) {
            console.error("Erro ao salvar aluno: ", error);
        }
    };

    return (
        <div className="Formulario">
            <div className="div-input">
                <label>Nome:</label>
                <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="div-input">
                <label>CPF:</label>
                <input type="text" value={cpf} onChange={(e) => setCpf(e.target.value)} />
            </div>
            <div className="div-input">
                <label>Contato:</label>
                <input type="text" value={contato} onChange={(e) => setContato(e.target.value)} />
            </div>
            <div className="div-input">
                <label>DOC:</label>
                <input type="text" value={DOCGOOGLE} onChange={(e) => setDOCGOOGLE(e.target.value)} />
            </div>

            {Array.isArray(cursos) && cursos.map((curso) => (
                <div key={curso.id} className="div-curso">
                    <div className="div-input">
                        <label>Curso:</label>
                        <select value={curso.nome} onChange={(e) => setCursos(cursos.map(c => c.id === curso.id ? { ...c, nome: e.target.value } : c))}>
                            <option value="Selecione">Selecione</option>
                            <option value="Canto">Canto</option>
                            <option value="Guitarra">Guitarra</option>
                            <option value="Bateria">Bateria</option>
                            <option value="Piano">Piano</option>
                            <option value="Teclado">Teclado</option>
                        </select>
                        <button onClick={() => excluirCurso(curso.id)}>X</button>
                    </div>
                </div>
            ))}

            <button onClick={adicionarCurso}>Adicionar mais um curso</button>
            <button className="salvar" onClick={salvarAluno}>SALVAR ALUNO</button>
        </div>
    )
}

export default Formulario;