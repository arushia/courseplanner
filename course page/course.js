var loopCount = 9;
var sectionDataArray = [];
var sectionData = {};

function populateData() {
  for(i = 0; i < loopCount ; i++){
    sectionData = {};
    sectionData.status = 'Open';
    sectionData.crn = '31115';
    sectionData.type = 'Laboratory-Discussion';
    sectionData.section = 'AYA';
    sectionData.time = '9-10:50 AM';
    sectionData.day = 'M';
    sectionData.location = 'L416 Digital Computer Laboratory';
    sectionData.instructor = 'Davis, N';

    sectionDataArray.push(sectionData);
  }
}

function drawTable() {
  console.log("Attempting to Draw Boxes");
  var tempHTML = "";

  tempHTML += '<table class="table table-striped table-bordered table-hover" align="center">'
  tempHTML += '<thead><tr>';
  tempHTML += '<th scope="col">Status</th>';
  tempHTML += '<th scope="col">CRN</th>';
  tempHTML += '<th scope="col">Type</th>';
  tempHTML += '<th scope="col">Section</th>';
  tempHTML += '<th scope="col">Time</th>';
  tempHTML += '<th scope="col">Day</th>';
  tempHTML += '<th scope="col">Location</th>';
  tempHTML += '<th scope="col">Instructor</th></tr>';

  for(i = 0; i < sectionDataArray.length; i++) {
    tempHTML += '<tbody><tr>';
    tempHTML += '<td>' + sectionDataArray[i].status + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].crn + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].type + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].section + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].time + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].day + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].location + '</td>';
    tempHTML += '<td>' + sectionDataArray[i].instructor + '</td>';
    tempHTML += '</tr></tbody>';
  }

  tempHTML += '</thead></table>';

  $('#testCS101').append(tempHTML);
}

populateData();

drawTable();