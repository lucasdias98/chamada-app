'use client';
import { useState } from 'react';
import Layout from '../components/chamada/layout';
import TabelaQRcode from '../components/chamada/tabelaQRcode';
import Aluno from '../core/Aluno';

export default function Eventos() {

    const alunos = Aluno.geraEventosMock();

    return (
        <div className={`flex justify-center items-center h-screen bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 text-white`}>
            <Layout titulo="Lista de QRcode">
                <TabelaQRcode alunos={alunos}></TabelaQRcode>
            </Layout>
        </div>
    );
}