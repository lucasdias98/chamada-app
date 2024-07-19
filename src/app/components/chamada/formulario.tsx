// components/chamada/formulario.tsx
import Aluno from "@/app/core/Aluno";
import Entrada from "./entrada";
import { useState } from "react";
import Botao from "./botao";
//import { stringParaEntradaDeData } from "@/app/utils/converters"

interface FormularioProps {
    evento: Aluno;
    eventoMudou?: (evento: Aluno) => void;
    cancelado?: () => void;
}

export default function Formulario(props: FormularioProps) {

    const id = props.evento?.id;
    const [nome, setNome] = useState(props.evento?.nome);
    const [endereco, setEndereco] = useState(props.evento?.endereco);
    const [responsavel, setResponsavel] = useState(props.evento?.responsavel);
    const [telefone, setTelefone] = useState(props.evento?.telefone);
    const [grupo, setDescricao] = useState(props.evento?.grupo);
    const [status, setStatus] = useState(props.evento?.status);
    const qrcode = props.evento?.qrcode;

    return (
        <div>
            {id ? (<Entrada texto="id" valor={id} somenteLeitura ></Entrada>) : false}
            <Entrada texto="Nome" valor={nome} onChange={setNome}></Entrada>
            <Entrada texto="Responsável" valor={responsavel} onChange={setResponsavel}></Entrada>
            <Entrada texto="Telefone" valor={telefone} onChange={setTelefone}></Entrada>
            <Entrada texto="Endereço" valor={endereco} onChange={setEndereco}></Entrada>
            <Entrada texto="Grupo" valor={grupo} onChange={setDescricao}></Entrada>
            <Entrada texto="Status" valor={status} onChange={setStatus}></Entrada>
            <Entrada texto="QR Code" valor={qrcode} somenteLeitura></Entrada>
            <div className="flex justify-end mt-5">
                <Botao className="mr-3" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                    onClick={() => props.eventoMudou?.(new Aluno(
                        id, nome, responsavel, telefone, endereco, grupo, status, qrcode))}>
                    {id ? 'Alterar' : 'Salvar'}
                </Botao>
                <Botao cor="bg-gradient-to-r from-gray-500 to-gray-700"
                    onClick={props.cancelado}> Cancelar
                </Botao>
            </div>
        </div>
    );
}


// <Entrada texto="Data" tipo="date" valor={stringParaEntradaDeData(data)} onChange={setData}></Entrada>
// 