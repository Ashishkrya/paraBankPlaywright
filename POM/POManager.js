const AccountsOverview = require('./AccountsOverview');
const BillPayPage = require('./BillPayPage');
const FindTransaction = require('./FindTransaction');
const OpenAccount = require('./OpenAccount');
const RegisterPage = require('./RegisterPage');
const RequestLoan = require('./RequestLoan');
const TransferFundsPage = require('./TransferFundsPage');
const UpdateProfile = require('./UpdateProfile');
const Login = require('./Login');

class POManager {
    constructor(page) {
        this.page = page
        this.accountsOverview = new AccountsOverview(this.page);
        this.billPayPage = new BillPayPage(this.page);
        this.findTransaction = new FindTransaction(this.page);
        this.openAccount = new OpenAccount(this.page);
        this.registerPage = new RegisterPage(this.page);
        this.requestLoanPage = new RequestLoan(this.page);
        this.transferFundsPage = new TransferFundsPage(this.page);
        this.updateProfile = new UpdateProfile(this.page);
        this.logIn = new Login(this.page);
    }
    getlogInPage() {
        return this.logIn;
    }
    getAccountsOverview() {
        return this.accountsOverview;
    }
    getbillPayPage() {
        return this.billPayPage;
    }
    getfindTransaction() {
        return this.findTransaction;
    }
    getopenAccount() {
        return this.openAccount;
    }
    getregisterPage() {
        return this.registerPage;
    }
    getRequestLoanPage() {
        return this.requestLoanPage;
    }
    getTransferFundsPage() {
        return this.transferFundsPage;
    }
    getUpdateProfile() {
        return this.updateProfile;
    }

}
module.exports = { POManager };