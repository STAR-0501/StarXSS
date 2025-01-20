function loadContent(pageName) {
    const contentArea = document.getElementById("contentArea");
    switch (pageName) {
        case 'devices':
            contentArea.innerHTML = `
            <div class="top-line">
                <div id="back" class="control-option"><img src="static/icons/back-grey.png" alt="返回"></div>
                <div id="refresh" class="control-option"><img src="static/icons/refresh.png" alt="刷新" onclick="fetchData()"></div>
                <div id="control" class="control-option"><img src="static/icons/control-grey.png" alt="操作"></div>
                <div id="delete" class="control-option"><img src="static/icons/delete-grey.png" alt="删除" onclick="openDevice('delete-modal')"></div>
                <div id="add" class="control-option"><img src="static/icons/add-grey.png" alt="添加" onclick="openDevice('add-modal')"></div>
            </div>  
            <div id="add-modal" class="modal">
                <div id="modal-close" onclick="closeDevice('add-modal')"><img src="static/icons/close.png" alt="返回"></div>
                <input type="text" placeholder="请输入目标网站url" id="target-url">
                <button id="confirmBtn" onclick="addDevice()">保存</button>
            </div>
            <div id="delete-modal" class="modal">
                <div id="modal-close" onclick="closeDevice('delete-modal')"><img src="static/icons/close.png" alt="返回"></div>
                <h1>警告!!!</h1>
                <h3>你确定要这么做吗？这将永远删除该网站及其下所有目标设备</h3>
                <button id="confirmBtn" onclick="deleteDevice()">确定删除</button>
            </div>
            
            <div class="devices-container">
            </div>
            `;
            fetchData()
            break;
        case 'func':
            contentArea.innerHTML = `<h1>欢迎使用XSS工具箱</h1><p>请从侧边栏选择一个功能开始。</p>`;
            break;
        case 'about':
            contentArea.innerHTML = `
                <h1>STAR工作室</h1>
                <p>STAR工作室是一个专注于网络安全和编程教育的团队，我们开发了这款XSS工具箱来帮助用户学习和了解XSS攻击的原理及防御方法。</p>
                <p><strong>免责声明：</strong></p>
                <ul>
                    <li>本软件仅供教育和研究用途，禁止用于非法用途。</li>
                    <li>使用本软件所产生的一切后果，由使用者自行承担。</li>
                </ul>
                <p><strong>赞助我们：</strong></p>
                <div class="sponsorship">
                    <div class="payment-option" onclick="selectPaymentMethod('alipay')">
                        <img src="static/icons/alipay.png" alt="支付宝">
                    </div>
                    <div class="payment-option" onclick="selectPaymentMethod('wechat')">
                        <img src="static/icons/wxpay.png" alt="微信支付">
                    </div>
                    <div class="amount-options">
                        <div class="amount-option" onclick="selectAmount(5)">5元</div>
                        <div class="amount-option" onclick="selectAmount(10)">10元</div>
                        <div class="amount-option" onclick="selectAmount(20)">20元</div>
                        <div class="amount-option" onclick="selectAmount(50)">50元</div>
                    </div>
                    <button class="confirm-button" onclick="sendPaymentRequest()">确定</button>
                </div>
                <p><strong>联系我们：</strong></p>
                <p>邮箱：riyi@starbot.top</p>
            `;
            break;
        // 在这里添加更多功能案例
    }
}

