'use client';
import { useEffect, useState } from 'react';
import Layout from '../components/chamada/layout';
import QrcodeLeitor from '../components/chamada/qrcodeLeitor';
import Aluno from '../core/Aluno';
import Presenca from '../core/Presenca';
import { fetchAlunos } from '../service/eventoService';


{/* // Codigo antes da criação do arquivo evento Servico 16:30 26/07
    export default function Eventos() {

    const alunos = Aluno.geraEventosMock();

    return (
        <div className={`flex justify-center items-center h-screen bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-white`}>
            <Layout titulo="Leitura de QR Code">
                <QrcodeLeitor alunos={alunos} presencas={[]} setPresencas={function (presencas: Presenca[]): void {
                    throw new Error('Function not implemented.');
                } } />
            </Layout>
        </div>
    );
} 
*/}

export default function Eventos() {
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const [visivel, setVisivel] = useState('tabela'); // Apenas um exemplo, ajuste conforme necessário

    useEffect(() => {
        if (visivel === 'tabela') {
            const loadAlunos = async () => {
                try {
                    const dados = await fetchAlunos();
                    setAlunos(dados);
                } catch (error) {
                    console.error('Erro ao buscar alunos:', error);
                }
            };
            loadAlunos();
        }
    }, [visivel]);

    return (
        <div className={`flex justify-center items-center h-screen bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-white`}>
            <Layout titulo="Leitura de QR Code">
                <QrcodeLeitor alunos={alunos} presencas={[]} setPresencas={function (presencas: Presenca[]): void {
                    throw new Error('Function not implemented.');
                }} />
            </Layout>
        </div>
    );
}