module.exports = {
  extends: require.resolve("../../babelrc.json"),
  plugins: [
    [
      "import",
      {
        libraryName: "hbs-components",
        customName: (name: string) => {
          return `@hb-components/${name}`;
        },
      },
      "hbs-components",
    ],
  ],
};
