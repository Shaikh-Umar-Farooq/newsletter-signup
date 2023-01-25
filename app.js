const express = require("express");
const bodypaser = require("body-parser");
const request = require("request");
const http = require("https");
const { send } = require("process");



const app = express();

app.use(express.static("public"));
app.use(bodypaser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const mail = req.body.mail;

    const data = {
        members: [
            {
                email_address: mail,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }

            }
        ]

    };

    const jsondata = JSON.stringify(data);
    const url = " https://us14.api.mailchimp.com/3.0/lists/7df2ae3459"
    const options = {
        method: "POST",
        auth: "umar1:aab5dcc7d4bab155b099b8588c5d28de-us14"
    }
    const request = http.request(url, options, function (response) {
        if( response.statusCode === 200){
            res.sendFile(__dirname+"/failure.html")
        }

        else {
            res.sendFile(__dirname+"/failure.html")

        }


        response.on("data", function (data) {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsondata);
    request.end();

    
})
app.listen(process.env.PORT || 3000, function () {
    console.log("server is running");
});



// id 7df2ae3459
// api
// aab5dcc7d4bab155b099b8588c5d28de-us14