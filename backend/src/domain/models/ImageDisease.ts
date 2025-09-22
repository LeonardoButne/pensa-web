import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection from '../../config/database';

export interface ImageDiseadeAttributes {
  id: string;
  fileName: string;
  originalName: string;
  url?: string;
  diseaseId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ImageDiseaseCreationAttributes extends Optional<ImageDiseadeAttributes, 'id'> {}

export class ImageDisease
  extends Model<ImageDiseadeAttributes, ImageDiseaseCreationAttributes>
  implements ImageDiseadeAttributes
{
  declare id: string;
  declare fileName: string;
  declare originalName: string;
  declare diseaseId: string;
  declare readonly createdAt?: Date;
  declare readonly updatedAt?: Date;
}

ImageDisease.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    originalName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${process.env.BASE_URL}/uploads/images/diseases/${this.getDataValue('fileName')}`;
      },
    },
    diseaseId: {
      type: DataTypes.UUID,
      allowNull: false,
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'ImageDiseases',
    timestamps: true,
  },
);

export default ImageDisease;
