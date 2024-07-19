'use client';
import Layout from "./components/chamada/layout"
import Tabela from "./components/chamada/tabela";
import Chamada from "./core/Chamada";
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
        <div className={`
 flex justify-center items-center h-screen
 bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
 text-white`}>
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