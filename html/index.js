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
