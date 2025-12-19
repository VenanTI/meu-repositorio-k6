//default
// Importa o módulo HTTP do k6 para fazer requisições HTTP
import http from 'k6/http';
import { sleep, check } from 'k6';  

//remoto
// Importa as configurações AWS e o cliente S3 da biblioteca remota do k6
import { AWSConfig, S3Client } from 'https://jslib.k6.io/aws/0.4.0/s3.js';

//local
// Importa uma função local chamada runTest do arquivo aula1.js
import runTest from './teste1.js';

// Função principal do teste
export default function() {
  // Faz uma requisição GET para o URL especificado
  let res = http.get("http://test.k6.io");

  // Pausa a execução por 1 segundo
  sleep(1);

  // Verifica se a resposta da requisição tem status 200
  check(res, {
      "status is 200": (r) => r.status === 200,
  });
}