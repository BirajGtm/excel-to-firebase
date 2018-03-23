const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const node_xj = require("xls-to-json");

const app = express();

// Settin g up firebase here ...
const firebase = require('firebase');

const config = {
    apiKey: "AIzaSyATTCFUPPoa-G5sZtQlrn_jN5mu6cRNPwQ",
    authDomain: "excelify-390ab.firebaseapp.com",
    databaseURL: "https://excelify-390ab.firebaseio.com",
    projectId: "excelify-390ab",
    storageBucket: "",
    messagingSenderId: "610784612531"
};
firebase.initializeApp(config);

const database = firebase.database();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(fileUpload());
app.use('/public', express.static(__dirname + '/public'));

realParser = (result) => {
    const finalResult = result.map((value) => {
        return {
            regdNo: value.regdNo.toUpperCase(),
            name: value.name.toUpperCase(),
            dues: value.dues
        }
    });
    const arrayToObject = (finalResult) =>
        finalResult.reduce((obj, item) => {
            obj[item.regdNo] = item
            return obj;
        }, {});
    fs.writeFile(`${__dirname}/output/students.json`,
        JSON.stringify(arrayToObject(finalResult)),
        (err) => {
            if (err) { console.log('laaa mula error po aaidyo ni') }
        });
    database.ref().set(arrayToObject(finalResult));
}

app.post('/upload', (req, res, next) => {
    let imageFile = req.files.file;
    imageFile.mv(`${__dirname}/datasheets/${req.body.filename}.xlsx`, (err) => {
        if (err) {
            return res.status(500).send(err);
        }
        node_xj({
            input: `${__dirname}/datasheets/${req.body.filename}.xlsx`,  // input xls 
            output: `${__dirname}/output/${req.body.filename}.json` // output json   // specific sheetname 
        }, (err, result) => {
            if (err) {
                console.error(err);
            } else {
                realParser(result);
            }
        });
    });

})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(8000, () => {
    console.log('Server listening on port : 8000');
});

module.exports = app;