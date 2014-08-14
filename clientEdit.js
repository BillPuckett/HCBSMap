

Parse.initialize("fByWoLraNbfr1baGOtVUyQ90VLYWWrUJ7aSI3bFb", "mob96RUajMRO0gat11f8e0kybd0niZSqFP93H5mO");

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}

    //alert("Received - " + getQueryVariable("id"));                    // Notice of objectId passed from clientGrid
    var recordNumber = getQueryVariable("id");                          // Set the objectId passed from clientGrid into a variable to use
    var currentclientlocation;
    var currentclientID;
    var currentgender;
    var currentage;
    var currentservice;
    var currenttimes;
    var ClientInfo;
    var clientInfo;
    var query;

    getClients(showClients);

    function getClients(callback) {
        ClientInfo = Parse.Object.extend("ClientGeolocation");
        clientInfo = new ClientInfo();
        query = new Parse.Query(ClientInfo);

        query.get(recordNumber, {
            success: function (clientInfo) {
                //alert("Get record " + recordNumber + " inside success? ")
                var Clients = [JSON.parse(JSON.stringify(clientInfo))];
//                alert(JSON.stringify(clientInfo));                      // This line Test Code

                currentclientlocation = clientInfo.get("clientlocation")
                currentclientID = clientInfo.get("clientID")
                currentgender = clientInfo.get("gender")
                currentage = clientInfo.get("age")
                currentservice = clientInfo.get("service")
                currenttimes = clientInfo.get("times")
//                alert("Client located near " + currentclientlocation)      // These lines Test Code
//                alert("Client ID = " + currentclientID)
//                alert("Client gender = " + currentgender)
//                alert("Client age = " + currentage)
//                alert("Services needed = " + currentservice)
//                alert("Times needed = " + currenttimes)

                geocode_clients.elements["age"].value = currentage;
                geocode_clients.elements["service"].value = currentservice;
                geocode_clients.elements["times"].value = currenttimes;

                callback(Clients);
            },
            error: function (error) {
                alert("Error: " + error.code + " " + error.message);
            }
        });
    }


    function buttonClicked() {
//        alert("This is inside the button clicked function");        // Test code
        updateRecord();
    }   


    function showClients(Clients) {

        var theEditTemplateScript = $("#listEditClients-template").html();

        //Compile the template
        var theEditTemplate = Handlebars.compile(theEditTemplateScript);
        $(".clientListingEdit").append(theEditTemplate(Clients));

    }


//BELOW IS GOOD CODE TO UPDATE A SINGLE FILE.  IT IS/WAS COMMENTED OUT SO IT DOES NOT CREATE A RECORD FOR EVERY TEST ABOVE

    function updateRecord() {

        //alert("Inside Update function looking at " + recordNumber + " record.")     // Test code

        newAge = parseInt(("age", geocode_clients.elements["age"].value), 10);      // Get data as an integer to update
        var newService = ("service", geocode_clients.elements["service"].value);    // Get data to update
        var newTimes = ("times", geocode_clients.elements["times"].value);          // Get data to update
//        alert("The client's new age is " + newAge)                                  // Test code
//        alert("The client's new service is " + newService)                          // Test code
//        alert("The client's new times is " + newTimes)                              // Test code
        clientInfo.set("age", newAge);                              // Set data to update
        clientInfo.set("service", newService);                      // Set data to update
        clientInfo.set("times", newTimes);                          // Set data to update
        clientInfo.set("objectId", recordNumber);                   // Identify the record by objectId

//        alert(JSON.stringify(clientInfo));                          // Test code

        clientInfo.save();                                          // Here the record is updated
        alert("The record was updated");
    }


//    function deleteRecord() {

//        myObject.destroy({
//            success: function (myObject) {
//                // The object was deleted from the Parse Cloud.
//            },
//            error: function (myObject, error) {
//                // The delete failed.
//                // error is a Parse.Error with an error code and description.
//            }
//        });
//    }





