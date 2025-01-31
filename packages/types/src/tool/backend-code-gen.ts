// 生成后端API代码

import fs from 'fs';
import path from 'path';
import { toCamelCase } from '../lib/to-camel-case';

// 找到各种文件的目录
const packagesDir = path.resolve(__dirname, '../../..');
const apiDefDir = path.resolve(packagesDir, 'types/dist/api');
const jsonApiDefDir = path.resolve(apiDefDir, 'json');
const reqStreamApiDefDir = path.resolve(apiDefDir, 'req-stream');
const resStreamApiDefDir = path.resolve(apiDefDir, 'res-stream');
const templatesDir = path.resolve(packagesDir, 'types/templates');
const backendDir = path.resolve(packagesDir, 'backend/src');
const apiDir = path.resolve(backendDir, 'api');
const jsonApiDir = path.resolve(apiDir, 'json');
const reqStreamApiDir = path.resolve(apiDir, 'req-stream');
const resStreamApiDir = path.resolve(apiDir, 'res-stream');

interface API {
    funcName: string;
    backendPath: string;
}

// 生成backend/src/register-apis.ts
const buildRegisterFuncFile = (apis: API[]) => {
    let source = fs.readFileSync(path.resolve(templatesDir, 'register-apis.ts.template')).toString();

    let imports = '';
    let funcs = '';
    for (const api of apis) {
        imports += `import { ${api.funcName} } from '${api.backendPath}';\n`;
        funcs += `    ${api.funcName}(app);\n`;
    }

    source = source.replaceAll('{{imports}}', imports).replaceAll('{{funcs}}', funcs);
    fs.writeFileSync(path.resolve(backendDir, 'register-apis.ts'), source);
};

const main = async () => {
    const apis: API[] = [];

    // TODO: json api

    const reqStreamTemplate = fs.readFileSync(path.resolve(templatesDir, 'req-stream-api.ts.template')).toString();
    for (const file of fs.readdirSync(reqStreamApiDefDir)) {
        if (path.extname(file) == '.js') {
            const fullUrl = `file://${path.resolve(reqStreamApiDefDir, file)}`;
            const module: { resType: string; apiPath: string } = await import(fullUrl);
            const { resType, apiPath } = module;

            const apiName = toCamelCase(apiPath);
            const funcName = `handle${apiName}Api`;
            const backendPath = `./api/req-stream/${file.replace('.js', '')}`;
            apis.push({ funcName, backendPath });

            const code = reqStreamTemplate
                .replaceAll('{{resType}}', resType)
                .replaceAll('{{apiPath}}', apiPath)
                .replaceAll('{{apiName}}', apiName);

            const outputFile = path.resolve(reqStreamApiDir, file.replace('.js', '.ts'));
            if (!fs.existsSync(outputFile)) {
                fs.writeFileSync(outputFile, code);
            }
        }
    }

    // TODO: res stream api

    buildRegisterFuncFile(apis);
};

main();
