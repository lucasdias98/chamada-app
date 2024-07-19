/*
class Presenca {
    alunoId: number;
    data: string;

    constructor(alunoId: number, data: string) {
        this.alunoId = alunoId;
        this.data = data;
    }

    static geraPresencasMock() {
        return [
            new Presenca(1, new Date().toLocaleDateString()),
            new Presenca(2, new Date().toLocaleDateString())
        ];
    }
}

export default Presenca;
*/
// core/Presenca.ts
export default class Presenca {
    alunoId: number; // Modificado para `number` se você não quer aceitar `null`
    data: string;

    constructor(alunoId: number, data: string) {
        this.alunoId = alunoId;
        this.data = data;
    }
}
