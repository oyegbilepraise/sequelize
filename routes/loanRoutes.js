const productController = require('../controllers/loanController')

const router = require('express').Router();

// const {loanMiddleware} = require('../middlewares/loanMiddleware');

router.post('/applyForLoan', productController.loanRequest)
router.post('/get-each-loan', productController.eachLoanRequest)
router.post('/loan-repayment', productController.loanRepayment)
router.post('/approve-loan', productController.ApproveRequest)
router.post('/reject-loan', productController.RejectRequest)


module.exports = router;