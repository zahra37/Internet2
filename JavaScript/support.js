(function() {
    function success() {
        var data = JSON.parse(this.responseText);
        if(data.success != true){
            window.alert("پشتیبان آنلاین نیست");
        }
        else{
            function successSup() {
                var data = JSON.parse(this.responseText);
                var supportBody = document.getElementsByClassName("support-body")[0];
                var chatContactImg = document.getElementsByClassName("chat-contact-img")[0];
                supportBody.innerHTML = data.support.first + " " + data.support.last;
                chatContactImg.setAttribute("src", data.support.picture);
            }
            function errorSup(err) {
                console.log('support Error: ', err);
            }
            var xmlhttpr = new XMLHttpRequest();
            xmlhttpr.onerror = errorSup;
            xmlhttpr.onload = successSup;
            xmlhttpr.open('get', 'https://test-chat.fandogh.org/support', true);
            xmlhttpr.send();
        }
    }
    function error(err) {
        console.log('offline error: ', err);
    }
    var xmlhttpr = new XMLHttpRequest();
    xmlhttpr.onerror = error;
    xmlhttpr.onload = success;
    xmlhttpr.open('get', 'https://test-chat.fandogh.org/start', true);
    xmlhttpr.send();

 })();

function iconClicked() {
    var chatWindow = document.getElementsByClassName("chat-fixed")[0];
    chatWindow.style.display = "none";
    var chatbarWindow = document.getElementsByClassName("chatbar-fixed")[0];
    chatbarWindow.style.display = "block";
}
function chatbarclicked() {
    var chatbarWindow = document.getElementsByClassName("chatbar-fixed")[0];
    chatbarWindow.style.display = "none";
    var chatWindow = document.getElementsByClassName("chat-fixed")[0];
    chatWindow.style.display = "flex";
}
function sendMessage() {
    var message = document.getElementsByClassName("chat-textfield")[0].value;
    function success() {
        var data = JSON.parse(this.responseText);
        if(data.success == true){
            var myMessage = document.createElement("div");
        }
        console.log(data);
    }
    function error(err) {
        console.log('Send Error: ', err);
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('post', 'https://test-chat.fandogh.org/send', true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send("message=" + message);
}
