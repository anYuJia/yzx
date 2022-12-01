const url = "http://127.0.0.1:9999"
let LoginEd = 0
let username =""
let info = {}



function Init(){
    fetch(url+"/index",{
        method:"POST",
    }).then(response => response.json())
        .then(data => {
            info = data['data']['data']
            for (let i = 0 ; i < info.length  ;i++){
                if (info[i].ParentsContent === ""){
                    InsertF(info[i].Username,info[i].Content,"",info[i].Time,info[i].Star)
                }else{
                    let parentNode = document.querySelectorAll(".Context")
                    for(let j = 0; j < parentNode.length;j++){
                        if (parentNode[j].getAttribute("value") === info[i].ParentsContent){
                            InsertG(parentNode[j],info[i].Username,info[i].Content,info[i].ParentsContent,info[i].Time,info[i].Star)
                        }
                    }
                }
            }
        })
}
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
                LoginEd =1
                Init();
                GetUser();
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
                LoginEd =1
                Init()
                GetUser();
            }
            else{
                //登录失败的提示（密码错误）
            }
        })

}
function GetInfo(){
    username = document.querySelector("#username").value;
    let formData = new FormData();
    formData.append('username',document.querySelector("#username").value);
    formData.append('password',document.querySelector("#password").value);
    return formData
}
function Send(){
    const formData = new FormData();
    const content = document.querySelector("#userContent").value
    const username =  document.querySelector("#username").value
    const time = GetFormatDate();
    formData.append('content',content);
    formData.append('time',time);
    formData.append('username',username);
    if (content===""){
        return
    }
    fetch(url+"/insertContent",{
        method:"POST",
        body: formData
    })
        .then(response =>response.json())
        .then(data => {
            if(data['code']===200){
                InsertF(username,content,"",time,0)
                document.querySelector("#userContent").value = "";
            }
            else{
                alert("发布失败")
            }
        })

}
function GetFormatDate() {
    const date = new Date();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    return date.getFullYear() + "-" + month + "-" + strDate
        + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}
