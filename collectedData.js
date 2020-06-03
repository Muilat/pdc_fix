const mongoose = require("mongoose");

const CollectedData = new mongoose.Schema(
  {
    data: {},
    dataid: {type : Number},
    formid: {type : Number},
    userid: {type : Number},
    modifieduserid: {type : Number},
    _class: {type : String, default: "com.polaris.model.CollectedData"},
    
    date: {
        type: Date,
        
        required: [true, 'Please enter event date and time']
      },
    location : {}
    
  }, { collection: 'collecteddata' }
);

module.exports = mongoose.model('CollectedData', CollectedData); 