document.addEventListener('DOMContentLoaded', () => {
  const countDisplay = document.getElementById('count');
  
  // 获取当前计数
  chrome.runtime.sendMessage({ action: 'get' }, (response) => {
    countDisplay.textContent = response.count;
  });

  // 增加按钮
  document.getElementById('add').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'add', value: 1 }, (response) => {
      countDisplay.textContent = response?.count || 'Error';
    });
  });

  // 重置按钮
  document.getElementById('reset').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'reset' }, (response) => {
      countDisplay.textContent = response.count;
    });
  });
});