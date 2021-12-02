module.exports = {
  templates: `${__dirname}/ops/templates`,
  helpers: {
    relative: (from, to) => path.relative(from, to),
    src: () => __dirname,
  },
};
