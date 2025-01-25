function openModal(i) {
    var selects = $('.selected');
    if (!selects.length && i !== 'add-modal') {
        alert("请选择要更改的设备");
        closeModals();
        return;
    }
    const modal = $('#' + i);
    const greyBack = $('#grey-back');
    const confirmBtn = $('#confirmBtn');
    const parentDiv = contentArea;

    // 计算父级div的宽高并设置弹窗大小
    const parentWidth = $(parentDiv).width();
    const parentHeight = $(parentDiv).height();
    // 将弹窗定位到父级div的中央
    modal.css('transform', 'translate(-50%, -50%)');
    // 显示弹窗
    modal.show();
    greyBack.show();
}

function closeModal() {
    // 隐藏弹窗
    closeModals();
    const greyBack = $('#grey-back');
    const modals = $('.modal');
    modals.hide();
    greyBack.hide();
}

function closeModals() {
    const modals = $('.modals');
    modals.hide();
    nowClient = "";
}
