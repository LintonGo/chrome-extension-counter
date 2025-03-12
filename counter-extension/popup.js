document.addEventListener('DOMContentLoaded', () => {
  const numberInput = document.getElementById('numberInput')
  const setButton = document.getElementById('setButton')

  // 初始化时显示当前值
  chrome.storage.local.get(['counter'], (result) => {
    numberInput.placeholder = result.counter || '0'
  })

  setButton.addEventListener('click', () => {
    const newValue = numberInput.value.trim()
    if (!newValue) return
    
    // 格式验证
    if (!/^-?\d+$/.test(newValue)) {
      alert('请输入整数')
      return
    }

    chrome.storage.local.set({ counter: newValue }, () => {
      console.log('Value saved:', newValue)
      numberInput.value = ''
      window.close()
    })
  })
})