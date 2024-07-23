/*
'use client';
import Layout from "./components/chamada/layout"
import Tabela from "./components/chamada/tabela";
import Chamada from "./core/Aluno";
import Botao from "./components/chamada/botao";
import Formulario from "./components/chamada/formulario";
import { useState } from 'react';

export default function () {

    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

    const eventos = Chamada.geraEventosMock()

    const [evento, setEvento] = useState<Chamada>(Chamada.vazio())

    function eventoSelecionado(evento: Chamada) {
        setEvento(evento)
        setVisivel('form')

    }

    function novoEvento() {
        setEvento(Chamada.vazio())
        setVisivel("form")
       }

       
    function eventoExcluido(evento: Chamada) {
        console.log(evento.nome)
    }

    function salvarEvento(evento: Chamada) {
        console.log(evento)
        setVisivel("tabela")
    }

    return (
        <div className={` flex justify-center items-center h-screen bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900  text-white`}>
            <Layout titulo="Cadastro de Alunos">
                {visivel === 'tabela' ? (
                    <> <div className="flex justify-end">
                        <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                            onClick={() => novoEvento()}>
                            Cadastrar Aluno </Botao>
                    </div>
                        <Tabela eventos={eventos}
                            eventoSelecionado={eventoSelecionado}
                            eventoExcluido={eventoExcluido}></Tabela>
                    </>
                ) :
                    <Formulario evento={evento}
                        eventoMudou={salvarEvento}
                        cancelado={() => setVisivel('tabela')} />
                }
            </Layout>
        </div>
    )

}
*/
'use client';
import { useState } from 'react';
import Layout from "./components/chamada/layout";
import Tabela from "./components/chamada/tabela";
import Aluno from "./core/Aluno";
import Presenca from "./core/Presenca";
import Botao from "./components/chamada/botao";
import Formulario from "./components/chamada/formulario";
import QrcodeLeitor from "./components/chamada/qrcodeLeitor";

export default function () {

    const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela');
    const [alunos, setAlunos] = useState<Aluno[]>(Aluno.geraEventosMock());
    const [presencas, setPresencas] = useState<Presenca[]>(Presenca.geraPresencasMock());
    const [alunoAtual, setAlunoAtual] = useState<Aluno>(Aluno.vazio());

    function alunoSelecionado(aluno: Aluno) {
        setAlunoAtual(aluno);
        setVisivel('form');
    }

    function novoAluno() {
        setAlunoAtual(Aluno.vazio());
        setVisivel("form");
    }

    function alunoExcluido(aluno: Aluno) {
        console.log(aluno.nome);
    }

    function salvarAluno(aluno: Aluno) {
        aluno.qrcode = btoa(aluno.nome); // Gerando QR code com base no nome do aluno
        setAlunos([...alunos, aluno]);
        setVisivel("tabela");
    }

    return (
        <div className={`flex justify-center items-center h-screen bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-white`}>
            <Layout titulo="Cadastro de Alunos">
                {visivel === 'tabela' ? (
                    <> 
                        <div className="flex justify-end">
                            <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700"
                                onClick={() => novoAluno()}>
                                Cadastrar Aluno 
                            </Botao>
                        </div>
                        <Tabela eventos={alunos}
                            eventoSelecionado={alunoSelecionado}
                            eventoExcluido={alunoExcluido} />
                    </>
                ) :
                    <Formulario evento={alunoAtual}
                        eventoMudou={salvarAluno}
                        cancelado={() => setVisivel('tabela')} />
                }
            </Layout>
        </div>
    );
}