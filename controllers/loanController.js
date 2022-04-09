const db = require("../models");
const { Op } = require("sequelize");

const Loan = db.loans;

const User = db.users

const loanRequest = async (req, res) => {
    try {        
        const {amount, user_id, status, request_date} = req.body;

        let loans = await Loan.findAll({ include: {all: true}, where: {user_id, [Op.or]: [
            { status: 'pending' },
            { status: 'submitted' },
            {status: 'accepted'}
          ] }});

          if (loans.length > 0) {
              res.status(403).json({message: 'You have a Pending Request'})
          } else{

              let info = {
                  amount, user_id, status, request_date
              }
      
              const loan = await Loan.create(info);
          
              res.status(200).json(loan)
          }

    } catch (error) {
        res.status(500).json(error);
    }
}

const loanRepayment = async (req, res) => {
    const {loan_id} = req.body;
    const loan = await Loan.update(req.body, { where: { id: loan_id } });

    res.status(200).json(loan);
}

const eachLoanRequest = async (req, res) => {
    try {
        const {loan_id} = req.body
    
        let loan = await Loan.findOne({ include: [{
            model: User,
            as: 'user'
        }], where: {id: loan_id}})
    
        res.status(200).json(loan);
        
    } catch (error) {   
        res.status(500).json(error); 
    }
}

const ApproveRequest = async (req, res, next) => {

    const {loan_id, status, login_id} = req.body;

    let user = await User.findOne({where: { id: login_id }})

    if(user.isAdmin === true) {
        const loan = await Loan.update(req.body,{ where: { id: loan_id } });
    
        res.status(200).json({message: 'Approved', loan})

    } else res.status(403).json({message: 'You are not authorized'})


}

// UMgj8EUVNDRsZ82hSrbk

const RejectRequest = async (req, res) => {

    const {loan_id, status, login_id} = req.body;

    let user = await User.findOne({where: { id: login_id }})

    if(user.isAdmin === true) {
        const loan = await Loan.update(req.body,{ where: { id: loan_id } });
    
        res.status(200).json({message: 'Approved', loan})

    } else res.status(403).json({message: 'You are not authorized'})

}

// const verifyAdmin = (req, res, next) => {
//     const {loan_id, status, login_id} = req.body;

//     let user = await User.findOne({where: { id: login_id }})

//     if(user.isAdmin === true) {
//         next()
//     } else res.status(403).json({message: 'You are not authorized'})
// }

module.exports = {
    loanRepayment,
    loanRequest,
    eachLoanRequest,
    ApproveRequest,
    RejectRequest
}