function fetchData() {
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
                itemDiv.className = 'device-item';
                itemDiv.innerHTML = `
                    <div class="device-header">
                        <span class="device-name"><h3><strong>${item.title}</strong></h3></span>
                        <div class="device-circle" onclick="toggleActionPanel(this)" data-url="${item.url}"></div>
                    </div>
                    <div class="action-panel hidden">
                        <button>详细</button>
                    </div>
                    <a href="https://${item.url}"><div class="device-details">${item.url}</div></a>
                    
                `;
                container.appendChild(itemDiv);
            });
        }
    };
    xhr.send();


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
        if (xhr.readyState === 4 && xhr.status === 200){
            var sta = JSON.parse(xhr.responseText)["status"];
            console.log(sta);
            if (sta==="failed")alert(url+"已存在");
            fetchData()
        }
    }
    var data = JSON.stringify({url: url});
    xhr.send(data);
    closeModal();
}

function deleteDevice() {
    var datas = [];
    devices = document.getElementsByClassName("selected");
    if (!devices.length)alert("请选择要删除的目标");
    for (let i = 0; i < devices.length; i++) {
        url = devices[i].getAttribute("data-url");
        console.log(devices[i]);
        datas.push({url: url});
    }
    console.log(datas)
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/deleteDevices/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200){
            console.log('success');
            fetchData()
        }
    }
    datas = JSON.stringify(datas);
    xhr.send(datas);
    closeModal();

}

function openModal (i) {
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
function closeModal () {
    // 隐藏弹窗
    const modals = document.getElementsByClassName("modal");
    const greyBack = document.getElementById('grey-back');
    for (let i = 0; i < modals.length; i++) {
        var modal = modals[i];
        modal.style.display = 'none';
    }
    greyBack.style.display = 'none';
}

