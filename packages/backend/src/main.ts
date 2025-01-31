import express from 'express';
import { sequelize } from './db';
import { registerAPIs } from './register-apis';

// 创建Express App
const app = express();

// 使用代码生成工具生成的后端处理器注册所有API
registerAPIs(app);

app.listen(3000, async () => {
    // 连接数据库
    await sequelize.sync();
    console.log('App listening on port 3000');
});
