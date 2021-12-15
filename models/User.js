const { Model, DataTypes } = require('sequelize');
const sequelize = require('../configs/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
  // setup method to run on instance data (per user) to check pw
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// create fields/columns for User model
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4]
      }
    }
  },
  
  {
    hooks: {
      // set up beforeCreate lifesycle "hook" functionality
      async beforeCreate(userData) {
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
        },
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      }
      },
      

    

    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user'
  }
);

module.exports = User;
