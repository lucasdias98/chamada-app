
import { stringParaEntradaDeData } from "@/app/utils/converters"

export default class Aluno {

    id: number | null;
    nome: string;
    responsavel: string;
    telefone: string;
    endereco: string;
    grupo: string;
    status: string;
    qrcode: string;

    constructor(id: number | null, nome: string, responsavel: string, telefone: string, endereco: string, grupo: string, status: string, qrcode: string) {
        this.id = id;
        this.nome = nome;
        this.responsavel = responsavel;
        this.telefone = telefone;
        this.endereco = endereco;
        this.grupo = grupo;
        this.status = status;
        this.qrcode = qrcode;
    }

    static geraEventosMock() {
        return [new Aluno(1, "Matheus Prestes",
            "Carmen Prestes",
            "99999-9999",
            "Rua benicio guimarares",
            "Turma C",
            "Ativo",
            "1",
        ),
        new Aluno(2, "Isadora Matias",
            "Carlos Matheus Matias",
            "99999-9999",
            "Avenida fulano",
            "Turma B",
            "Inativo",
            "qrcode code 2",
        ),
        new Aluno(3, "Enzo Carvalho",
            "Selena  Carvalho",
            "99999-9999",
            "Rua pedregulho",
            "Turma A",
            "Ativo",
            "qrcode code 3",
        )
        ]
    }

    static vazio(): Aluno {
        return new Aluno(null, "", "", "", "", "", "", "");
    }

    
    //quando possuia DATA 
    //static vazio(): Chamada {
    //    return new Chamada(null, "", stringParaEntradaDeData(""), "", "");
    //}
    //
}
