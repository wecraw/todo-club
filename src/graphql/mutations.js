/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createTodo = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
export const createTodoList = /* GraphQL */ `
  mutation CreateTodoList(
    $input: CreateTodoListInput!
    $condition: ModelTodoListConditionInput
  ) {
    createTodoList(input: $input, condition: $condition) {
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
export const updateTodoList = /* GraphQL */ `
  mutation UpdateTodoList(
    $input: UpdateTodoListInput!
    $condition: ModelTodoListConditionInput
  ) {
    updateTodoList(input: $input, condition: $condition) {
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
export const deleteTodoList = /* GraphQL */ `
  mutation DeleteTodoList(
    $input: DeleteTodoListInput!
    $condition: ModelTodoListConditionInput
  ) {
    deleteTodoList(input: $input, condition: $condition) {
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
