/*Stress Test:

Ramp up de 5 usuários virtuais (VU) em 5 segundos.
Manutenção da carga com 5 VU por 5 segundos.
Ramp up de 50 VU em 2 segundos.
Manutenção da carga com 50 VU por 2 segundos.
Ramp down para 0 VU em 5 segundos.
Limites:

A taxa de falha das requisições deve ser inferior a 1%.*/

import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP
import { check, sleep } from 'k6'; // Importa as funções check e sleep do k6
import { SharedArray } from 'k6/data'; // Importa a função SharedArray do k6
import papaparse from 'https://jslib.k6.io/papaparse/5.1.1/index.js'; // Importa a biblioteca papaparse para parsear arquivos CSV

export const options = { // Define as opções de execução do teste
    stages: [ // Define os estágios de execução do teste
        { duration: '5s', target: 5 }, // Ramp up de 5 VUs em 5 segundos
        { duration: '5s', target: 5 }, // Mantém 5 VUs por 5 segundos
        { duration: '2s', target: 50 }, // Ramp up de 50 VUs em 2 segundos
        { duration: '2s', target: 50 }, // Mantém 50 VUs por 2 segundos
        { duration: '5s', target: 0 }, // Ramp down para 0 VUs em 5 segundos
    ],
    thresholds: { // Define os thresholds (limites) para as métricas
        http_req_failed: ['rate < 0.01'] // A taxa de falha das requisições deve ser inferior a 1%
    }
};

const csvData = new SharedArray('Ler dados', function() {
    return papaparse.parse(open('./usuarios.csv'), { header: true }).data; // Lê e parseia o arquivo CSV, retornando os dados
});

export default function() { // Função principal do teste
    const BASE_URL = 'https://test-api.k6.io'; // Define a URL base para as requisições
    const USER = csvData[Math.floor(Math.random() * csvData.length)].email; // Seleciona um email aleatório do CSV
    const PASS = 'user123'; // Define a senha do usuário

    console.log(USER); // Imprime o email gerado no console

    const res = http.post(`${BASE_URL}/auth/token/login/`, {
        username: USER,
        password: PASS
    }); // Faz uma requisição POST para logar o usuário

    check(res, {
        'sucesso ao logar': (r) => r.status === 200, // Verifica se o status da resposta é 200 (OK)
        'token gerado': (r) => r.json('access') !== '', // Verifica se o token de acesso foi gerado
    });

    sleep(1); // Pausa a execução por 1 segundo
};