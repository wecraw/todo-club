// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserData, Category, Todo, TodoList } = initSchema(schema);

export {
  UserData,
  Category,
  Todo,
  TodoList
};