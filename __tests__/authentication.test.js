import gql from 'graphql-tag';
import request from 'supertest';
import { usersTokens, defaultUsers } from './seed/users';
import micro from 'micro';
import { apolloServer } from '../pages/api/graphql';
import middleware from './../utils/middlewares/middleware';

// start test server
function createServer(options = { path: '/api/graphql' }) {
  const app = micro(middleware(apolloServer.createHandler(options)));
  return app;
}

const CURRENT_USER = `{
  currentUser {
    _id
    email
  }
}`;

describe('authentication', () => {
  describe('QUERIES', () => {
    describe('currentUser', () => {
      it('should return Unauthenticated if not logged in', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .send({ query: CURRENT_USER });

        const res = await req;
        expect(res.status).toEqual(200);
        expect(res.body.errors[0].message).toBe('Unauthenticated');
        app.close();
        done();
      });

      it('should return current user', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .set('Cookie', `token=${usersTokens.normal}; HttpOnly`)
          .send({ query: CURRENT_USER });

        const res = await req;
        expect(res.status).toEqual(200);
        expect(res.body.data.currentUser.email).toBe(defaultUsers.normal.email);
        app.close();
        done();
      });
    })
    describe('user', () => {
      const USER = {
        query: `
          query user($id: ID!) {
            user(id: $id) {
              _id
              email
            }
          }
        `,
        variables: `{"id": "${defaultUsers.normal._id}"}`,
      }
      test('should return user to admin', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .set('Cookie', `token=${usersTokens.admin}; HttpOnly`)
          .send(USER);

        const res = await req;
        expect((res => {
          expect(res.status).toEqual(200)
          expect(res.body.data.user._id).toBe(
            defaultUsers.normal._id.toHexString()
          )
          expect(res.body.data.user.email).toBe(defaultUsers.normal.email)
        }));
        app.close();
        done();
      })
      test('should return user to moderator', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .set('Cookie', `token=${usersTokens.moderator}; HttpOnly`)
          .send(USER);

        const res = await req;
        expect((res => {
          expect(res.status).toEqual(200)
          expect(res.body.data.user._id).toBe(
            defaultUsers.normal._id.toHexString()
          )
          expect(res.body.data.user.email).toBe(defaultUsers.normal.email)
        }));
        app.close();
        done();
      })
      test('should return user to owner', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .set('Cookie', `token=${usersTokens.normal}; HttpOnly`)
          .send(USER);

        const res = await req;
        expect((res => {
          expect(res.status).toEqual(200)
          expect(res.body.data.user._id).toBe(
            defaultUsers.normal._id.toHexString()
          )
          expect(res.body.data.user.email).toBe(defaultUsers.normal.email)
        }));
        app.close();
        done();
      })
      test('should return Unauthorized field email to other user', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .set('Cookie', `token=${usersTokens.normalAlt}; HttpOnly`)
          .send(USER);

        const res = await req;
        expect((res => {
          expect(res.status).toEqual(200)
          expect(res.body.errors[0].extensions.code).toBe('Unauthorized field email')
        }));
        app.close();
        done();
      })
      test('should return Unauthenticated field email to public', async done => {
        const app = createServer();
        const req = request(app)
          .post('/api/graphql')
          .send(USER);

        const res = await req;
        expect((res => {
          expect(res.status).toEqual(200)
          expect(res.body.errors[0].extensions.code).toBe('Unauthenticated field email')
        }));
        app.close();
        done();
      })
    })
  });
});
