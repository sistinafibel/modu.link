import request from 'supertest';
import App from '../app';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

// https://velog.io/@pandati0710/Jest-%EC%82%AC%EC%9A%A9%EB%B2%95
describe('TEST', () => {
  describe('게시판 조회', () => {
    it('[GET] /board/free : 회원 게시판 조회', async done => {
      const reoute = new BoardRoute();
      const app = new App([reoute]);
      const res = await request(app.getServer()).get('/board/free').set({ authorization: userToken.authorization });
      expect(res.status).toBe(200);
      done();
    });
  });
});
