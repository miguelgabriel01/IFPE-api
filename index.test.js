const request = require('supertest');
const app = require('./index');

describe('Teste de Mutação na Rota de Cadastro de Salas', () => {
  it('Deve retornar um código de status 200 e uma mensagem de sucesso ao cadastrar uma nova sala', async () => {
    // Dados da nova sala a ser cadastrada
    const novaSala = {
      abreviado: 'ABC',
      nomeCompleto: 'Sala ABC',
      horarioFuncionamento: '09:00 - 18:00',
      diaFuncionamento: 'Segunda a Sexta',
      responsavel: 'João',
      descricao: 'Sala de reuniões'
    };

    // Faz a solicitação POST para a rota de autenticação
    const responseLogin = await request(app)
      .post('/login')
      .send({ usuario: 'miguel', senha: 'adm123' });

    // Obtém o token de autenticação a partir da resposta do login
    const token = responseLogin.body.tokenLogin;

    // Faz a solicitação POST para a rota de cadastro de salas
    const response = await request(app)
      .post('/salas')
      .set('Authorization', token)
      .send(novaSala);

    // Verifica o código de status da resposta
    expect(response.status).toBe(200);

    // Verifica a mensagem de sucesso na resposta
    expect(response.body.mensagem).toBe('Dados salvos com sucesso');

    // Verifica os dados da sala cadastrada na resposta
    expect(response.body.dadosSalvos).toEqual(expect.objectContaining(novaSala));
  });

  it('Deve retornar um código de status 400 e uma mensagem de erro ao cadastrar uma sala com campos inválidos', async () => {
    // Dados de uma nova sala com campos inválidos
    const salaInvalida = {
      abreviado: '',
      nomeCompleto: 'Sala ABC',
      horarioFuncionamento: '09:00 - 18:00',
      diaFuncionamento: 'Segunda a Sexta',
      responsavel: 'João',
      descricao: 'Sala de reuniões'
    };

    // Faz a solicitação POST para a rota de autenticação
    const responseLogin = await request(app)
      .post('/login')
      .send({ usuario: 'miguel', senha: 'adm123' });

    // Obtém o token de autenticação a partir da resposta do login
    const token = responseLogin.body.tokenLogin;

    // Faz a solicitação POST para a rota de cadastro de salas com campos inválidos
    const response = await request(app)
      .post('/salas')
      .set('Authorization', token)
      .send(salaInvalida);

    // Verifica o código de status da resposta
    expect(response.status).toBe(400);

    // Verifica a mensagem de erro na resposta
    expect(response.body.mensagem).toBe('Erro: Campos obrigatórios faltando ou inválidos');
  });
});
