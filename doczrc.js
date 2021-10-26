export default {
    title: 'bre-component', // 网站的标题
    typescript: true, // 若是须要在.mdx文件中引入Typescript组件，则使用此选项
    dest: 'build-docs', // 指定docz构建的输出目录
    files: 'docs/*.mdx', // Glob模式用于查找文件。默认状况下，Docz会在源文件夹中找到全部扩展名为.mdx的文件。
    ignore: ['README.md', 'CHANGELOG.md'] // 用于忽略由docz解析的文件的选项
};