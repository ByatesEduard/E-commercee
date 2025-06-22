const sequelize = require('../db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   email: { type: DataTypes.STRING, unique: true }, // ❗ тут була крапка замість коми
   password: { type: DataTypes.STRING },
   role: { type: DataTypes.STRING, defaultValue: "USER" },
})

const Basket = sequelize.define('basket', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketDevice = sequelize.define('basket_device', { // ❗ було BastekDevice (опечатка)
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Device = sequelize.define('device', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
   price: { type: DataTypes.INTEGER, allowNull: false },
   rating: { type: DataTypes.INTEGER, defaultValue: 0 },
   img: { type: DataTypes.STRING, allowNull: false },
})

const Type = sequelize.define('type', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Brand = sequelize.define('brand', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   name: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Rating = sequelize.define('rating', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   rate: { type: DataTypes.INTEGER, allowNull: false },
})

const DeviceInfo = sequelize.define('device_info', {
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
   title: { type: DataTypes.STRING, allowNull: false }, // ❗ було INTEGER замість STRING
   description: { type: DataTypes.STRING, allowNull: false }, // ❗ те саме
})

const TypeBrand = sequelize.define('type_brand', { // ❗ пропущена кома перед другим аргументом
   id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})


// 🔗 Зв’язки
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as: 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })

// ⬇ Експорт моделей
module.exports = {
   User,
   Basket,
   BasketDevice,
   Device,
   Type,
   Brand,
   Rating,
   TypeBrand,
   DeviceInfo,
}
