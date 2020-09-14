//קבלת רשימת העובדים
function getWorkerByID() {
  var id = document.getElementById("Id").value;
  $.post("http://localhost:3000/WorkerFunction/getworkerByID",
    {
      WorkerID: id
    },
    function (data) {
      if (data.isActive == true && data != null)
        document.getElementById("results").innerHTML = data.WorkerID + " " + data.WorkerFName + " " + data.WorkerLName + " " + data.WorkerAddres + " " + data.WorkerFhone + " " + data.WorkerMail + " " + data.isActive;
      else {
        document.getElementById("results").innerHTML = "עובד לא קיים";
      }
    });

}

//הוספת עובד
function addWorker() {
  var id = document.getElementById("tz").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var phone = document.getElementById("phone").value;
  var mail = document.getElementById("mail").value;
  var address = document.getElementById("address").value;
  var status = new Boolean(true);
  $.post("http://localhost:3000/WorkerFunction/addWorker",
    {
      WorkerID: id,
      WorkerFName: firstName,
      WorkerLName: lastName,
      WorkerAddres: address,
      WorkerFhone: phone,
      WorkerMail: mail,
      isActive: status
    },
    function (data) {
      alert("Data: " + data + "\nStatus: " + status);
    });

}
function remove() {
  var id = document.getElementById("Id").value;
  $.post("http://localhost:3000/WorkerFunction/removeWorker",
    {
      WorkerID: id,
    },
    function (data) {
      alert("Data: " + data + "\nStatus: " + status);
    });

}
function getAll() {
  document.getElementById("results").innerHTML = "";
  $.post("http://localhost:3000/WorkerFunction/GetWorker",
    function (data) {
      data.forEach(element => {
        if (element.isActive == true)
          document.getElementById("results").innerHTML += "<li>" + " שם פרטי: " + element.WorkerFName + " פלאפון: " + element.WorkerFhone + "</li>";
      });
    });
}
function showToUpdate() {
  var id = document.getElementById("Id").value;
  $.post("http://localhost:3000/WorkerFunction/getworkerByID",
    {
      WorkerID: id
    },
    function (data) {
      if (data.isActive == true && data != null) {
        document.getElementById("tz").value = data.WorkerID;
        document.getElementById("tz").disabled = true;
        document.getElementById("firstName").value = data.WorkerFName;
        document.getElementById("lastName").value = data.WorkerLName;
        document.getElementById("phone").value = data.WorkerFhone;
        document.getElementById("mail").value = data.WorkerMail;
        document.getElementById("address").value = data.WorkerAddres;
      }
      else {
        document.getElementById("results").innerHTML = "עובד לא קיים";
      }
    });
}
function UpdateW() {
  var id = document.getElementById("tz").value;
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var phone = document.getElementById("phone").value;
  var mail = document.getElementById("mail").value;
  var address = document.getElementById("address").value;
  var status = new Boolean(true);
  $.post("http://localhost:3000/WorkerFunction/UpdateW",
    {
      WorkerID: id,
      WorkerFName: firstName,
      WorkerLName: lastName,
      WorkerAddres: address,
      WorkerFhone: phone,
      WorkerMail: mail,
      isActive: status
    },
    function (data) {
      alert("sucssed");
      document.getElementById("tz").value = "";
      document.getElementById("tz").disabled = false;
      document.getElementById("firstName").value = "";
      document.getElementById("lastName").value = "";
      document.getElementById("phone").value = "";
      document.getElementById("mail").value = "";
      document.getElementById("address").value = "";
    });}
  //add a presence hours
  function addingHour() {
    var id = document.getElementById("IdP").value;
    var date = document.getElementById("date").value;
    var start = document.getElementById("s").value;
    var end = document.getElementById("e").value;
    $.post("http://localhost:3000/WorkerFunction/addingHour",
      {
        WorkerIdP: id,
        date: date,
        start: start,
        end: end
      },
      function (data) {
        alert(data);
      });
  }
  //show all the presence of emplyee by pressing ID
  function showPresence() {
    document.getElementById("block2").innerHTML = "";
    var id = document.getElementById("lastID").value;
    document.getElementById("block2").style.height = 110;
    $.post("http://localhost:3000/WorkerFunction/showPresence",
      {
        WorkerIdP: id
      },
      function (data) {
        document.getElementById("block2").innerHTML = data;
      });
  }
