import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type CategoryMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type TodoListMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Category {
  readonly id: string;
  readonly title?: string;
  readonly owner: string;
  readonly sharedWith?: (string | null)[];
  readonly todolistID: string;
  readonly Todos?: (Todo | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Category, CategoryMetaData>);
  static copyOf(source: Category, mutator: (draft: MutableModel<Category, CategoryMetaData>) => MutableModel<Category, CategoryMetaData> | void): Category;
}

export declare class Todo {
  readonly id: string;
  readonly description: string;
  readonly category?: string;
  readonly completed?: boolean;
  readonly owner: string;
  readonly completedBy: string;
  readonly sharedWith?: (string | null)[];
  readonly picture?: string;
  readonly todolistID: string;
  readonly categoryID: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Todo, TodoMetaData>);
  static copyOf(source: Todo, mutator: (draft: MutableModel<Todo, TodoMetaData>) => MutableModel<Todo, TodoMetaData> | void): Todo;
}

export declare class TodoList {
  readonly id: string;
  readonly owner: string;
  readonly title: string;
  readonly sharedWith?: (string | null)[];
  readonly Todos?: (Todo | null)[];
  readonly Categories?: (Category | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<TodoList, TodoListMetaData>);
  static copyOf(source: TodoList, mutator: (draft: MutableModel<TodoList, TodoListMetaData>) => MutableModel<TodoList, TodoListMetaData> | void): TodoList;
}