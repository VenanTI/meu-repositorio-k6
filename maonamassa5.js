/*Consulta à API:

Realizar uma requisição para a API de listagem de crocodilos e para a busca por ID de crocodilos.
Requisitos de Performance:

A API de listagem de crocodilos deve suportar uma taxa de 200 requisições por segundo (REQ/S) durante 30 segundos.
Busca por ID:

O sistema deve atender 50 usuários simultaneamente, onde cada usuário realiza até 20 solicitações no intervalo de 1 minuto.
Os usuários seguirão a seguinte lógica de busca:
Usuários com ID par devem buscar o crocodilo de ID 2.
Usuários com ID ímpar devem buscar o crocodilo de ID 1.
Execução:

Ambos os testes (listagem e busca por ID) devem ser executados simultaneamente.*/ 

import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP

export const options = { // Define as opções de execução do teste
    scenarios: { // Define os cenários de execução do teste
        listar: { // Cenário para a listagem de crocodilos
            executor: 'constant-arrival-rate', // Define o tipo de executor como 'constant-arrival-rate'
            exec: 'listar', // Define a função a ser executada para este cenário
            duration: '30s', // Define a duração do teste (30 segundos)
            rate: 200, // Define a taxa constante de chegada de 200 iterações por segundo
            timeUnit: '1s', // Define a unidade de tempo para a taxa de chegada (1 segundo)
            preAllocatedVUs: 150, // Define o número de usuários virtuais pré-alocados para o teste
            gracefulStop: '10s', // Define o tempo de parada graciosa (10 segundos)
            tags: { test_type: 'listagem de crocodilos' } // Adiciona uma tag para identificar o tipo de teste
        },
        buscar: { // Cenário para a busca por ID de crocodilos
            executor: 'per-vu-iterations', // Define o tipo de executor como 'per-vu-iterations'
            exec: 'buscar', // Define a função a ser executada para este cenário
            vus: 50, // Define o número de usuários virtuais
            iterations: 20, // Define o número de iterações por usuário virtual
            maxDuration: '1m', // Define a duração máxima do teste (1 minuto)
            gracefulStop: '10s', // Define o tempo de parada graciosa (10 segundos)
            tags: { test_type: 'busca_de_crocodilos' } // Adiciona uma tag para identificar o tipo de teste
        }
    }
};

export function listar() { // Função para a listagem de crocodilos
    http.get(__ENV.URL + '/crocodiles'); // Faz uma requisição GET para a URL de listagem de crocodilos
};

export function buscar() { // Função para a busca por ID de crocodilos
    if (__VU % 2 == 0) { // Verifica se o ID do usuário virtual é par
        http.get(__ENV.URL + '/crocodiles/2'); // Faz uma requisição GET para o crocodilo de ID 2
    } else { // Se o ID do usuário virtual for ímpar
        http.get(__ENV.URL + '/crocodiles/1'); // Faz uma requisição GET para o crocodilo de ID 1
    }
}