import Amplify, {
  API,
  graphqlOperation
} from 'aws-amplify';

import awsExportConfig from 'aws-exports';

Amplify.configure(awsExportConfig);

const listQuestions = async (type) => {
  const query = `
    query {
      listQuestions (
        filter: {
          type:{
            eq: "${type}"
          }
        }
        limit: 1000
      ) {
        items{
          id,
          name,
          type
        }
      }
    }`;
  const result = await API.graphql(graphqlOperation(query));
  return result;
};

const createQuestion = async (data) => {
  const {
    tags,
    name,
    code: content,
    test,
    type
  } = data;
  const params = {
    input: {
      name,
      content,
      test,
      tags,
      type
    }
  };
  const query = `mutation CreateQuestion($input: CreateQuestionInput!) {
    createQuestion(input: $input) {
      id
      name
      content
      test
      type
      tags
    }
  }`;
  const result = await API.graphql(graphqlOperation(query, params));
  console.log(result);
  return result;
};

const getQuestion = async (data) => {
  const { id } = data;
  const query = `query {
    getQuestion(id: "${id}") {
      content,
      test,
      tags
    }
  }`;
  const result = await API.graphql(graphqlOperation(query));
  return result;
};

const updateQuestion = async (data) => {
  const {
    id,
    content,
    test,
    tags
  } = data;
  const params = {
    input: {
      id,
      content,
      test,
      tags
    }
  };
  const query = `mutation UpdateQuestion($input: UpdateQuestionInput!) {
    updateQuestion(input: $input) {
      id
      content
      test
      tags
    }
  }`;
  const result = await API.graphql(graphqlOperation(query, params));
  return result;
};

export {
  listQuestions,
  createQuestion,
  getQuestion,
  updateQuestion
};
