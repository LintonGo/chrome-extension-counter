// 初始化计数器
let count = 0;

// 设置徽章颜色
chrome.action.setBadgeBackgroundColor({ color: '#ff9900' });

// 更新徽章显示
function updateBadge() {
  chrome.action.setBadgeText({ text: count.toString() });
}

// 初始化加载时更新
updateBadge();

// 接收来自弹出窗口的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "add") {
    count += request.value || 1;
    updateBadge();
  } else if (request.action === "reset") {
    count = 0;
    updateBadge();
  } else if (request.action === "get") {
    sendResponse({ count });
  }
  return true; // 保持消息通道开放
});