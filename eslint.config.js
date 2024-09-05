import defineConfig, { GLOB_TSX, GLOB_VUE } from '@mutoe/eslint-config'

export default defineConfig({
  isInEditor: false,
  typescript: {
    tsconfigPath: 'tsconfig.json',
  },
  vue: true,
  test: {
    cypress: true,
  },
  ignores: [
    'apps/cms-page-builder/public/ionicons',
  ],
}, {
  name: 'cms/apps-api',
  files: ['apps/cms-api/**/*.ts'],
  // @keep-sorted
  rules: {
    'camelcase': ['error', {
      // Prisma m-n connect key camelcase
      allow: [String.raw`^\S+(Id|ID|Key)_\S+(Id|ID|Key)$`],
    }],
    // Nestjs has no immediate plans to migrate to the ESM module https://github.com/nestjs/nest/pull/8736
    'unicorn/prefer-module': 'off',
    'unicorn/prefer-top-level-await': 'off',
  },
}, {
  name: 'cms/vue-fix',
  files: [GLOB_VUE],
  rules: {
    'unicorn/prefer-module': 'off',
  },
}, {
  name: 'cms/react-fix',
  files: [GLOB_TSX],
  rules: {
    'ts/no-misused-promises': 'off',
  },
}, {
  name: 'cms/api-client-rules',
  files: ['apps/*/src/client/**/*-api.ts'],
  // @keep-sorted
  rules: {
    'ts/no-unnecessary-type-constraint': 'off',
    'ts/no-unsafe-argument': 'off',
    'ts/no-unsafe-assignment': 'off',
    'ts/no-unsafe-call': 'off',
    'ts/no-unsafe-member-access': 'off',
    'ts/no-unsafe-return': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-nested-ternary': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
