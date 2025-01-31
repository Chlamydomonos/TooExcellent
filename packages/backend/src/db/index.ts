import Sequelize from '@sequelize/core';
import { SqliteDialect } from '@sequelize/sqlite3';
import { dataFilePath } from './paths';
import { File } from './models/File';

export const sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: dataFilePath,
    models: [File],
});
