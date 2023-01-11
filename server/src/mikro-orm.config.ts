import { Post } from './entities/Post';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constnats';
import path from 'path';
import { User } from './entities/User';

export default {
  migrations: {
    path: path.join(__dirname, './migrations'),
    // pattern: /^[\w-]+\d+\.[tj]s$/,
    glob: '!(*.d).{js,ts}',
  },
  entities: [Post, User],
  dbName: 'fullBen',
  debug: !__prod__,
  type: 'postgresql',
} as Parameters<typeof MikroORM.init>[0];
