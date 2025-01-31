import type { CreationOptional, InferAttributes, InferCreationAttributes } from '@sequelize/core';
import { DataTypes, Model } from '@sequelize/core';
import { Attribute, AutoIncrement, NotNull, PrimaryKey } from '@sequelize/core/decorators-legacy';

export class File extends Model<InferAttributes<File>, InferCreationAttributes<File>> {
    @Attribute(DataTypes.INTEGER)
    @PrimaryKey()
    @AutoIncrement()
    declare id: CreationOptional<number>;

    @Attribute(DataTypes.STRING)
    @NotNull()
    declare name: string;

    @Attribute(DataTypes.BLOB)
    @NotNull()
    declare content: Buffer;
}
