'use client';
import { useState } from 'react';
import Layout from '../components/chamada/layout';
import QrcodeLeitor from '../components/chamada/qrcodeLeitor';
import Aluno from '../core/Aluno';
import Presenca from '../core/Presenca';

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
