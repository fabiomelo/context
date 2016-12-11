'use strict';

var httpStatusCode = require('../utils/httpStatusCode');
var messages = require('../utils/messages');
var validate = require('../middlewares/validate');
var FCM = require('fcm-push');

var serverKey = 'AAAASRz1GkU:APA91bE0AjgppVELB1eSnNcsN7dq7Z6MeysZDY4uJG34JKuq5mbZ1qlV697lj-SUPeOpSH5GHKwAZVCAbmPXH9pU3NiXLJtUfKdBzJ1E-7sQJMam8-Kz-RblhOrKBmA2GCCnNXza2e02CtovGbCSKzaC_5NhfbuobA';
var fcm = new FCM(serverKey);


function showError (err) {
  if (err) {
    console.log(err);
  }
}

function createUpdatePositionMessage(token, latitude, longitude, speed, isEmergency,
isProgrammedStop ){
  var message = {
      to: token, // required fill with device token or topics
      priority: "high",
      data: {
        'latitude':  latitude,
        'longitude': longitude,
        'lastSpeed': speed,
        'isEmergency': isEmergency ,
        'isProgrammedStop': isProgrammedStop 
      }
  };

  console.log(message);
  return message;
}

var deviceTokenList = [];
module.exports = function(app) {

    var controller = {
      register: function(request, response) {

        //Add itens to array if it does not exist
        if (deviceTokenList.indexOf(request.query.id) === -1) {
          console.log('Registering... ' +request.query.id);
          deviceTokenList.push(request.query.id);
          messages.jsonMessageSuccessful(response, request.query.id);
        } else{
          messages.jsonMessageConflict(response)
        } 
      },
      updatePosition: function(request, response){
        console.log("Updating position...");
        var deviceid = "eU6HKx7QRMc:APA91bEIoJtHmTFz_MzUgbMkoZvwdlXzrMDbCB1via_fV16MRF_Xc0C0KkkVA1diR8QgzRdQtkCy-6JDd5it_NSaiIbIlBDDi0g2GFkmrE4ESMi43dBODBePQrzFLqiKeDmX26DkXB8i";
        //request.query.id;

        console.log(request.body);

        //for(int i = 0;deviceTokenList.length; i++){

            var message = createUpdatePositionMessage(deviceid,request.body.latitude,request.body.longitude,request.body.speed,request.body.isEmergency,request.body.isProgrammedStop);
            //callback style
            fcm.send(message, function(err, response){
                if (err) {
                    console.log("Something has gone wrong!");

                    console.log(err);
                } else {
                    console.log("Successfully sent with response: ", response);
                }
            });

            messages.jsonMessageInternalError(response, err);
        //}
      
      },

       

      methodNotAllowed: function(request, response){
          messages.jsonMessageMethodNotAllowed(response);
      }
    }

    return controller;
}