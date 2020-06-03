const xlsx = require("xlsx");
var fs = require('fs'),
moment = require('moment'),
mongoose = require("mongoose"), 
CD = require('./collectedData');

const dbCon = async () => {
    let connectionConfig = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
 
    const connection = await mongoose.connect('mongodb://localhost:27017/pdc_db?readPreference=primary&appname=MongoDB%20Compass&ssl=false', connectionConfig);
    return connection.connection.db;
}

dbCon();


const importData = async()=>{
    try {
        var wb = xlsx.readFile('gsv3.xls', { cellDates: true });
        console.log(wb.SheetNames)
        var ws = wb.Sheets[ 'Google Street Veiw Phase III Da' ]
        var data = xlsx.utils.sheet_to_json(ws);


        // data.map(record => {
            
        // })
        var dataid = 61737
        for(var i = 0; i < data.length; i++){
            dataid++ // incre

            let record = data[i];

            let collectedData = {
                dataid: dataid,
                formid: 8,
                userid: 644,
                modifieduserid: 0,
                date:moment(record['Date Of Submission'], 'DD/MM/YYYY hh:mm:ss'),
                location:{
                    type: 'Point',
                    coordinates: [
                        Number(record['Longitude']), 
                        Number(record['Lattitude'])
                    ]
                },
                data: {
                    41 : record['Road Name'],
                    42 : record['Road Type'],
                    43 : record['Road Condition'],
                    44 : record['Carriage Status'],
                    user : record['User'],
                    date: new Date(moment(record['Date Of Collection'], 'ddd MMM DD HH:mm:ss Z YYYY'))
                }

            }
            
            
            collectedData = await CD.create(collectedData)
            // console.log(collectedData);
            // CD.deleteMany({formid:8})
            
            console.log(i);
            console.log(dataid);
            // if(i == 1) break
            
        }

    
    } catch (error) {
        console.log(error)
        return false;
    }
}

importData();