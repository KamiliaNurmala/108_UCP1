module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define("Hotel", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        Tipe_Kamar : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Lantai : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Fasilitas : {
            type : DataTypes.TEXT,
            allowNull : false
        },
        Tanggal_Pesan : {
            type : DataTypes.DATETIME,
            allowNull : true
        }
    }, {
        tableName : "Hotel",
        freezeTableName : true,
        timestamps : true
    });
    return Komik;
}
