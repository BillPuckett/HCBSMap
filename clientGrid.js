

Parse.initialize("fByWoLraNbfr1baGOtVUyQ90VLYWWrUJ7aSI3bFb", "mob96RUajMRO0gat11f8e0kybd0niZSqFP93H5mO");


getClients(showClients);

function getClients(callback) {
    var ClientInfo = Parse.Object.extend("ClientGeolocation");

    var query = new Parse.Query(ClientInfo);
    query.notEqualTo("objectId", '');

    query.find({
        success: function (results) 
        {
            var Clients = JSON.parse(JSON.stringify(results));

            callback(Clients);
        },
        error: function (error) 
        {
            alert("Error: " + error.code + " " + error.message);
        }
    });
}


function showClients(Clients) {

    var theTemplateScript = $("#listClients-template").html();

    //Compile the template
    var theTemplate = Handlebars.compile(theTemplateScript);
    $(".clientListing").append(theTemplate(Clients));

}


//delete function

$(document).on("click", "#del", function () {
    var ClientInfo = Parse.Object.extend("ClientGeolocation");
    var delObject = $(this).attr("value");
    var query = new Parse.Query(ClientInfo);

    //alert("Do you really want to delete this record?");   // Test code

    var txt;
    var r = confirm("Continue with delete of this record?");
    if (r == true) 
    {
        // Allow delete to happen.
        query.get(delObject, {
            success: function (delObj) {
                // The object was retrieved successfully. 
                delObj.destroy({});
                window.location = "clientGrid.html";
            },
            error: function (object, error) {
                // The object was not retrieved successfully. 
                // error is a Parse.Error with an error code and description. 
                alert("Error: " + error.code + " " + error.message);
            }
        });
    } else 
    {
        // Do not delete.
    }

}); 



