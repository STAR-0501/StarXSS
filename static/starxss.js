function loadContent(pageName) {
    const contentArea = document.getElementById("contentArea");
    switch (pageName) {
        case 'devices':
            contentArea.innerHTML = `
            <div class="top-line">
                <div id="back" class="control-option"><img src="static/icons/back.png" alt="返回"></div>
                <div id="refresh" class="control-option"><img src="static/icons/refresh.png" alt="刷新" onclick="fetchData()"></div>
                <div id="control" class="control-option"><img src="static/icons/control.png" alt="操作" onclick="openModal('control-modal')"></div>
                <div id="delete" class="control-option"><img src="static/icons/delete.png" alt="删除" onclick="openModal('delete-modal')"></div>
                <div id="add" class="control-option"><img src="static/icons/add.png" alt="添加" onclick="openModal('add-modal')"></div>
            </div>  
            <div id="grey-back"></div>
            <div id="add-modal" class="modal">
                <div id="modal-close" onclick="closeModal()"><img src="static/icons/close.png" alt="返回"></div>
                <input type="text" placeholder="请输入目标网站url" id="target-url">
                <button id="confirmBtn" onclick="addDevice()">保存</button>
            </div>
            <div id="delete-modal" class="modal">
                <div id="modal-close" onclick="closeModal()"><img src="static/icons/close.png" alt="返回"></div>
                <h1>警告!!!</h1>
                <h3>你确定要这么做吗？这将永远删除该网站及其下所有目标设备</h3>
                <button id="confirmBtn" onclick="deleteDevice()">确定删除</button>
            </div>
            <div id="control-modal" class="modal">
                <div id="modal-close" onclick="closeModal()"><img src="static/icons/close.png" alt="返回"></div>
                <div id="control-content">
                    <div class="control-button" id="modals" onclick=""><img src="static/icons/modals.png" alt="使用模块"></div>
                    <div class="control-button" id="auto" onclick=""><img src="static/icons/auto.png" alt="自动运行"></div>
                    <div class="control-button" id="console" onclick=""><img src="static/icons/console.png" alt="控制台"></div>
                    <div class="control-button" id="args" onclick=""><img src="static/icons/args.png" alt="设置参数"></div>
                </div>
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
            <div id="grey-back"></div>
            <div id="pay-modal" class="modal">
                <div id="modal-close" onclick="closeModal()"><img src="static/icons/close.png" alt="返回"></div>
                <img src="" alt="赞助" id="qrcode">
            </div>
                <h1>STAR工作室</h1>
                <p>STAR工作室是一个专注于网络安全和编程教育的团队，我们开发了这款XSS工具箱来帮助用户学习和了解XSS攻击的原理及防御方法。</p>
                <p><strong>免责声明：</strong></p>
                <ul>
                    <li>本软件仅供教育和研究用途，禁止用于非法用途。</li>
                    <li>使用本软件所产生的一切后果，由使用者自行承担。</li>
                </ul>
                <p><strong>赞助我们：</strong></p>
                <div class="sponsorship">
                    <div class="payment-option" onclick="selectPaymentMethod('ali')">
                        <img src="static/icons/alipay.png" alt="支付宝">
                    </div>
                    <div class="payment-option" onclick="selectPaymentMethod('wx')">
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

window.onload = function () {
    document.onkeydown = function (event) {
      if (event.key === 'Escape') {
        closeModal()
      }
    }
}