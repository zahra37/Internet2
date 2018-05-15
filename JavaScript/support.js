var supportPicture = "";
var messages = new Array();
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
                supportPicture = data.support.picture;
                chatContactImg.setAttribute("src", data.support.picture);
                window.setInterval(fetchMessages, 3000);
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
            var chatFixedMid = document.getElementsByClassName("chat-fixed-mid")[0];
            var chatCustomer = document.createElement("div");
            chatCustomer.className = "chat-customer";
            
            chatFixedMid.appendChild(chatCustomer);

            var chatCustomerText = document.createElement("div");
            chatCustomerText.className = "chat-customer-text";
            chatCustomer.appendChild(chatCustomerText);
            var customerTextSend = document.createElement("p");
            customerTextSend.className = "customer-text-send";
            customerTextSend.innerHTML = message;
            chatCustomerText.appendChild(customerTextSend);
            var customerDateSend = document.createElement("p");
            customerDateSend.className = "customer-text-date";
            var now = new Date();
            customerDateSend.innerHTML = now.getFullYear() + "/" + now.getMonth() + "/" + now.getDay() + ":" + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
            chatCustomerText.appendChild(customerDateSend);

            var chatCustomerImg = document.createElement("div");
            chatCustomerImg.className = "chat-customer-img";
            chatCustomer.appendChild(chatCustomerImg);
            var customerImgSend = document.createElement("img");
            customerImgSend.className = "customer-img-send";
            customerImgSend.setAttribute("src", "pics/portrait.png");
            chatCustomerImg.appendChild(customerImgSend);
        }
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
function fetchMessages(){
    function success() {
        var data = JSON.parse(this.responseText);

        for(i = 0; i < data.responses.length; i++){
            var chatFixedMid = document.getElementsByClassName("chat-fixed-mid")[0];
            var chatSupport = document.createElement("div");
            chatSupport.className = "chat-support";
            
            chatFixedMid.appendChild(chatSupport);

            var chatSupportImg = document.createElement("div");
            chatSupportImg.className = "chat-support-img";
            chatSupport.appendChild(chatSupportImg);
            var supportImgSend = document.createElement("img");
            supportImgSend.className = "support-img-send";
            supportImgSend.setAttribute("src", supportPicture);
            chatSupportImg.appendChild(supportImgSend);

            var chatSupportText = document.createElement("div");
            chatSupportText.className = "chat-support-text";
            chatSupport.appendChild(chatSupportText);
            var supportTextSend = document.createElement("p");
            supportTextSend.className = "support-text-send";
            supportTextSend.innerHTML = data.responses[i].message;
            chatSupportText.appendChild(supportTextSend);
            var supportDateSend = document.createElement("p");
            supportDateSend.className = "support-text-date";
            var date = new Date(data.responses[i].date);
            supportDateSend.innerHTML = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDay() + ":" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            chatSupportText.appendChild(supportDateSend);
            
            messages.push(data.responses[i]);
            
        }
    }
    function error(err) {
        console.log('Error Fetch: ', err);
    }
    var xhr = new XMLHttpRequest();
    xhr.onload = success;
    xhr.onerror = error;
    xhr.open('get', 'https://test-chat.fandogh.org/fetch', true);
    xhr.send();
}