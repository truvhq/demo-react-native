// Groups options
const internalOptions = {
  group: 'internal',
  position: 'before',
};
const parentOptions = {
  group: 'parent',
  position: 'before',
};
const siblingOptions = {
  group: 'sibling',
  position: 'before',
};

// Groups with options and pattern parts
const groups = [
  {
    prefix: '../../**',
    postfix: '/**',
    options: parentOptions,
  },
  {
    prefix: '../../../**',
    postfix: '/**',
    options: parentOptions,
  },
  {
    prefix: '../**/',
    postfix: '/**',
    options: parentOptions,
  },
  {
    prefix: './',
    postfix: '/**',
    options: siblingOptions,
  },
];
// Ordering by importance
const importImportance = ['containers', 'components', 'assets'];
const pathGroups = [];

// React is first always
pathGroups.push({
  pattern: 'react',
  group: 'builtin',
  position: 'before',
});

groups.forEach(({ prefix, postfix, options }) => {
  importImportance.forEach((part) => {
    pathGroups.push({
      pattern: prefix + part,
      ...options,
    });

    pathGroups.push({
      pattern: prefix + part + postfix,
      ...options,
    });
  });
});

importImportance.forEach((part) => {
  pathGroups.push({
    pattern: `${part}/**`,
    ...internalOptions,
  });
});

const rules = {
  'import/order': [
    'error',
    {
      pathGroups,
      'pathGroupsExcludedImportTypes': [],
      'groups': [
        ['builtin', 'external'],
        ['internal', 'parent', 'sibling', 'index'],
      ],
      'newlines-between': 'always',
      'alphabetize': {
        order: 'asc',
        caseInsensitive: true,
      },
    },
  ],
};

module.exports = {
  rules,
};
