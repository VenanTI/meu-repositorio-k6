import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP
import { sleep } from 'k6'; // Importa a função sleep do k6 para pausar a execução

export const options = { // Define as opções de execução do teste
    scenarios: { // Define os cenários de execução do teste
        contacts: { // Nome do cenário
            executor: 'per-vu-iterations', // Define o tipo de executor como 'per-vu-iterations'
            vus: 10, // Define o número de usuários virtuais (virtual users) que executarão o teste simultaneamente
            iterations: 20, // Define o número total de iterações (requisições) que serão executadas
            maxDuration: '30s', // Define a duração máxima do teste (30 segundos)
        },
    },
};

export default function () { // Função principal do teste
    http.get('https://test.k6.io/contacts.php'); // Faz uma requisição GET para a URL especificada
    sleep(0.5); // Pausa a execução por 0.5 segundos    
}