function InsertF(username,content,parentContent,time,star){
    if(parentContent===""){
        const board = document.querySelector("#board")
        //<div class="Context">
        const newNode = document.createElement("div")
        const divContext = document.createAttribute("class")
        divContext.value = "Context"
        newNode.setAttributeNode(divContext)
        const NodeValue = document.createAttribute("value")
        NodeValue.value = content
        newNode.setAttributeNode(NodeValue)
        //<span class="username">yyyy</span>
        const span1Username = document.createElement("span")//创建节点
        const spanUsernameText = document.createTextNode(username+": ")//创建内容
        const spanUsername = document.createAttribute("class")//创建属性
        spanUsername.value = "username";//设置属性
        span1Username.setAttributeNode(spanUsername)//加属性
        span1Username.appendChild(spanUsernameText)//加文本
        newNode.appendChild(span1Username)//加上去
        //

        //<span class="content">我是第一</span>
        const span2 = document.createElement("span")//创建节点
        const spanContentText = document.createTextNode(content+"   ")//创建内容
        const spanContent = document.createAttribute("class")//创建属性
        spanContent.value = "content";//设置属性
        span2.setAttributeNode(spanContent)//加属性
        span2.appendChild(spanContentText)//加文本
        newNode.appendChild(span2)//加上去
        //
        //<span class="time">2022年12月21日</span>
        const span1Time = document.createElement("span")//创建节点
        const spanTimeText = document.createTextNode(time)//创建内容
        const spanTime = document.createAttribute("class")//创建属性
        spanTime.value = "time";//设置属性
        span1Time.setAttributeNode(spanTime)//加属性
        span1Time.appendChild(spanTimeText)//加文本
        newNode.appendChild(span1Time)//加上去
        //
        //<span class="star">
        const span1Star = document.createElement("span")//创建节点
        const spanStarText = document.createTextNode("  "+star+"赞")//创建内容
        const spanStar = document.createAttribute("class")//创建属性
        spanStar.value = "star";//设置属性
        span1Star.setAttributeNode(spanStar)//加属性
        span1Star.appendChild(spanStarText)//加文本
        span1Star.addEventListener("click",Star,false)
        newNode.appendChild(span1Star)//加上去

        //
        //<button class="cta">
        const button = document.createElement("button")//创建节点
        const buttonClass = document.createAttribute("class")//创建属性
        buttonClass.value = "cta";//设置属性
        button.setAttributeNode(buttonClass)//加属性
        newNode.appendChild(button)//加上去
        //<span class="hover-underline-animation"> 回复 </span>
        const buttonSpan = document.createElement("span")//创建节点
        const buttonSpanText = document.createTextNode("回复")//创建内容
        const buttonSpanClass = document.createAttribute("class")//创建属性
        buttonClass.value = "hover-underline-animation";//设置属性
        buttonSpan.setAttributeNode(buttonSpanClass)//加属性
        buttonSpan.appendChild(buttonSpanText)//加文本
        button.appendChild(buttonSpan)//加上去
        button.addEventListener('click',Anser, false);
        board.appendChild(newNode)
        //
        //插入留言框
        const inputText = document.createElement("input")
        const inputTextClass = document.createAttribute("class")
        inputTextClass.value = "inputText"
        inputText.setAttributeNode(inputTextClass)
        newNode.appendChild(inputText)
    }else{

    }
}
function GetUser(){
    const info = document.createTextNode("当前用户："+username)
    document.querySelector("#User").appendChild(info)
}
function InsertG(nodeP,username,content,parentContent,time,star){
    const newNode = document.createElement("div")
    const divContext = document.createAttribute("class")
    divContext.value = "Context"
    newNode.setAttributeNode(divContext)
    const NodeValue = document.createAttribute("value")
    NodeValue.value = content
    newNode.setAttributeNode(NodeValue)
    //<span class="username">yyyy</span>
    const span1Username = document.createElement("span")//创建节点
    const spanUsernameText = document.createTextNode("~     @"+username)//创建内容
    const spanUsername = document.createAttribute("class")//创建属性
    spanUsername.value = "username";//设置属性
    span1Username.setAttributeNode(spanUsername)//加属性
    span1Username.appendChild(spanUsernameText)//加文本
    newNode.appendChild(span1Username)//加上去
    //
    const spanParent = document.createElement("span")//创建节点
    const spanParentText = document.createTextNode("   回复“"+parentContent+"”: ")//创建内容
    const spanParentclass = document.createAttribute("class")//创建属性
    spanUsername.value = "parentContent";//设置属性
    spanParent.setAttributeNode(spanParentclass)//加属性
    spanParent.appendChild(spanParentText)//加文本
    newNode.appendChild(spanParent)//加上去

    //<span class="content">我是第一</span>
    const span2 = document.createElement("span")//创建节点
    const spanContentText = document.createTextNode(content+"   ")//创建内容
    const spanContent = document.createAttribute("class")//创建属性
    spanContent.value = "content";//设置属性
    span2.setAttributeNode(spanContent)//加属性
    span2.appendChild(spanContentText)//加文本
    newNode.appendChild(span2)//加上去
    //
    //<span class="time">2022年12月21日</span>
    const span1Time = document.createElement("span")//创建节点
    const spanTimeText = document.createTextNode(time)//创建内容
    const spanTime = document.createAttribute("class")//创建属性
    spanTime.value = "time";//设置属性
    span1Time.setAttributeNode(spanTime)//加属性
    span1Time.appendChild(spanTimeText)//加文本
    newNode.appendChild(span1Time)//加上去
    //
    //<span class="star">
    const span1Star = document.createElement("span")//创建节点
    const spanStarText = document.createTextNode("  "+star+"赞")//创建内容
    const spanStar = document.createAttribute("class")//创建属性
    spanStar.value = "star";//设置属性
    span1Star.setAttributeNode(spanStar)//加属性
    span1Star.appendChild(spanStarText)//加文本
    span1Star.addEventListener("click",Star,false)
    newNode.appendChild(span1Star)//加上去

    //
    //<button class="cta">
    const button = document.createElement("button")//创建节点
    const buttonClass = document.createAttribute("class")//创建属性
    buttonClass.value = "cta";//设置属性
    button.setAttributeNode(buttonClass)//加属性
    newNode.appendChild(button)//加上去
    //<span class="hover-underline-animation"> 回复 </span>
    const buttonSpan = document.createElement("span")//创建节点
    const buttonSpanText = document.createTextNode("回复")//创建内容
    const buttonSpanClass = document.createAttribute("class")//创建属性
    buttonClass.value = "hover-underline-animation";//设置属性
    buttonSpan.setAttributeNode(buttonSpanClass)//加属性
    buttonSpan.appendChild(buttonSpanText)//加文本
    button.addEventListener('click',Anser, false);
    button.appendChild(buttonSpan)//加上去

    //
    //插入留言框
    const inputText = document.createElement("input")
    const inputTextClass = document.createAttribute("class")
    inputTextClass.value = "inputText"
    inputText.setAttributeNode(inputTextClass)
    newNode.appendChild(inputText)
    insertAfter(newNode,nodeP)
    //nodeP.appendChild(newNode)
}
function insertAfter(newElement,targetElement){
    let parent = targetElement.parentNode;
    if(parent.lastChild === targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}
function Anser(e){
    const x = e.target;
    //alert(x.parentNode.nextSibling.value)
    //alert(x.parentNode.parentNode.getAttribute("value"))
    const formData = new FormData()
    formData.append('username',username);
    formData.append('content',x.parentNode.nextSibling.value);
    formData.append('time',GetFormatDate());
    formData.append('parentContent',x.parentNode.parentNode.getAttribute("value"));
    ////
    if(x.parentNode.nextSibling.value===""){
        return
    }
    fetch(url+"/insertContent",{
        method: "post",
        body: formData
    })
        .then(response => response.json())
        .then(data =>{
            if(data["code"]===200){
                //回复成功
                const parentNode = x.parentNode.parentNode
                InsertG(parentNode,username,x.parentNode.nextSibling.value,x.parentNode.parentNode.getAttribute("value"),GetFormatDate(),0)
                x.parentNode.nextSibling.value = ""
            }
            else{
                //回复失败
            }
        })
}
function Star(e){
    const formData = new FormData()
    const x =e.target
    //alert(x.parentNode.getAttribute("value"))
    //alert(x.parentNode.querySelector(".time").innerHTML)
    formData.append("content",x.parentNode.getAttribute("value"))
    formData.append("content",x.parentNode.querySelector(".time").innerHTML)
    fetch(url+"/star",{
        method:"POST",
        body:formData
    })
        .then(response => response.json())
        .then(data => {
            if (data["code"]===200){
                //成功
                //alert(x.parentNode.querySelector(".time").innerHTML)
                x.innerHTML = data["data"]["star"]+"赞"
            }
            else {
                //失败
            }
        })
}