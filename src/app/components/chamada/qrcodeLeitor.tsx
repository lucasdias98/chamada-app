// components/chamada/qrcodeLeitor.tsx
/*
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Aluno from '@/app/core/Aluno';
import Presenca from '@/app/core/Presenca';
import Botao from './botao';
import { QrReader } from 'react-qr-reader';

interface QrcodeLeitorProps {
    alunos: Aluno[];
    presencas: Presenca[];
    setPresencas: (presencas: Presenca[]) => void;
}
*/
import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import Aluno from '@/app/core/Aluno';
import Presenca from '@/app/core/Presenca';
import Botao from './botao';
import { QrReader } from 'react-qr-reader';

interface QrcodeLeitorProps {
    alunos: Aluno[];
    presencas: Presenca[];
    setPresencas: (presencas: Presenca[]) => void;
}

const QrcodeLeitor: React.FC<QrcodeLeitorProps> = ({ alunos, presencas, setPresencas }) => {
    const [showScanner, setShowScanner] = useState(false);
    const [message, setMessage] = useState('');

    const handleResult = (result: any, error: any) => {
        if (result) {
            const data = result.text;
            const aluno = alunos.find(aluno => aluno.qrcode === data);
            if (aluno) {
                // Marcar presença na data atual
                const today = new Date().toLocaleDateString();
                const novaPresenca = new Presenca(aluno.id, today);
                setPresencas([...presencas, novaPresenca]);
                setMessage(`Presença registrada para ${aluno.nome} em ${today}`);
                setShowScanner(false);
            } else {
                setMessage('QR code não reconhecido');
            }
        }

        if (error) {
            console.error(error);
            setMessage('Erro ao ler o QR code');
        }
    };

    return (
        <div className="flex flex-col items-center">
            <Botao className="mr-3 mb-4" cor="bg-gradient-to-r from-blue-500 to-blue-700"
                onClick={() => setShowScanner(!showScanner)}>
                {showScanner ? 'Fechar Leitor' : 'Iniciar Leitor de QR Code'}
            </Botao>
            {showScanner && (
                <div className="mb-4">
                    <QrReader
                        onResult={handleResult}
                        style={{ width: '300px' }}
                    />
                </div>
            )}
            {message && <p>{message}</p>}
            <div className="grid grid-cols-4 gap-4">
                {alunos.map((aluno, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                        <QRCode value={aluno.qrcode} />
                        <p>{aluno.nome}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default QrcodeLeitor;
