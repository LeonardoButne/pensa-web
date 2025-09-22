import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection from '../../config/database';
import ImageDisease from './ImageDisease';

export interface DiseaseAttributes {
  id: string;
  name: string;
  description: string;
  symptoms: string;
  causes: string;
  treatment: string;
  prevention: string;
  isHighlighted: boolean;
  highlightType?: 'week' | 'month';
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface DiseaseCreationAttributes extends Optional<DiseaseAttributes, 'id'> {}

export class Disease extends Model<DiseaseAttributes, DiseaseCreationAttributes> implements DiseaseAttributes {
  declare id: string;
  declare name: string;
  declare description: string;
  declare symptoms: string;
  declare causes: string;
  declare treatment: string;
  declare prevention: string;
  declare isHighlighted: boolean;
  declare highlightType?: 'week' | 'month';
  declare isActive: boolean;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

Disease.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    symptoms: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    causes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prevention: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isHighlighted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    highlightType: {
      type: DataTypes.ENUM('week', 'month'),
      allowNull: true,
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
    tableName: 'diseases',
    timestamps: true,
  },
);

Disease.hasOne(ImageDisease, { foreignKey: 'diseaseId', as: 'image' });

export default Disease;
