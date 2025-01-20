
let selectedPaymentMethod = null; // 用于存储选中的支付方式
let selectedAmount = null; // 用于存储选中的金额

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
    console.log("Amount:", selectedAmount, "Payment Method:", selectedPaymentMethod); // 这里可以添加更多的逻辑处理支付请求
}