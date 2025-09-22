import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection from '../../config/database';

export interface ServiceAttributes {
  id: number;
  title: string;
  description: string;
  image?: string;
  category: 'service' | 'product';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ServiceCreationAttributes extends Optional<ServiceAttributes, 'id'> {}

export class Service extends Model<ServiceAttributes, ServiceCreationAttributes> implements ServiceAttributes {
  declare id: number;
  declare title: string;
  declare description: string;
  declare image?: string;
  declare category: 'service' | 'product';
  declare isActive: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Service.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category: {
      type: DataTypes.ENUM('service', 'product'),
      allowNull: false,
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
    tableName: 'services',
    timestamps: true,
  },
);

export default Service;
