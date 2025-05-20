module.exports = function () {
  return {
    name: 'import-meta',
    visitor: {
      MetaProperty(path) {
        if (path.node.meta.name === 'import' && path.node.property.name === 'meta') {
          path.replaceWithSourceString('({ url: "" })');
        }
      },
    },
  };
};
