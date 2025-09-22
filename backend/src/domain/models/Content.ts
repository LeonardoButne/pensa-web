import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection from '../../config/database';

export interface ContentAttributes {
  id: number;
  section: string;
  title: string;
  content: string;
  images: string[];
  order: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ContentCreationAttributes extends Optional<ContentAttributes, 'id'> {}

export class Content extends Model<ContentAttributes, ContentCreationAttributes> implements ContentAttributes {
  declare id: number;
  declare section: string;
  declare title: string;
  declare content: string;
  declare images: string[];
  declare order: number;
  declare isActive: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Content.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'content',
    timestamps: true,
  },
);

export default Content;
