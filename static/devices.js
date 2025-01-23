function getDevices() {
    nowDevice = "";
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/getDevices/', true);
    const container = document.querySelector('.devices-container');
    container.innerHTML = `
        <div class="outer-div">
            <div class="inner-div">
                <img src="static/icons/load.png" alt="加载中...">
                <span>加载中....</span>
            </div>
        </div>
    `;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = eval(xhr.responseText); // 打印服务器响应
            container.innerHTML = '';
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-box';
                itemDiv.innerHTML = `
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.title}</strong></h3></span>
                        <div class="device-circle" onclick="toggleActionPanel(this)" data-url="${item.url}"></div>
                    </div>
                    <div class="action-panel hidden">
                        <button onclick="getClients(this)" data-url="${item.url}">详细</button>
                    </div>
                    <a href="https://${item.url}"><div class="detail-box">${item.url}</div></a>
                    
                `;
                container.appendChild(itemDiv);
            });
        }
    };
    xhr.send();


}

function getClients(url) {
    loadContent('clients');
    if (url) nowDevice = url.getAttribute("data-url");

    const sendData = {device: nowDevice};
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/getClients/', true);
    xhr.setRequestHeader("Content-Type", "application/json")
    const container = document.querySelector('.devices-container');
    container.innerHTML = `
        <div class="outer-div">
            <div class="inner-div">
                <img src="static/icons/load.png" alt="加载中...">
                <span>加载中....</span>
            </div>
        </div>
    `;
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            data = eval(xhr.responseText); // 打印服务器响应
            container.innerHTML = '';
            data.forEach(item => {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'item-box';
                itemDiv.innerHTML = `
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.name}</strong></h3></span>
                        <div class="device-circle" onclick="toggleActionPanel(this)" data-name="${item.name}"></div>
                    </div>
                    <div class="action-panel hidden">
                        <button>详细</button>
                    </div>
                    <div class="detail-box">${item.detail}</div>
                    
                `;
                container.appendChild(itemDiv);
            });
        }
    };
    xhr.send(JSON.stringify(sendData));
}

function toggleActionPanel(circle) {
    isSelected = circle.classList.contains('selected');

    const panel = circle.parentElement.nextElementSibling;
    if (isSelected) {
        panel.classList.add('hidden');
        circle.classList.remove('selected');
    } else {
        panel.classList.remove('hidden');
        circle.classList.add('selected');
    }
}

function addDevice() {
    const target_url = document.getElementById("target-url");
    url = target_url.value;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/addDevices/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var sta = JSON.parse(xhr.responseText)["status"];
            console.log(sta);
            if (sta === "failed") alert(url + "已存在");
            getDevices()
        }
    }
    var data = JSON.stringify({url: url});
    xhr.send(data);
    closeModal();
}

function deleteDevice() {
    var sendData = [];
    devices = document.getElementsByClassName("selected");
    if (!devices.length) alert("请选择要删除的目标");
    for (let i = 0; i < devices.length; i++) {
        url = devices[i].getAttribute("data-url");
        console.log(devices[i]);
        sendData.push({url: url});
    }
    console.log(sendData)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deleteDevices/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success');
            getDevices()
        }
    }
    sendData = JSON.stringify(sendData);
    xhr.send(sendData);
    closeModal();
}

function deleteClient() {
    var sendData = [];
    clients = document.getElementsByClassName("selected");
    if (!clients.length) alert("请选择要删除的目标");
    for (let i = 0; i < clients.length; i++) {
        name = clients[i].getAttribute("data-name");
        console.log(clients[i]);
        sendData.push({url: nowDevice + '/' + name});
    }
    console.log(sendData)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deleteClients/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log('success');
            getClients(nowDevice)
        }
    }
    sendData = JSON.stringify(sendData);
    xhr.send(sendData);
    closeModal();
}

function openModal(i) {
    const modal = document.getElementById(i);
    const greyBack = document.getElementById('grey-back');
    const confirmBtn = document.getElementById('confirmBtn');
    const parentDiv = contentArea;

    // 计算父级div的宽高并设置弹窗大小
    const parentWidth = parentDiv.width;
    const parentHeight = parentDiv.height;
    // 将弹窗定位到父级div的中央
    modal.style.transform = 'translate(-50%, -50%)';
    // 显示弹窗
    modal.style.display = 'block';
    greyBack.style.display = 'block';
}

function closeModal() {
    // 隐藏弹窗
    closeModals()
    const greyBack = document.getElementById('grey-back');
    const modals = document.getElementsByClassName("modal");
    for (let i = 0; i < modals.length; i++) {
        var modal = modals[i];
        modal.style.display = 'none';
    }
    greyBack.style.display = 'none';
}

function closeModals() {

    const greyBack = document.getElementById('grey-back');
    const modals = document.getElementsByClassName("modals");
    for (let i = 0; i < modals.length; i++) {
        var modal = modals[i];
        modal.style.display = 'none';
    }

    greyBack.style.display = 'none';
}
