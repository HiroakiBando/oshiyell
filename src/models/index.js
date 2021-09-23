// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const UserType = {
  "STUDENT": "STUDENT",
  "TEACHER": "TEACHER"
};

const { Timeline, User, Todo } = initSchema(schema);

export {
  Timeline,
  User,
  Todo,
  UserType
};