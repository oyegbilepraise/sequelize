module.exports = (sequelize, DataTypes) => {

    const Loan = sequelize.define('loan', {
        amount: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        request_date: {
            type: DataTypes.DATE,
        },
        user_id:{
            type: DataTypes.INTEGER,
        },
        repayment_date: {
            type: DataTypes.DATE,
        }

    })

      return Loan;
}