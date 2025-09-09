import supertest from 'supertest';
import { assert } from 'console';
import 'jest-extended';
import app from '../../src/app';
import { jeuRoutes } from "../../src/routes/jeuRouter";

const request = supertest(app);

const testNom1 = 'Jean-Marc';
const testNom2 = 'Pierre';

beforeAll(async () => {
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom1 });
    await request.post('/api/v1/jeu/demarrerJeu').send({ nom: testNom2 });
});

describe('GET /api/v1/jeu/redemarrerJeu', () => {
  it("devrait répondre avec un appel réussi en json", async () => {
    const response = await request.get("/api/v1/jeu/redemarrerJeu");
    expect(response.status).toBe(200);
    expect(response.type).toBe("application/json");
  });

  it("devrait ne plus y avoir de joueur", async () =>{
    const response = await request.get('/api/v1/jeu/redemarrerJeu');
    expect(response.statusCode).toBe(200);
    const joueursJSON = jeuRoutes.controleurJeu.joueurs;
    const joueursArray = JSON.parse(joueursJSON);
    expect(joueursArray.length).toBe(0);
  });
});
