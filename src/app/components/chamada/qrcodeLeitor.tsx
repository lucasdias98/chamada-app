import React, { useState } from 'react';
import Aluno from '@/app/core/Aluno';
import Presenca from '@/app/core/Presenca';
import Modal from 'react-modal';
import { QrReader } from 'react-qr-reader';
import QrScanner from 'qr-scanner';
import Botao from './botao';

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
    const [id, setId] = useState<string | null>(null);
    const [scannerActive, setScannerActive] = useState(false);

    const handleScan = (result: any) => {
        if (result) {
            const data = result?.text ?? null;
            if (data) {
                setDecodedData(data.replace(/ /g, '+'));
                setError(null);
                if (!modalIsOpen) {
                    setModalIsOpen(true);
                }
            }
        }
    };

    const handleError = (error: any) => {
        console.error('Erro ao ler o QR code:', error);
        setError('Erro ao ler o QR code');
    };

    const handleClear = () => {
        setDecodedData(null);
        setModalIsOpen(false);
        setScannerActive(false);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setScannerActive(false);
    };

    const handleCopy = () => {
        if (decodedData) {
            navigator.clipboard.writeText(decodedData).then(() => {
                setMessage('Texto copiado para a área de transferência!');
            }).catch(err => {
                console.error('Falha ao copiar o texto:', err);
                setMessage('Erro ao copiar o texto.');
            });
        }
    };

    /*
    const handleDecode = () => {
        if (decodedData) {
            try {
                const imageUrl = `data:image/png;base64,${decodedData}`;
                QrScanner.scanImage(imageUrl)
                    .then(result => {
                        setId(result); // Ajustar para extrair o ID específico do resultado
                        // Enviar ID para o back-end para verificação
                        fetch('/api/verify', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ id: result })
                        })
                        .then(response => response.json())
                        .then(data => {
                            if (data.success) {
                                setMessage('Aluno verificado com sucesso!');
                                // Atualizar presenças ou realizar outras ações conforme necessário
                            } else {
                                setMessage('Falha na verificação do aluno.');
                            }
                        })
                        .catch(err => {
                            console.error('Erro ao verificar o aluno:', err);
                            setMessage('Erro ao verificar o aluno.');
                        });
                    })
                    .catch(err => {
                        console.error('Erro ao decodificar a imagem:', err);
                    });
            } catch (error) {
                console.error('Erro ao processar a string Base64:', error);
            }
        }
    };
    */

    const handleDecode = () => {
    if (decodedData) {
        try {
            const imageUrl = `data:image/png;base64,${decodedData}`;
            QrScanner.scanImage(imageUrl)
                .then(result => {
                    setId(result); // Ajustar para extrair o ID específico do resultado
                    // Enviar ID para o back-end para verificação
                    fetch('/api/verify', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ id: result })
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            setMessage(`Aluno verificado com sucesso - ${data.aluno.nome}`);
                            // Atualizar presenças ou realizar outras ações conforme necessário
                        } else {
                            setMessage('Falha na verificação do aluno.');
                        }
                    })
                    .catch(err => {
                        console.error('Erro ao verificar o aluno:', err);
                        setMessage('Erro ao verificar o aluno.');
                    });
                })
                .catch(err => {
                    console.error('Erro ao decodificar a imagem:', err);
                });
        } catch (error) {
            console.error('Erro ao processar a string Base64:', error);
        }
    }
};


    const startScanner = () => {
        setScannerActive(true);
        setError(null); // Limpa o erro quando o scanner é ativado
    };

    return (
        <div className="flex flex-col items-center">
            <Botao className="mb-4" cor="bg-gradient-to-r from-blue-700 to-blue-900" onClick={startScanner}>
                Ler QRCODE
            </Botao>
            {scannerActive && (
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
            )}
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
                <Botao className="mb-4" cor="bg-gradient-to-r from-blue-700 to-blue-900" onClick={closeModal}>
                    Fechar
                </Botao>
                &nbsp;&nbsp;&nbsp;
                <Botao className="mb-4" cor="bg-gradient-to-r from-blue-700 to-blue-900" onClick={handleDecode}>
                    Exibir ID
                </Botao>
                {id && (
                    <p style={{ marginTop: '10px' }}>ID Decodificado: {id}</p>
                )}
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
