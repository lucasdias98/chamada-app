import Aluno from "@/app/core/Aluno"
import { IconeEdicao, IconeLixo } from "../icones/tabela"; 

interface TabelaProps {
    eventos: Aluno[]
    eventoSelecionado?: (evento: Aluno) => void
    eventoExcluido?: (evento: Aluno) => void
}

export default function Tabela(props: TabelaProps) {

    const exibirAcoes = props.eventoSelecionado || props.eventoExcluido

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">Nome</th>
                <th className="text-left p-3">Grupo</th>
                <th className="text-left p-3">Responsável</th>
                <th className="text-left p-3">Endereço</th>
                <th className="text-left p-3">Status</th>

                {exibirAcoes ? <th className="p-3">Ações</th> : false}
            </tr>
        )

    }
    function renderDados() {
        return props.eventos?.map((evento, i) => {
            return (
                <tr key={evento.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{evento.nome}</td>
                    <td className="text-left p-3">{evento.grupo}</td>
                    <td className="text-left p-3">{evento.responsavel}</td>
                    <td className="text-left p-3">{evento.endereco}</td>
                    <td className="text-left p-3">{evento.status}</td>

                    {exibirAcoes ? renderizarAcoes(evento) : false }
                </tr>)
        })
    }

    /*
    function renderizarAcoes(evento: Chamada) {
        return (
            <td className="flex">
                <button className={`flex justify-center items
        text-green-600 rounded-full p-2 m-1
        hover:bg-gray-100`}>{IconeEdicao}</button>
                <button className={`flex justify-center items
        text-red-600 rounded-full p-2 m-1
        hover:bg-gray-100`}>{IconeLixo}</button>
            </td>
        )
    }
        */

    function renderizarAcoes(evento: Aluno) {
        return (
        <td className="flex justify-center">
        {props.eventoSelecionado
        ? ( <button onClick={() => props.eventoSelecionado?.(evento)}
        className={`flex justify-center items text-green-600
        rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeEdicao}</button>)
        : false }
        {props.eventoExcluido
        ? (<button onClick={() => props.eventoExcluido?.(evento)}
        className={`flex justify-center items text-red-600
        rounded-full p-2 m-1 hover:bg-gray-100`}>{IconeLixo}</button>)
        : false}
        </td>)}

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100
        bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )

}