const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

//middle wares
app.use(express.json());
app.use(cors());

//all currences
app.get("/getAllCurrencies" ,async (req,res)=>{
    const nameURL = "https://openexchangerates.org/api/currencies.json?app_id=9c11cb22f73c47ed96522eaf20d2b641";

    
    try {
    const namesResponse = await axios.get(nameURL);
    const nameData = namesResponse.data;

    return res.json(nameData);
        
    } catch (error) {
        console.error(error);    
    }

});

//get the target amount
app.get("/convert" , async(req,res)=>{
    const {date,
        sourceCurrency,
        targetCurrency,
        amountInSourceCurrency} = 
        req.query;

        try {
            const dataUrl = `https://openexchangerates.org/api/historical/${date}.json?app_id=9c11cb22f73c47ed96522eaf20d2b641`;

            const dataResponse = await axios.get(dataUrl);
            const rates = dataResponse.data.rates;

            //rates
            const sourceRate = rates[sourceCurrency];
            const targetRate = rates[targetCurrency];

            //final target value
            const targetAmount = (targetRate/sourceRate) * amountInSourceCurrency;

            return res.json(targetAmount.toFixed(2));

        } catch (error) {
            console.error(error); 
        }

});

//listen to a port
app.listen(5000 , ()=>{
    console.log("SERVER STARTED");
})