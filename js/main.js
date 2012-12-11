function init() {
document.addEventListener("deviceready", deviceReady, true);
delete init;
}


function checkPreAuth() {
    var form = $("#loginForm");
    if(window.localStorage["username"] != undefined && window.localStorage["password"] != undefined) {
navigator.notification.alert("login found", function() {});
    }
}

function handleLogin() {
    var form = $("#loginForm");    
    //disable the button so we can't resubmit while we wait
    $("#submitButton",form).attr("disabled","disabled");
    var u = $("#username", form).val();
    var p = $("#password", form).val();
    console.log("click");
    if(u != '' && p!= '') {
        $.post("http://www.mchac.com.au/aktiv/save.php", {username:u,password:p}, function(res) {
            if(res == true) {
                //store
                window.localStorage["username"] = u;
                window.localStorage["password"] = p;             
                $.mobile.changePage("some.html");
            } else {
                navigator.notification.alert("Your login failed", function() {});
            }
         $("#submitButton").removeAttr("disabled");
        },"json");
    } else {
        //Thanks Igor!
        navigator.notification.alert("You must enter a username and password", function() {});
        $("#submitButton").removeAttr("disabled");
    }
    return false;
}

function deviceReady() {
    
$("#loginForm").on("submit",handleLogin);

}

function showAlert() {
  localStorage.removeItem("username");
  localStorage.removeItem("password");
  $.mobile.changePage("index.html");
    }
    
    
    function ajaxFunction(){
    var ajaxRequest;  // The variable that makes Ajax possible!

    try{
        // Opera 8.0+, Firefox, Safari
        ajaxRequest = new XMLHttpRequest();
    } catch (e){
        // Internet Explorer Browsers
        try{
            ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try{
                ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e){
                // Something went wrong
                alert("Your browser broke!");
                return false;
            }
        }
    }
    // Create a function that will receive data sent from the server
    ajaxRequest.onreadystatechange = function(){
        if(ajaxRequest.readyState == 4){
            var ajaxDisplay = document.getElementById('ajaxDiv');
            ajaxDisplay.innerHTML = ajaxRequest.responseText;
        }
    }
    var age = window.localStorage["username"];
    var queryString = "?age=" + age ;
    ajaxRequest.open("GET", "http://www.mchac.com.au/aktiv/index.php" + queryString, true);
    ajaxRequest.send(null); 
}