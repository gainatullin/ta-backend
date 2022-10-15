import { User } from '../user/user.entity';

export type TRequest = Request & { user: User };
