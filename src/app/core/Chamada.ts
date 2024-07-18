export default class Chamada {

    id: number | null;
    nome: string;
    data: string;
    dataInicioInsc: string;
    dataFimInsc: string;
    descricao: string;
    status: string;

    constructor(id: number | null, nome: string, data: string,
        dataInicioInsc: string, dataFimInsc: string,
        descricao: string, status: string) {
        this.id = id;
        this.nome = nome;
        this.data = data;
        this.dataInicioInsc = dataInicioInsc;
        this.dataFimInsc = dataFimInsc;
        this.descricao = descricao;
        this.status = status;
    }

    static geraEventosMock() {
        return [new Chamada(1, "Matheus Prestes",
            "10/11/2024", "10/11/2024 17:00", "10/11/2024 17:00",
            "Intergaláticos",
            "Ativo",
        ),
        new Chamada(2, "Isadora Matias",
            "10/11/2024", "10/11/2024 17:00", "10/11/2024 17:00",
            "Turma B",
            "Inativo",
        )
        ]
    }

}

