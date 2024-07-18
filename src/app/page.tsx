'use client';
import Layout from "./components/chamada/layout"
import Tabela from "./components/chamada/tabela";
import Chamada from "./core/Chamada";
import Botao from "./components/chamada/botao";
import Formulario from "./components/chamada/formulario";


export default function () {
    const eventos = Chamada.geraEventosMock()

    function eventoSelecionado(evento: Chamada) {
        console.log(evento.nome)
    }
    function eventoExcluido(evento: Chamada) {
        console.log(evento.nome)
    }


    return (
        <div className={`
 flex justify-center items-center h-screen
 bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
 text-white`}>
            <Layout titulo="Cadastro de Alunos">
                <div className="flex justify-end">
                    <Botao className="mb-4" cor="bg-gradient-to-r from-green-500 to-green-700">
                        Novo evento
                    </Botao>
                </div>

                <Tabela eventos={eventos}
                    eventoSelecionado={eventoSelecionado}
                    eventoExcluido={eventoExcluido}></Tabela>
                <Formulario evento={eventos[0]}></Formulario>

            </Layout>
        </div>
    )
}