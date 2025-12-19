import { group, check } from 'k6'; // Importa as funções group e check do k6
import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP

export const options = { // Define as opções de execução do teste
    vus: 1, // Define o número de usuários virtuais (virtual users) que executarão o teste simultaneamente
    duration: '3s', // Define a duração do teste (3 segundos)
    tags: {
        name: 'meu-test' // Define uma tag chamada 'name' com o valor 'meu-test' para identificar o teste
    },
    thresholds: { // Define os thresholds (limites) para as métricas
        'http_req_duration{tipo:busca-todos}': ['p(95) < 500'] // Define que 95% das requisições no grupo 'busca-todos' devem ser menores que 500ms
    }
};

const id = 7; // Define uma constante 'id' com o valor 7, que será usada nas requisições

export default function () { // Função principal do teste
    group('exemple post', function () { // Define um grupo de requisições chamado 'exemple post'
        const res = http.get(`https://test-api.k6.io/public/crocodiles/`, { // Faz uma requisição GET para obter todos os crocodilos
            tags: {
                tipo: "busca-todos" // Adiciona uma tag 'tipo' com o valor 'busca-todos' à requisição
            }
        });
        check(res, { // Verifica a resposta da requisição
            'is status 200': (r) => r.status === 200, // Verifica se o status da resposta é 200 (OK)
        });
    });

    group('exemple post id', function () { // Define um grupo de requisições chamado 'exemple post id'
        const res2 = http.get(`https://test-api.k6.io/public/crocodiles/${id}`); // Faz uma requisição GET para obter um crocodilo específico pelo ID
        check(res2, { // Verifica a resposta da requisição
            'is status 200': (r) => r.status === 200, // Verifica se o status da resposta é 200 (OK)
        });
    });
}