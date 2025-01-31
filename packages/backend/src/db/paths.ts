import path from 'path';

// 项目根目录的路径
const rootPath = path.resolve(__dirname /* 对于paths.ts, __dirname就是db文件夹的路径 */, '../../../..');

// 数据库文件所在的文件夹
const dataPath = path.resolve(rootPath, 'data');

// 数据库文件
export const dataFilePath = path.resolve(dataPath, 'db.sqlite');
