import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:9000",
  documents: ["src/graphql/*.ts"],
  generates: {
    "./src/gql/": {
      preset: "client",
    },
  },
};

export default config;
