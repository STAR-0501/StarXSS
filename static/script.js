function getScripts() {
    var data;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/getScripts/', true);
    const container = document.querySelector('.scripts-container');
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
                        <div class="device-circle" onclick="loadContent('devices')" data-url="${item.url}"><img src="static/icons/goto.png" alt="去使用"></div>
                    </div>
                    <a href="https://starxss.starbot.top/view.php?id=${item.id}" id="script-detail">
                        <div class="detail-box">版本：${item.version}</div>
                        <div class="detail-box">${item.detail}</div
                    </a>
                `;
                container.appendChild(itemDiv);
            });
        }
    };
    xhr.send();
}