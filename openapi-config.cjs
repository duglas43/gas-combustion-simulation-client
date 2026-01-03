module.exports = {
  schemaFile: "http://localhost:3000/api/docs.json",
  apiFile: "./src/shared/api/emptyApi.ts",
  apiImport: "emptySplitApi",
  useEnumType: true,
  tag: true,
  outputFile: "./src/shared/api/openapi-generated.ts",
  hooks: {
    lazyQueries: true,
    mutations: true,
    queries: true,
  },
};
