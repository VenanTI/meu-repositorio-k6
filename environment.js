import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP
import { sleep } from 'k6'; // Importa a função sleep do k6 para pausar a execução

export const options = { // Define as opções de execução do teste
    vus: 2, // Define o número de usuários virtuais (virtual users) que executarão o teste simultaneamente
    duration: '5s' // Define a duração do teste (5 segundos)
};

export default function () { // Função principal do teste
    const BASE_URL = __ENV.URL; // Define a URL base para as requisições a partir da variável de ambiente URL

    const res = http.get(BASE_URL); // Faz uma requisição GET para a URL base

    sleep(1); // Pausa a execução por 1 segundo
}