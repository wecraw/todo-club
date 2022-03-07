/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      title
      owner
      sharedWith
      todolistID
      Todos {
        items {
          id
          description
          category
          completed
          owner
          completedBy
          sharedWith
          picture
          todolistID
          categoryID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listCategories = /* GraphQL */ `
  query ListCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        owner
        sharedWith
        todolistID
        Todos {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCategories = /* GraphQL */ `
  query SyncCategories(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCategories(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        title
        owner
        sharedWith
        todolistID
        Todos {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      description
      category
      completed
      owner
      completedBy
      sharedWith
      picture
      todolistID
      categoryID
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        category
        completed
        owner
        completedBy
        sharedWith
        picture
        todolistID
        categoryID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTodos = /* GraphQL */ `
  query SyncTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTodos(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        description
        category
        completed
        owner
        completedBy
        sharedWith
        picture
        todolistID
        categoryID
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getTodoList = /* GraphQL */ `
  query GetTodoList($id: ID!) {
    getTodoList(id: $id) {
      id
      owner
      title
      sharedWith
      Todos {
        items {
          id
          description
          category
          completed
          owner
          completedBy
          sharedWith
          picture
          todolistID
          categoryID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      Categories {
        items {
          id
          title
          owner
          sharedWith
          todolistID
          createdAt
          updatedAt
          _version
          _deleted
          _lastChangedAt
        }
        nextToken
        startedAt
      }
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const listTodoLists = /* GraphQL */ `
  query ListTodoLists(
    $filter: ModelTodoListFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodoLists(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        title
        sharedWith
        Todos {
          nextToken
          startedAt
        }
        Categories {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncTodoLists = /* GraphQL */ `
  query SyncTodoLists(
    $filter: ModelTodoListFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncTodoLists(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        owner
        title
        sharedWith
        Todos {
          nextToken
          startedAt
        }
        Categories {
          nextToken
          startedAt
        }
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
