import Layout from "./components/chamada/layout"
import Tabela from "./components/chamada/tabela";
import Chamada from "./core/Chamada";

export default function () {
    const eventos = Chamada.geraEventosMock()

    return (
        <div className={`
 flex justify-center items-center h-screen
 bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900
 text-white`}>
            <Layout titulo="Cadastro de eventos">
                <Tabela eventos={eventos}></Tabela>
            </Layout>
        </div>
    )
}