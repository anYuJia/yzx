const url = "http://127.0.0.1:9999"
var Logined = 0

function Login(){
    fetch(url+"/login",{
        method: "POST",
        body:GetInfo()
    })
        .then(response => response.json())
        .then(data =>{
            if(data["code"]===200){
                //注册成功的提示
                document.querySelector(".card").style.display = "none"
                Logined =1
            }
            else{
                //登录失败的提示（密码错误）
            }
        })
}
function Register(){

    fetch(url+"/register",{
        method: "post",
        body: GetInfo()
    })
        .then(response => response.json())
        .then(data =>{
            if(data["code"]===200){
                //注册成功的提示

                document.querySelector(".card").style.display = "none"
                Logined =1
            }
            else{
                //登录失败的提示（密码错误）
            }
        })

}
function GetInfo(){
    var formData = new FormData();
    formData.append('username',document.querySelector("#username").value);
    formData.append('password',document.querySelector("#password").value);
    return formData
}
function Send(){
    const formData = new FormData();
    formData.append('content',document.querySelector("#userContent").value);
    formData.append('time',GetFormatDate())
    formData.append('username',document.querySelector("#username").value)
    fetch(url+"/insertContent",{
        method:"POST",
        body: formData
    })
        .then(response =>response.json())
        .then(data => {
            alert("评论成功")
            //评论成功的通知
        })

}
function GetFormatDate() {
    var date = new Date();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentDate = date.getFullYear() + "-" + month + "-" + strDate
        + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return currentDate;
}