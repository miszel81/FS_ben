import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constnats';
import { Post } from './entities/Post';
import mikroConfig from './mikro-orm.config';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import cors from 'cors';
import { json } from 'body-parser';

const main = async () => {
  const orm = await MikroORM.init(mikroConfig);
  const emFork = orm.em.fork();

  await orm.getMigrator().up();

  const app = express();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver],
      validate: false,
    }),
  });

  await apolloServer.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async () => ({ emFork }),
    })
  );

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });

  // const post = emFork.create(Post, {
  //   title: 'first post',
  //   createdAt: '',
  //   updatedAt: '',
  // });
  // await emFork.persistAndFlush(post);
};

main();
