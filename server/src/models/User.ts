import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from "../db";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone: string;
  profilePicture?: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public firstName!: string;
  public lastName?: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public profilePicture?: string;
}

User .init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric: true,
      },
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        isEmail: {
          msg: 'Email уже занят',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [6, 100],
      },
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [10, 10],
        isNumeric: true,
      },
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'users',
  }
);

export default User;
