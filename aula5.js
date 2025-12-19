import http from 'k6/http'; // importando a função http do k6
import {check} from 'k6'; // importando a função check do k6

export const options = { //definindo as opções de execução do teste

    vus: 1, // 1 user looping for 3 seconds
    duration: '3s', //tempo de execução do teste
    thresholds: { 
        'http_req_failed': ['rate < 0.01'], // http errors should be less than 1%
        'http_req_duration': [
            { threshold: 'p(95) < 200', abortOnFail: true}
             //delayAbortEval: '10s' } 
            // threshold: 'p(95) < 200' - Define que o 95º percentil das requisições HTTP deve ser menor que 200ms.
            // abortOnFail: true - Se o threshold for violado, o teste será abortado imediatamente.
            // delayAbortEval: '10s' - Adiciona um atraso de 10 segundos antes de avaliar se o teste deve ser abortado
        ],
        checks: ['rate>0.9'] //verifica se a taxa de sucesso é maior que 90%    
    }
}

export default function(){ //função principal do teste
    const res = http.get('http://test.k6.io'); //executando uma requisição GET
    check(res, { //validando a resposta
        'is status 200': (r) => r.status === 200, //validando se o status da resposta é 200
    }); 
}