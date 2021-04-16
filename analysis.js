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
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  database=firebase.database();
  var ref=database.ref('CTS');
  var ref1=database.ref('CTS/ID');
  var ref2=database.ref('CTS/TimeStamp');
  var ref3=database.ref('CTS/Temp');
  ref1.on('value',gotData1,errData1);
  var areaavailable,avgtemp,meter_temp,meter_area,ensemble;

  function gotData1(data){
  	var totalarea=500;
    var cts=data.val();
    var keys=Object.keys(cts);
    //for (var i=0;i<keys.length;i++){
      var l=keys.length;
      // var k=keys[l];
      // var id=cts[k];
      areaavailable=totalarea/l;
      areaavailable=parseFloat(areaavailable).toFixed(2);
      document.getElementById("hc").innerHTML=l;
      document.getElementById("aapp").innerHTML=areaavailable+" sqft" ;
      if(areaavailable<144.00){
         document.getElementById("aapp").style.color = "#ff5757";
         document.getElementById("status").style.color = "#ff5757";
         document.getElementById("status").innerHTML="CONDITION : UNSAFE";
       }
       else{
         document.getElementById("aapp").style.color = "#c9e265";
        document.getElementById("status").style.color = "#c9e265";
        document.getElementById("status").innerHTML="CONDITION : SAFE";
       }



    
  }
  function errData1(err){
    console.log('Error!');
    console.log(err);
  }

  ref3.on('value',gotData3,errData3);

  function gotData3(data){
  	var sumtemp=0;
    var cts=data.val();
    var keys=Object.keys(cts);
    for (var i=0;i<keys.length;i++){
      // var l=keys.length-1;
      var k=keys[i];
      var temp=cts[k];
      sumtemp=sumtemp+parseInt(temp);
      
  }
  avgtemp=sumtemp/keys.length;
  avgtemp=parseFloat(avgtemp).toFixed(2);
  var thresh_temp=37.23;
  var thresh_area=144.00;
  var diff_temp,diff_area;
  document.getElementById("avgt").innerHTML=avgtemp+" 'C";

       if(avgtemp>37.23){
       	diff_temp=avgtemp - thresh_temp;
       	diff_temp=diff_temp*3;
       	var per_temp=(diff_temp/thresh_temp)*10+5;
       	meter_temp=per_temp;
         document.getElementById("avgt").style.color = "#ff5757";
         
    //     document.getElementById("status").style.color = "#ff5757";
    //     document.getElementById("status").innerHTML="CONDITION : UNSAFE";
       }
       else{
       	diff_temp=thresh_temp- avgtemp;
       	diff_temp=diff_temp*3;
       	var per_temp=5-((diff_temp/thresh_temp)*10);
       	meter_temp=per_temp;
         document.getElementById("avgt").style.color = "#c9e265";
         
    //     document.getElementById("status").style.color = "#c9e265";
    //     document.getElementById("status").innerHTML="CONDITION : SAFE";
       }
       if(areaavailable<144.00){
       	diff_area=(144.00- areaavailable)/3;
       	var per_area=5+((diff_area/thresh_area)*10);
       	meter_area=per_area;
       	if(meter_area>10){
       		meter_area=10;
       	}
       	
       }
       else{
       	diff_area=(areaavailable-144)/3;
       	var per_area=5-((diff_area/thresh_area)*10);
       	meter_area=per_area;
       	if(meter_area<0){
       		meter_area=0;
       	}
       	
       
       }
       ensemble=meter_temp*.3+meter_area*.7;
       	ensemble=Math.round(ensemble);
       console.log(meter_temp,meter_area,ensemble);
      document.getElementById("risk-meter").value=ensemble;
   }
  
  function errData3(err){
    console.log('Error!');
    console.log(err);
  }