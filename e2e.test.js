const request = require('supertest');
const app = require('./index');
// ...

describe('Teste de Autenticação', () => {
    it('Deve retornar um token de autenticação válido ao fornecer as credenciais corretas', async () => {
      const credenciais = {
        usuario: 'miguel',
        senha: 'adm123',
      };
  
      const response = await request(app)
        .post('/login')
        .send(credenciais);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('tokenLogin');
    });
  });
  
  // ...
// ...

describe('Teste de Listagem de Salas', () => {
    it('Deve retornar um código de status 200 e uma lista válida de salas', async () => {
      // Obtém o token de autenticação
      const credenciais = {
        usuario: 'miguel',
        senha: 'adm123',
      };
  
      const loginResponse = await request(app)
        .post('/login')
        .send(credenciais);
  
      const token = loginResponse.body.tokenLogin;
  
      // Faz a solicitação GET para a rota de listagem de salas com autenticação
      const response = await request(app)
        .get('/salas')
        .set('Authorization', token);
  
      expect(response.status).toBe(200);
      expect(response.body).toBeInstanceOf(Array);
    });
  });
  
  // ...
// ...

describe('Teste de Obtenção de Dados de Sala Específica', () => {
    it('Deve retornar um código de status 200 e os dados corretos da sala', async () => {
      // Obtém o token de autenticação
      const credenciais = {
        usuario: 'miguel',
        senha: 'adm123',
      };
  
      const loginResponse = await request(app)
        .post('/login')
        .send(credenciais);
  
      const token = loginResponse.body.tokenLogin;
  
      // Escolha um ID de sala existente para testar
      const idSala = 1;
  
      // Faz a solicitação GET para a rota de obtenção de dados da sala com autenticação
      const response = await request(app)
        .get(`/salas/${idSala}`)
        .set('Authorization', token);
  
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id', idSala);
    });
  });
  
  // ...
      
// ...

/*
describe('Teste de Cadastro de Nova Sala', () => {
    it('Deve retornar um código de status 200 e uma mensagem de sucesso ao cadastrar uma nova sala', async () => {
      // Obtém o token de autenticação
      const credenciais = {
        usuario: 'miguel',
        senha: 'adm123',
      };
  
      const loginResponse = await request(app)
        .post('/login')
        .send(credenciais);
  
      const token = loginResponse.body.tokenLogin;
  
      // Dados da nova sala a ser cadastrada
      const novaSala = {
        abreviado: 'ABC',
        nomeCompleto: 'Sala ABC',
        horarioFuncionamento: '09:00 - 18:00',
        diaFuncionamento: 'Segunda a Sexta',
        responsavel: 'João',
        descricao: 'Sala de reuniões',
      };
  
      // Faz a solicitação POST para a rota de cadastro de salas com autenticação
      const response = await request(app)
        .post('/salas')
        .set('Authorization', token)
        .send(novaSala);
  
      expect(response.status).toBe(200);
      expect(response.body.mensagem).toBe('Dados salvos com sucesso');
      expect(response.body.dadosSalvos).toEqual(expect.objectContaining(novaSala));
    });
  });
  */
  // ...

  // ...

describe('Teste de Atualização de Sala Existente', () => {
    it('Deve retornar um código de status 200 e uma mensagem de sucesso ao atualizar uma sala existente', async () => {
      // Obtém o token de autenticação
      const credenciais = {
        usuario: 'miguel',
        senha: 'adm123',
      };
  
      const loginResponse = await request(app)
        .post('/login')
        .send(credenciais);
  
      const token = loginResponse.body.tokenLogin;
  
      // Escolha um ID de sala existente para testar
      const idSala = 1;
  
      // Dados atualizados da sala
      const novosValores = {
        abreviado: 'XYZ',
        nomeCompleto: 'Sala XYZ',
        horarioFuncionamento: '10:00 - 19:00',
        diaFuncionamento: 'Segunda a Sábado',
        responsavel: 'Maria',
        descricao: 'Sala de treinamentos',
      };
  
      // Faz a solicitação PUT para a rota de atualização da sala com autenticação
      const response = await request(app)
        .put(`/salas/${idSala}`)
        .set('Authorization', token)
        .send(novosValores);
  
      expect(response.status).toBe(200);
      expect(response.body.mensagem).toBe('Sala atualizada com sucesso');
    });
  });
  
  // ...

  