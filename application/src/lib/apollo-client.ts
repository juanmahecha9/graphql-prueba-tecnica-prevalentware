import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:8080/graphql", // Reemplaza con tu URI GraphQL
      credentials: "include", // Ajusta según tus necesidades
    }),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
