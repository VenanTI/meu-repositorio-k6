import { check, group } from 'k6'; // Importa as funções check e group do k6
import http from 'k6/http'; // Importa o módulo HTTP do k6 para fazer requisições HTTP

export const options = { // Define as opções de execução do teste
    vus: 4, // Define o número de usuários virtuais (virtual users)
    duration: '5s', // Define a duração do teste
    thresholds: { // Define os thresholds (limites) para as métricas
        'http_req_duration{group:::requisição por id}': ['p(95) < 500'] // Define que 95% das requisições no grupo 'requisição por id' devem ser menores que 500ms
    }
};

export default function() { // Função principal do teste
    group('requisição todos os crocodilos', function() { // Define um grupo de requisições chamado 'requisição todos os crocodilos'
        const response1 = http.get('https://test-api.k6.io/public/crocodiles/'); // Faz uma requisição GET para obter todos os crocodilos
        check(response1, { // Verifica a resposta da requisição
            'status code 200 get all': (r) => r.status === 200 // Verifica se o status da resposta é 200 (OK)
        });
    });
    
    group('requisição por id', function() { // Define um grupo de requisições chamado 'requisição por id'
        const response2 = http.get('https://test-api.k6.io/public/crocodiles/1/'); // Faz uma requisição GET para obter um crocodilo específico pelo ID
        check(response2, { // Verifica a resposta da requisição
            'status code 200 get id': (r) => r.status === 200 // Verifica se o status da resposta é 200 (OK)
        }); 
    });
}