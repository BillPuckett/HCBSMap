
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

alert("Received - " + getQueryVariable("id"));                  // Notice of objectId passed from clientGrid
recordNumber = getQueryVariable("id")                           // Set the objectId passed from clientGrid into a variable to use








// Create the object.
var ClientInfo = Parse.Object.extend("ClientGeolocation");      // Start a record
var clientInfo = new ClientInfo();

clientInfo.set("objectId", recordNumber);                       // Identify the record by objectId

clientInfo.save(null,                                           // Apparently start a save but wait for the save internal to this // Find record
{
    success: function (clientInfo)                              // If we got the record
    {
        // Now let's update it with some new data. 
        clientInfo.set("clientID", 1009);                       // Set data to update
        clientInfo.save();                                      // Actually save the update
        alert("Record updated.");                               // Notice of record updated
    },
    error: function (error) 
    {
        alert("Error: " + error);                               // This would be that the record was not found
    }
});


