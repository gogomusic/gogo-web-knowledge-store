```js
// ==UserScript==  
// @name         autoInputForm_WuhanOldManInfoSystem  
// @namespace    http://tampermonkey.net/  
// @version      0.1  
// @description  try to take over the world!  
// @author       You  
// @match        http*://*/*/auditAction!toAudit.html  
// @match        file:///*  
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==  
// @grant        none  
// ==/UserScript==  
  
(function() {  
    'use strict';  
  
    // Your code here...  
    var dto = {}  
        // 模拟数据  
    dto = {  
        name: "测试数据",  
        cardno: "测试数据",  
        age: "测试数据",  
        preview: "测试数据",  
        gt12003: "测试数据",  
        ec01014: "测试数据",  
        gt12006: "测试数据",  
        ec01003: "测试数据",  
        gt12007: "测试数据",  
        ec01005_name: "测试数据",  
        gt12008_name: "测试数据",  
        back_code_name: "测试数据",  
        gt12009: "测试数据",  
        gt19006: "测试数据",  
        approvalinfogt19006: "测试数据"  
    }  
  
  
    function fillData() {  
        Object.keys(dto).forEach((key) => {  
            document.querySelector(`#${key}`).value = (dto[key])  
  
        })  
    }  
    // 填充数据  
    fillData()  
  
    // var newButton = document.createElement('button')  
    // newButton.innerText = "填充表单"  
    // newButton.id = 'buttonInput'  
    // newButton.style.position = 'absolute'  
    // newButton.style.bottom = '20px'  
    // newButton.style.right = '20px'  
  
    // document.body.appendChild(newButton)  
    // document.querySelector('#buttonInput').addEventListener('click', () => {  
    //   fillData()  
    // })  
  
    /* 使用ajax请求数据*/  
  
  
    var request = new XMLHttpRequest(); // 新建XMLHttpRequest对象  
  
    request.onreadystatechange = function() { // 状态发生变化时，函数被回调  
        if (request.readyState === 4) { // 成功完成  
            // 判断响应结果:  
            if (request.status === 200) {  
                // 成功，通过responseText拿到响应的文本:  
                return success(request.responseText);  
            } else {  
                // 失败，根据响应码判断失败原因:  
                return fail(request.status);  
            }  
        } else {  
            // HTTP请求还在继续...  
        }  
    }  
  
    function success(text) {  
        dto = text  
    }  
  
    function fail(code) {  
        console.log(`请求失败！（${code}）`);  
    }  
    // 请求数据  
    //getData()  
    // 发送请求:  
    function getData() {  
        request.open('GET', '/api');  
        request.send();  
        console.log('请求已发送，请等待响应...');  
    }  
})();
```