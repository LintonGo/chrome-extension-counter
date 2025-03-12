// 初始化存储并更新徽章
const updateBadge = () => {
  chrome.storage.local.get(['counter'], (result) => {
    // 处理首次运行时的默认值
    const value = result.counter ? String(result.counter) : '0'
    chrome.action.setBadgeText({ text: value })
    // 设置徽章样式
    chrome.action.setBadgeBackgroundColor({ color: '#FF9900' }); // 橙色背景
    chrome.action.setBadgeTextColor({ color: '#FFFFFF' }); // 白色文字（需 Chrome 81+）
  })
}

// 浏览器启动时触发
chrome.runtime.onStartup.addListener(() => {
  console.log('Browser started, updating badge...')
  updateBadge()
})

// 插件安装/更新时触发
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    chrome.storage.local.set({ counter: '0' })
  }
  updateBadge()
})

// 监听存储变化
chrome.storage.onChanged.addListener((changes) => {
  if (changes.counter?.newValue) {
    chrome.action.setBadgeText({ 
      text: String(changes.counter.newValue).substring(0, 4)  // 限制最大显示长度
    })
  }
})