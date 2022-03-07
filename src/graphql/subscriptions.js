/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String) {
    onCreateCategory(owner: $owner) {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String) {
    onUpdateCategory(owner: $owner) {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String) {
    onDeleteCategory(owner: $owner) {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo($owner: String) {
    onCreateTodo(owner: $owner) {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo($owner: String) {
    onUpdateTodo(owner: $owner) {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo($owner: String) {
    onDeleteTodo(owner: $owner) {
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
export const onCreateTodoList = /* GraphQL */ `
  subscription OnCreateTodoList($owner: String) {
    onCreateTodoList(owner: $owner) {
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
export const onUpdateTodoList = /* GraphQL */ `
  subscription OnUpdateTodoList($owner: String) {
    onUpdateTodoList(owner: $owner) {
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
export const onDeleteTodoList = /* GraphQL */ `
  subscription OnDeleteTodoList($owner: String) {
    onDeleteTodoList(owner: $owner) {
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
