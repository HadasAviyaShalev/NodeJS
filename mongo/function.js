function randName() 
{
    var letters = "abcdefghijklmmop";
    var name = ""; var length = Math.floor(Math.random() * 10) + 1;
    for (i = 0; i < length; i++) { var ind = Math.floor(Math.random() * letters.length); name += letters[ind]; } return name;

}

function mct()
{
    var digits = "0123456789";
    var mct = "";
    for (i = 0; i < 9; i++) 
    {
        var ind = Math.floor(Math.random() * digits.length);
        mct += digits[ind];
    } return mct;

} 

for(var i=0;i<10;i++)
{
    db.Workers.insert({"WorkerID":mct(),"WorkerFName":randName(),"WorkerLName":randName(),"WorkerAddres":randName(),"WorkerFhone":mct(),"WorkerMail":randName(),"isActive":true})
    
}

