import { MyContext } from 'src/types';
import { Resolver, Mutation, InputType, Field, Arg, Ctx } from 'type-graphql';
import { User } from 'src/entities/User';

@InputType()
class UnsernamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  async register(
    @Arg('options') options: UnsernamePasswordInput,
    @Ctx() { emFork }: MyContext
  ) {
    const user = emFork.create(User, {
      username: options.username,
      createdAt: '',
      updatedAt: '',
      password: '',
    });
    await emFork.persistAndFlush(user);
  }
}
