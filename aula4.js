import http from 'k6/http';
//import {check} from 'k6';
import {Counter} from 'k6/metrics'; //importando a função Counter do k6
import { Gauge } from 'k6/metrics'; //importando a função Gauge do k6
import { Rate } from 'k6/metrics';  //importando a função Rate do k6
import { Trend } from 'k6/metrics'; //importando a função Trend do k6

export const options = {

    vus: 1,
    duration: '3s'
}

const chamadas = new Counter('quantidade_de_chamadas'); //criando um contador
const myGauge = new Gauge ('tempo_bloqueado'); //criando um medidor
const myRate = new Rate('taxa_req_200'); //criando uma taxa
const myTrend = new Trend('tempo_resposta'); //criando uma tendência

export default function(){
    const res = http.get('http://test.k6.io')
    //contador
    chamadas.add(1) //incrementando o contador
    //medidor
    myGauge.add(res.timings.blocked); //adicionando o tempo bloqueado
    //taxa
    myRate.add(res.status === 200); //verificando se o status é 200
    //tendencia
    myTrend.add(res.timings.waiting); //adicionando o tempo de espera
}
