import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

import Aluno from './Aluno';
import './style/Alunos.css';

const firebaseConfig = {
    apiKey: "AIzaSyBnX3wO0f_KFhVIpyxrcBUh4S2zk3HBXuM",
    authDomain: "adaggio-ee93a.firebaseapp.com",
    projectId: "adaggio-ee93a",
    storageBucket: "adaggio-ee93a.appspot.com",
    messagingSenderId: "690208774678",
    appId: "1:690208774678:web:4fba4cbeef4c0f23947337",
    measurementId: "G-WFE77RXQJD"
};

export default function Alunos() {
    const [alunos, setAlunos] = useState([]);
    const [alunoSelecionado, setAlunoSelecionado] = useState(null);
    const [alunoAtual, setAlunoAtual] = useState(null);

    useEffect(() => {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        const fetchAlunos = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'Alunos'));
                const alunosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setAlunos(alunosData);
            } catch (error) {
                console.error('Erro ao buscar alunos:', error);
            }
        };

        fetchAlunos();

        return () => {};
    }, []);

    const handleAlunoClick = (aluno) => {
        setAlunoSelecionado(aluno);
        setAlunoAtual(aluno); 
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setAlunoAtual({
            ...alunoAtual,
            [id]: value
        });
    };

    const handleSaveChanges = async () => {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const alunoRef = doc(db, 'Alunos', alunoSelecionado.id);

        try {
            await updateDoc(alunoRef, alunoAtual);
            console.log('Alterações salvas com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    return (
        <div className='Alunos'>
            <div className='Alunos-box'>
                {alunos.map(aluno => (
                    <Aluno
                        key={aluno.id}
                        {...aluno}
                        onClick={() => handleAlunoClick(aluno)}
                    />
                ))}
            </div>

            <div className='Alunos-info'>
                {alunoSelecionado && (
                    <div className='inputs-info'>
                        <div className='input-div'>
                            <h2>Nome: </h2>
                            <input id='nome' placeholder='Nome' value={alunoAtual.nome} onChange={handleInputChange} />
                        </div>
                        <div className='input-div'>
                            <h2>Contato: </h2>
                            <input id='contato' type='number' placeholder='Contato' value={alunoAtual.contato} onChange={handleInputChange} />
                        </div>
                        <div className='input-div'>
                            <h2>CPF: </h2>
                            <input id='cpf' type='number' placeholder='CPF' value={alunoAtual.cpf} onChange={handleInputChange} />
                        </div>
                        <div className='input-div'>
                            <h2>Presenças: </h2>
                            <input id='aulas_feitas' type='number' placeholder='Presenças' value={alunoAtual.aulas_feitas} onChange={handleInputChange} />
                        </div>
                        <div className='input-div'>
                            <h2>Reposição: </h2>
                            <input id='aulas_a_repor' type='number' placeholder='Reposição' value={alunoAtual.aulas_a_repor} onChange={handleInputChange} />
                        </div>
                        <div className='input-div'>
                            <h2>Curso: </h2>
                            <input id='curso' type='text' placeholder='Curso' value={Array.isArray(alunoAtual.curso) ? alunoAtual.curso.join(', ') : alunoAtual.curso} onChange={handleInputChange} />
                        </div>
                    </div>
                )}
                <button className='save' onClick={handleSaveChanges}>SALVAR</button>
            </div>
        </div>
    );
}