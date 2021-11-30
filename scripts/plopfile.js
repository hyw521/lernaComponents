const path = require("path");
const execSync = require("child_process").execSync;
const author = execSync("git show -s --format=%cn").toString().trim();
const email = execSync("git show -s --format=%ae").toString().trim();
const gitAddress = execSync("git remote -v")
  .toString()
  .trim()
  .split(" ")[0]
  .split("\t")[1]
  .slice(0, -4);
module.exports = function (plop) {
  plop.setGenerator("component", {
    description: "创建一个新组件",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "请输入组件名称（多个单词以中横线命名）",
      },
      { type: "input", name: "CN", message: "请输入组件中文名称" },
      { type: "input", name: "US", message: "请输入组件英文名称" },
      { type: "input", name: "description-CN", message: "请输入组件中文描述" },
      { type: "input", name: "description-US", message: "请输入组件英文描述" },
    ],
    actions: [
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/src/index.tsx"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/comp.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/src/type.ts"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/type.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/src/style/index.less"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/style/style.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/src/style/index.ts"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/style/index.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/index.zh-CN.md"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/doc-CN.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/index.en-US.md"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/doc-US.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/.babelrc.js"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/.babelrc.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/gulpfile.js"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/gulpfile.hbs"
        ),
      },
      {
        type: "add",
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/tsconfig.json"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/tsconfig.hbs"
        ),
      },
      {
        type: "add",
        data: {
          author: author,
          gitAddress: gitAddress,
          email: email,
        },
        path: path.resolve(
          __dirname,
          "../packages/{{kebabCase name}}/package.json"
        ),
        templateFile: path.resolve(
          __dirname,
          "../templates/component/package.hbs"
        ),
      },
      // {
      //   type: "append",
      //   path: path.resolve(__dirname, "../packages/index.ts"),
      //   pattern: "/* PLOP_INJECT_EXPORT */",
      //   template:
      //     "export { default as {{pascalCase name}} } from './{{kebabCase name}}';",
      // },
    ],
  });
};
