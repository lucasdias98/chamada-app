import React, { useState } from 'react';
import Aluno from '@/app/core/Aluno';
import Presenca from '@/app/core/Presenca';
import Modal from 'react-modal';
import { QrReader } from 'react-qr-reader';

interface QrcodeLeitorProps {
    alunos: Aluno[];
    presencas: Presenca[];
    setPresencas: (presencas: Presenca[]) => void;
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '80%', // Ajustar conforme necessário
        maxWidth: '600px', // Ajustar conforme necessário
    },
};

const QrcodeLeitor: React.FC<QrcodeLeitorProps> = ({ alunos, presencas, setPresencas }) => {
    const [message, setMessage] = useState('');
    const [decodedData, setDecodedData] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const handleScan = (result: any) => {
        if (result) {
            const data = result?.text ?? null;
            if (data) {
                // Atualiza o estado com a string decodificada
                setDecodedData(data.replace(/ /g, '+'));
                setError(null);
                // Abre a modal somente se a string for nova
                if (!modalIsOpen) {
                    setModalIsOpen(true);
                }
            }
        }
    };

    const handleError = (error: any) => {
        setError('Erro ao ler o QR code');
        setDecodedData(null);
        console.error(error);
    };

    const handleClear = () => {
        setDecodedData(null);
        setModalIsOpen(false);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleCopy = () => {
        if (decodedData) {
            navigator.clipboard.writeText(decodedData).then(() => {
                setMessage('Texto copiado para a área de transferência!');
            }).catch(err => {
                console.error('Falha ao copiar o texto: ', err);
                setMessage('Erro ao copiar o texto.');
            });
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2>Decodificador de QR Code</h2>
            <div className="mb-4" style={{ width: '300px' }}>
                <QrReader
                    onResult={(result, error) => {
                        if (result) {
                            handleScan(result);
                        } else if (error) {
                            handleError(error);
                        }
                    }}
                    constraints={{ facingMode: 'environment' }} // Configuração básica da câmera
                />
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="QR Code Decodificado"
            >
                <h3>QR Code Decodificado:</h3>
                {decodedData && (
                    <p>{decodedData}</p>
                )}
                <button onClick={handleCopy} style={{ marginRight: '10px' }}>Copiar</button>
                <button onClick={closeModal} style={{ marginRight: '10px' }}>Fechar</button>
                <button onClick={handleClear}>Limpar</button>
                {message && (
                    <p style={{ marginTop: '10px' }}>{message}</p>
                )}
            </Modal>
            {error && (
                <div>
                    <h3>Erro:</h3>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default QrcodeLeitor;
