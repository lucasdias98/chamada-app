import React from 'react';
import QRCode from 'qrcode.react';
import Aluno from "@/app/core/Aluno"

interface TabelaQRcodeProps {
    alunos: Aluno[]
}



export default function TabelaQRcode(props: TabelaQRcodeProps) {

    function renderHeader() {
        return (
            <tr>
                <th className="text-left p-3">Aluno</th>
                <th className="text-left p-3">QRcode</th>
            </tr>
        )

    }
    function renderDados() {
        return props.alunos?.map((aluno, i) => {
            return (
                <tr key={aluno.id}
                    className={`${i % 2 === 0 ? 'bg-indigo-200' : 'bg-indigo-100'} `}>
                    <td className="text-left p-3">{aluno.nome}</td>
                    <br />
                    <QRCode value={aluno.qrcode} />
                    <br />  
                </tr>)
        })
    }

    return (
        <table className="w-full rounded-xl overflow-hidden">
            <thead className={`text-gray-100 bg-gradient-to-r from-indigo-500 to-indigo-800`}>
                {renderHeader()}
            </thead>
            <tbody>
                {renderDados()}
            </tbody>
        </table>
    )

}