import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import projectPlugin from 'eslint-plugin';

export default tseslint.config(eslint.configs.recommended, tseslint.configs.recommended, {
    plugins: {
        projectPlugin: projectPlugin.plugin,
    },
    rules: {
        'no-unused-private-class-members': 'off',
        'no-unused-vars': 'off',
        'no-unused-expressions': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',
        'projectPlugin/req-stream-api': 'error',
    },
    files: ['src/**/*.ts'],
});
