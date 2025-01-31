import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import path from 'path';

export const reqStreamApiRule = ESLintUtils.RuleCreator.withoutDocs({
    create(context) {
        const fullPath = context.physicalFilename;
        const targetPath = path.resolve(__dirname, '../../../types/src/api/req-stream');
        const relativePath = path.relative(path.dirname(fullPath), targetPath);
        const needCheck = relativePath == '';

        return {
            Program: (node) => {
                if (!needCheck) {
                    return;
                }

                const exportedTypes: string[] = [];
                let resType: string | undefined;
                let resTypeNode: any;
                let apiPath: string | undefined;

                for (const top of node.body) {
                    if (top.type == AST_NODE_TYPES.ExportNamedDeclaration) {
                        const declaration = top.declaration;
                        if (!declaration) {
                            continue;
                        }

                        if (
                            declaration.type == AST_NODE_TYPES.TSInterfaceDeclaration ||
                            declaration.type == AST_NODE_TYPES.TSTypeAliasDeclaration
                        ) {
                            exportedTypes.push(declaration.id.name);
                        } else if (declaration.type == AST_NODE_TYPES.VariableDeclaration) {
                            for (const vd of declaration.declarations) {
                                if (!vd.init) {
                                    continue;
                                }
                                const init = vd.init;
                                if (init.type != AST_NODE_TYPES.Literal) {
                                    continue;
                                }
                                const value = init.value;
                                if (typeof value != 'string') {
                                    return;
                                }
                                const name = vd.id;
                                if (name.type == AST_NODE_TYPES.Identifier) {
                                    if (name.name == 'resType') {
                                        resType = value;
                                        resTypeNode = name;
                                    } else if (name.name == 'apiPath') {
                                        apiPath = value;
                                    }
                                }
                            }
                        }
                    }
                }

                if (!resType) {
                    context.report({
                        node,
                        messageId: 'noResType',
                        fix(fixer) {
                            return fixer.insertTextAfter(node, "export const resType = '';");
                        },
                    });
                } else if (!exportedTypes.includes(resType)) {
                    context.report({
                        node: resTypeNode,
                        messageId: 'wrongResType',
                    });
                }

                if (!apiPath) {
                    context.report({
                        node,
                        messageId: 'noApiPath',
                        fix(fixer) {
                            return fixer.insertTextAfter(node, "export const apiPath = '';");
                        },
                    });
                }
            },
        };
    },
    meta: {
        docs: {
            description: '请求为流的API定义必须符合固定格式',
        },
        messages: {
            noResType: '必须以字符串字面量导出响应类型',
            wrongResType: '响应类型必须是此文件导出的接口或类型别名',
            noApiPath: '必须以字符串字面量导出API路径',
        },
        type: 'problem',
        schema: [],
        fixable: 'code',
    },
    defaultOptions: [],
});
