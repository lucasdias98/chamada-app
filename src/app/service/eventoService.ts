import axios from 'axios';
import Aluno from '../core/Aluno';

interface ApiResponse {
content: Aluno[];
}
const BASE_URL = 'http://localhost:8080';
export const fetchAlunos = async (): Promise<Aluno[]> => {
 try {
 const response = await axios.get<ApiResponse>(`${BASE_URL}/eventos`);
 return response.data.content;
 } catch (error) {
 throw new Error('Erro ao buscar eventos');
 }};