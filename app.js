const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https");
const { options } = require("request");

const app = express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html")
})

app.post("/", function (req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_adress: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us14.api.mailchimp.com/3.0/lists/7f042ac910"

    const options = {
        method: "POST",
        auth: "jani1:a020ee51898c233faa49485c4d7db556-us14"
    }

    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});



app.listen(3000, function () {
    console.log("Server is running on port 3000");
})



//API Key a020ee51898c233faa49485c4d7db556-us14

// List id 7f042ac910