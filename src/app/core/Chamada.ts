import { stringParaEntradaDeData } from "@/app/utils/converters"

export default class Chamada {

    id: number | null;
    nome: string;
    data: string;
    descricao: string;
    status: string;

    constructor(id: number | null, nome: string, data: string,
        descricao: string, status: string) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.descricao = descricao;
        this.status = status;
    }

    static geraEventosMock() {
        return [new Chamada(1, "Matheus Prestes",
            "10/11/2024",
            "Intergaláticos",
            "Ativo",
        ),
        new Chamada(2, "Isadora Matias",
            "10/11/2024",
            "Turma B",
            "Inativo",
        )
        ]
    }

    static vazio(): Chamada {
        return new Chamada(null, "", stringParaEntradaDeData(""), "", "");
       }
       

}

