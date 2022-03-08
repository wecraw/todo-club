/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserData = /* GraphQL */ `
  subscription OnCreateUserData($owner: String) {
    onCreateUserData(owner: $owner) {
      id
      username
      email
      profilePicture
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateUserData = /* GraphQL */ `
  subscription OnUpdateUserData($owner: String) {
    onUpdateUserData(owner: $owner) {
      id
      username
      email
      profilePicture
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteUserData = /* GraphQL */ `
  subscription OnDeleteUserData($owner: String) {
    onDeleteUserData(owner: $owner) {
      id
      username
      email
      profilePicture
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory($owner: String) {
    onCreateCategory(owner: $owner) {
      id
      name
      todolistID
      Todos {
        items {
          id
          description
          category
          completed
          picture
          categoryID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory($owner: String) {
    onUpdateCategory(owner: $owner) {
      id
      name
      todolistID
      Todos {
        items {
          id
          description
          category
          completed
          picture
          categoryID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory($owner: String) {
    onDeleteCategory(owner: $owner) {
      id
      name
      todolistID
      Todos {
        items {
          id
          description
          category
          completed
          picture
          categoryID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
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
      picture
      categoryID
      createdAt
      updatedAt
      owner
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
      picture
      categoryID
      createdAt
      updatedAt
      owner
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
      picture
      categoryID
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onCreateTodoList = /* GraphQL */ `
  subscription OnCreateTodoList($owner: String) {
    onCreateTodoList(owner: $owner) {
      id
      name
      Categories {
        items {
          id
          name
          todolistID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onUpdateTodoList = /* GraphQL */ `
  subscription OnUpdateTodoList($owner: String) {
    onUpdateTodoList(owner: $owner) {
      id
      name
      Categories {
        items {
          id
          name
          todolistID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const onDeleteTodoList = /* GraphQL */ `
  subscription OnDeleteTodoList($owner: String) {
    onDeleteTodoList(owner: $owner) {
      id
      name
      Categories {
        items {
          id
          name
          todolistID
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
