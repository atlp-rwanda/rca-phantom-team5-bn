import { Model, Sequelize, DataTypes } from "sequelize";

export interface RoleAttributes {
  title: string;
  description: string;
  privileges: string[];
}

class Role extends Model<RoleAttributes> {
  public title!: string;
  public description!: string;
  public privileges!: string[];

  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models: any) {
    // define association here
  }
}

export default function (sequelize: Sequelize) {
  Role.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      privileges: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: "role",
    }
  );
  return Role;
}
