import { DataTypes, Model, type Optional } from 'sequelize';
import sequelizeConnection from '../../config/database';

export interface NewsletterAttributes {
  id: number;
  email: string;
  isActive: boolean;
  subscribedAt: Date;
  unsubscribedAt?: Date;
}

export interface NewsletterCreationAttributes extends Optional<NewsletterAttributes, 'id'> {}

export class Newsletter
  extends Model<NewsletterAttributes, NewsletterCreationAttributes>
  implements NewsletterAttributes
{
  declare id: number;
  declare email: string;
  declare isActive: boolean;
  declare subscribedAt: Date;
  declare unsubscribedAt?: Date;
}

Newsletter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    subscribedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    unsubscribedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: 'newsletter',
    timestamps: false,
  },
);

export default Newsletter;
