import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP

export const options = { // Define as opções de execução do teste
    scenarios: { // Define os cenários de execução do teste
        constantArrivalRate: { // Nome do cenário
            executor: 'constant-arrival-rate', // Define o tipo de executor como 'constant-arrival-rate'
            duration: '30s', // Define a duração do teste (30 segundos)
            rate: 30, // Define a taxa constante de chegada de 30 iterações por segundo
            timeUnit: '1s', // Define a unidade de tempo para a taxa de chegada (1 segundo)
            preAllocatedVUs: 50, // Define o número de usuários virtuais pré-alocados para o teste
        },
    },
};

export default function () { // Função principal do teste
    http.get('https://test.k6.io/contacts.php'); // Faz uma requisição GET para a URL especificada
}