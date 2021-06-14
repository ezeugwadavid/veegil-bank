const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

//load input validation
const validateTransactionInput = require("../../validation/transactions");

//Load user, transaction, account model

const User = require("../../models/User");
const Transaction = require("../../models/Transactions");
const Account = require("../../models/Account");

//@route POST api/account
//@desc  populate new user account with money
//@access Private

router.post(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const balance = 20000;

    Account.find({ userid: req.user.id })
      .sort({ _id: -1 })
      .limit(1)
      .then((acct) => {
        console.log(acct.length);
        if (acct.length === 0) {
          const newAccount = new Account({
            userid: req.user.id,
            phonenumber: req.user.phonenumber,
            accountname: req.user.fullname,
            balance: balance,
          });
          newAccount
            .save()
            .then((account) => res.json(account))
            .catch((err) => console.log(err));
        }

        if (acct[0].balance < 0) {
          Account.updateOne(
            { userid: req.user.id },
            { $set: { balance: balance } }
          )
            .then(() => res.json({ message: "Your account has been funded" }))
            .catch((err) => console.log(err));
        } else {
          res.status(400).json({ message: "Your account needs not be funded" });
        }
      })
      .catch((err) => console.log(err));
  }
); 

//@route POST api/deposit
//@desc  Deposit/Withdraw money
//@access Private

router.post(
  "/deposit",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { phonenumber, amount, type } = req.body;
    const customerid = req.user.id;
    const customername = req.user.fullname;
    const { errors, isValid } = validateTransactionInput(req.body);

    //Check Vaalidation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Find account of depositor
    Account.find({ userid: customerid })
      .sort({ _id: -1 })
      .limit(1)
      .then((account) => {
        // console.log(account)
        //check for balance
        if (account[0].balance < amount) {
          errors.amount = "Insufficient Funds";
          return res.status(400).json(errors);
        }
        if (account[0].phonenumber === phonenumber) {
          errors.phonenumber = "You cant send funds to same account";
          return res.status(400).json(errors);
        }
      })
      .catch((err) => console.log(err));
    //find account of the person money was deposited to
    User.findOne({ phonenumber })
      .then((user) => {
        if (!user) {
          errors.phonenumber = "user with that account does not exist";
          return res.status(400).json(errors);
        }

        const newTransaction = new Transaction({
          customerid: customerid,
          customername: customername,
          amount: amount,
          phonenumber: phonenumber,
          type: type,
          receiver: user.fullname,
          time: Date.now(),
        });
        newTransaction
          .save()
          .then((transaction) => {
            Account.find({ userid: customerid })
              .then((account) => {
                const newBalance = account[0].balance - amount;
                //remove the deposited amount from the balance
                Account.updateOne(
                  { userid: customerid },
                  { $set: { balance: newBalance } }
                )
                  .then(() => {
                    // Add balance to the recever
                    Account.findOne({ phonenumber }).then((account) => {
                      if (account !== null) {
                        const amountInt = parseInt(amount, 10); // convert amount to number
                        const addToBalance = account.balance + amountInt;
                        Account.updateOne(
                          { phonenumber },
                          { $set: { balance: addToBalance } }
                        )
                          .then(() => res.json({ transaction })) // after subtracting the deposit and adding to the acct of the receiver, then return the transaction details
                          .catch((err) => console.log(err));
                      } else {
                        res.status(400).json({
                          message: "receiver account not funded yet",
                        });
                      }
                    });
                  })
                  .catch((err) => console.log(err));
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
);

//@route POST api/withdraw
//@desc  user to withdraw money
//@access Private

router.post(
  "/withdraw",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { amount, type } = req.body;
    const { fullname, phonenumber, id } = req.user;

    //check current balance

    // Find account of depositor
    Account.find({ userid: id })
      .sort({ _id: -1 })
      .limit(1)
      .then((account) => {
        if (amount === " ") {
          res.status(400).json({ message: "amount field is required" });
        }
        console.log(account);

        //check for balance
        if (account[0].balance < amount) {
          res.status(400).json({ message: "Insufficient Funds" });
          return;
        } else {
          const newWithdrawal = new Transaction({
            customerid: id,
            customername: fullname,
            amount: amount,
            phonenumber: phonenumber,
            type: type,
            receiver: fullname,
            time: Date.now(),
          });
          newWithdrawal
            .save()
            .then((withdrawalDetails) => {
              Account.find({ userid: id })
                .then((account) => {
                  const newBalance = account[0].balance - amount;
                  //remove the deposited amount from the balance
                  Account.updateOne(
                    { userid: id },
                    { $set: { balance: newBalance } }
                  )
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err));
                })
                .catch((err) => console.log(err));
              res.json({ withdrawalDetails });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
);

//@route GET api/deposits
//@desc  get deposits
//@access Private

router.get(
  "/deposits",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Transaction.find({ customerid: req.user.id, type: "deposit" })
      .then((deposits) => {
        if (deposits.length === 0) {
          return res
            .status(400)
            .json({ message: "You have not made any deposits yet" });
        } else {
          return res.json(deposits);
        }
      })
      .catch((err) => console.log(err));
  }
);

//@route GET api/withdrawals
//@desc  get withdrawals
//@access Private

router.get(
  "/withdrawals",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Transaction.find({ customerid: req.user.id, type: "withdraw" })
      .then((withdrawals) => {
        if (withdrawals.length === 0) {
          return res
            .status(400)
            .json({ message: "You have not made any withdrawal yet" });
        } else {
          return res.json(withdrawals);
        }
      })
      .catch((err) => console.log(err));
  }
);

//@route GET api/transactions
//@desc  get transactions
//@access Private

router.get(
  "/transactions",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Transaction.find({ customerid: req.user.id })
      .then((transactions) => {
        if (transactions.length === 0) {
          return res
            .status(400)
            .json({ message: "You have not made any transactions yet" });
        } else {
          return res.json(transactions);
        }
      })
      .catch((err) => console.log(err));
  }
);

//@route GET api/account
//@desc  get account details
//@access Private

router.get(
  "/account",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Account.find({ userid: req.user.id })
      .then((accounts) => {
        if (accounts.length === 0) {
          return res
            .status(400)
            .json({ message: "You dont have a transactions account" });
        } else {
          return res.json(accounts);
        }
      })
      .catch((err) => console.log(err));
  }
);

module.exports = router;
