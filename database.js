const TABLE_URL = "https://api.airtable.com/v0/appo1y5AaYd3oeCyi/Colleges"; //Defining the link to the database we have setup
const KEY_QUERY = "api_key=keyDhRLs1MlrCykL7"; //API key
const SUMMARY_QUERY = "fields%5B%5D=Name&fields%5B%5D=Location&fields%5B%5D=Average%20GPA&fields%5B%5D=Average%20SAT&fields%5B%5D=Campus%20setting&fields%5B%5D=Acceptance%20Rate&fields%5B%5D=Size"; //Defining and linking all of the collumns from our database
var itemList = [];

function fetchItemsPage(itemResultElement, offset) {
    fetch(`${TABLE_URL}?${KEY_QUERY}&${SUMMARY_QUERY}&${offset}`)
        .then(response => response.json()) //Makes the database into a array?
        .then(data => {
            console.log(data);//These 4 lines call the database and then display the data in the console

            var matchedColleges = ""; //Makes this variable have no words

            for (var p = 0; p < data.records.length; p++) { //Goes through every value in the database
                var Name = data.records[p].fields["Name"]; //All of these are just defining collumn from our database as variables
                var Location = data.records[p].fields["Location"];
                var GPA = (data.records[p].fields["Average GPA"]);
                var SAT = data.records[p].fields["Average SAT"];
                var Size = data.records[p].fields["Size"];
                var Setting = data.records[p].fields["Campus setting"];
                var Acceptance = (data.records[p].fields["Acceptance Rate"]);

                var selectElement = document.getElementById("Location"); //Calling the user inputed value from the preferences page in HTMl
                var selectedValue = selectElement.value; //Assigning it as a variable

                var selectElement2 = document.getElementById("Size"); //Same for these
                var selectedValue2 = selectElement2.value;

                var selectElement3 = document.getElementById("Setting");
                var selectedValue3 = selectElement3.value;

                var selectElement4 = document.getElementById("myRange");
                var selectedValue4 = (selectElement4.value);

                var selectElement5 = document.getElementById("myRange2");
                var selectedValue5 = (selectElement5.value);

                var selectElement6 = document.getElementById("myRange3");
                var selectedValue6 = (selectElement6.value);

                if (Location == selectedValue && Size == selectedValue2 && Setting == selectedValue3 && Acceptance > selectedValue4 && GPA <= selectedValue5 && SAT <= selectedValue6) { //Checks every single collumn for the users selected value ie. if the user selects medium size schools it checks for all medium size schools
                    console.log(data.records[p].fields["Name"]); //Logs all of the names of the schools that matches the users preferences
                    matchedColleges += data.records[p].fields["Name"] + "<br>"; // Add the users matched college names to the string                

                }
            }
            
            document.getElementById("Match").innerHTML = matchedColleges; // Display the list of matched colleges

            if (data.offset) { //Applies to if their is 100 or more data points in the database
                offset = `offset=${data.offset}`;
                fetchItemsPage(itemResultElement, offset);
            }

            itemList = itemList.concat(data.records); //list the data
        });
}

fetchItemsPage();
