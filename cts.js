  
  var firebaseConfig = {
  apiKey: "AIzaSyBCD-idY3V9hr3luTOB1Dc6rJbYFdy3q3A",
  authDomain: "testuno-b618d.firebaseapp.com",
  databaseURL: "https://testuno-b618d-default-rtdb.firebaseio.com",
  projectId: "testuno-b618d",
  storageBucket: "testuno-b618d.appspot.com",
  messagingSenderId: "713412854759",
  appId: "1:713412854759:web:9b10a870aee9bc67e23342",
  measurementId: "G-JZ73X2J5KK"
};
  // console.log('Here');
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  database=firebase.database();
  var ref=database.ref('CTS');
  var ref1=database.ref('CTS/ID');
  var ref2=database.ref('CTS/TimeStamp');
  var ref3=database.ref('CTS/Temp');
  ref1.on('value',gotData1,errData1);

  function gotData1(data){
    var cts=data.val();
    var keys=Object.keys(cts);
    //for (var i=0;i<keys.length;i++){
      var l=keys.length-1;
      var k=keys[l];
      var id=cts[k];
      console.log(id);
      document.getElementById("d1").innerHTML=id;
    
  }
  function errData1(err){
    console.log('Error!');
    console.log(err);
  }
  ref2.on('value',gotData2,errData2);

  function gotData2(data){
    var cts=data.val();
    var keys=Object.keys(cts);
    //for (var i=0;i<keys.length;i++){
      var l=keys.length-1;
      var k=keys[l];
      var ts=cts[k];
      console.log(ts);
      document.getElementById("d2").innerHTML=ts;
    
  }
  function errData2(err){
    console.log('Error!');
    console.log(err);
  }
  ref3.on('value',gotData3,errData3);

  function gotData3(data){
    var cts=data.val();
    var keys=Object.keys(cts);
    //for (var i=0;i<keys.length;i++){
      var l=keys.length-1;
      var k=keys[l];
      var temp=cts[k];
      console.log(temp);

      if(temp>37.23){
        document.getElementById("d3").style.color = "#ff5757";
        document.getElementById("status").style.color = "#ff5757";
        document.getElementById("status").innerHTML="CONDITION : UNSAFE";
      }
      else{
        document.getElementById("d3").style.color = "#c9e265";
        document.getElementById("status").style.color = "#c9e265";
        document.getElementById("status").innerHTML="CONDITION : SAFE";
      }
      document.getElementById("d3").innerHTML=temp+" 'C";
    }
  
  function errData3(err){
    console.log('Error!');
    console.log(err);
  }

