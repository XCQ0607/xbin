import { sanitizeHtml, formatDate, formatTimeRemaining } from '../utils.js';

const CSS_STYLES = `
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-attachment: fixed;
  min-height: 100vh;
  color: #333;
  line-height: 1.6;
  overflow-x: hidden;
}

body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  position: relative;
}

.header {
  text-align: center;
  margin-bottom: 50px;
  color: white;
  padding: 60px 0 40px;
}

.header h1 {
  font-size: 3.5rem;
  margin-bottom: 15px;
  text-shadow: 0 4px 20px rgba(0,0,0,0.3);
  font-weight: 700;
  letter-spacing: -2px;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header p {
  font-size: 1.3rem;
  opacity: 0.95;
  font-weight: 300;
  margin-bottom: 0;
  text-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 40px;
  box-shadow:
    0 20px 40px rgba(0,0,0,0.1),
    0 0 0 1px rgba(255,255,255,0.2);
  margin-bottom: 30px;
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
}

.card h3 {
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 25px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.form-group {
  margin-bottom: 25px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #444;
  font-size: 15px;
}

.form-control {
  width: 100%;
  padding: 15px 18px;
  border: 2px solid #e8ecf0;
  border-radius: 12px;
  font-size: 16px;
  transition: all 0.3s ease;
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(10px);
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
  background: rgba(255,255,255,0.95);
  transform: translateY(-1px);
}

textarea.form-control {
  min-height: 200px;
  resize: vertical;
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  margin-right: 12px;
  margin-bottom: 12px;
  min-width: 120px;
  height: 48px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn:hover::before {
  left: 100%;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  text-decoration: none;
  color: white;
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn-secondary {
  background: linear-gradient(135deg, #6c757d 0%, #5a6268 100%);
  box-shadow: 0 4px 15px rgba(108, 117, 125, 0.2);
}

.btn-secondary:hover {
  box-shadow: 0 8px 25px rgba(108, 117, 125, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
  box-shadow: 0 4px 15px rgba(220, 53, 69, 0.2);
}

.btn-danger:hover {
  box-shadow: 0 8px 25px rgba(220, 53, 69, 0.4);
}

.btn-success {
  background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.2);
}

.btn-success:hover {
  box-shadow: 0 8px 25px rgba(40, 167, 69, 0.4);
}

.btn-info {
  background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
  box-shadow: 0 4px 15px rgba(23, 162, 184, 0.2);
}

.btn-info:hover {
  box-shadow: 0 8px 25px rgba(23, 162, 184, 0.4);
}

.btn-github {
  background: linear-gradient(135deg, #24292e 0%, #1a1e22 100%);
  box-shadow: 0 4px 15px rgba(36, 41, 46, 0.2);
  color: white;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  padding: 10px 16px;
  min-width: auto;
  height: auto;
}

.btn-github:hover {
  box-shadow: 0 8px 25px rgba(36, 41, 46, 0.4);
  color: white;
  text-decoration: none;
}

.github-icon {
  width: 16px;
  height: 16px;
  fill: currentColor;
}

.row {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 200px;
}

.alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.alert-error {
  background: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

.alert-success {
  background: #d4edda;
  color: #155724;
  border: 1px solid #c3e6cb;
}

.paste-info {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
  color: #666;
}

.paste-info span {
  margin-right: 20px;
}

.copy-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(0,0,0,0.7);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.paste-content {
  position: relative;
  background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
  border: 1px solid rgba(0,0,0,0.1);
  border-radius: 16px;
  padding: 25px;
  margin: 25px 0;
  box-shadow:
    inset 0 1px 3px rgba(0,0,0,0.1),
    0 4px 15px rgba(0,0,0,0.05);
  backdrop-filter: blur(10px);
}

.paste-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #2d3748;
  background: rgba(255,255,255,0.7);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(0,0,0,0.05);
}

.password-input-container {
  position: relative;
}

.password-input-container .form-control {
  padding-right: 45px;
}

.password-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  font-size: 16px;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #333;
  background-color: rgba(0,0,0,0.05);
}

.password-toggle:active {
  transform: translateY(-50%) scale(0.95);
}

.datetime-container {
  position: relative;
}

.datetime-input {
  width: 100%;
  padding: 12px;
  border: 2px solid #e1e5e9;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  background: white;
}

.datetime-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.footer {
  text-align: center;
  margin-top: 40px;
  color: rgba(255,255,255,0.8);
  font-size: 14px;
}

.stats-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.stats-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 20px;
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.2),
    0 0 0 1px rgba(255,255,255,0.2);
  max-width: 600px;
  width: 90%;
  border: 1px solid rgba(255,255,255,0.2);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.stats-content h3 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 1.8rem;
  font-weight: 700;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 25px;
  margin: 30px 0;
}

.stat-item {
  text-align: center;
  padding: 25px 20px;
  background: linear-gradient(145deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 16px;
  box-shadow:
    0 4px 15px rgba(0,0,0,0.1),
    inset 0 1px 0 rgba(255,255,255,0.5);
  border: 1px solid rgba(255,255,255,0.2);
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 1rem;
  color: #555;
  font-weight: 500;
}

@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .header h1 {
    font-size: 2rem;
  }

  .card {
    padding: 20px;
  }

  .row {
    flex-direction: column;
  }

  .toast {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
  }
}
</style>
`;

const JAVASCRIPT = `
<script>
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    showAlert('已复制到剪贴板！', 'success');
  }).catch(() => {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showAlert('已复制到剪贴板！', 'success');
  });
}

function showAlert(message, type = 'success') {
  // 移除现有的toast
  const existingToasts = document.querySelectorAll('.toast');
  existingToasts.forEach(toast => toast.remove());

  const toast = document.createElement('div');
  toast.className = \`toast \${type}\`;
  toast.style.cssText = \`
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(20px);
    padding: 16px 24px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255,255,255,0.2);
    z-index: 3000;
    animation: slideInRight 0.3s ease;
    max-width: 400px;
    border-left: 4px solid \${type === 'success' ? '#28a745' : type === 'error' ? '#dc3545' : '#ffc107'};
  \`;

  toast.innerHTML = \`
    <div style="display: flex; align-items: center; gap: 10px;">
      <span style="font-size: 18px;">
        \${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}
      </span>
      <span style="color: #333; font-weight: 500;">\${message}</span>
    </div>
  \`;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = 'slideInRight 0.3s ease reverse';
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 3000);
}

function toggleAdvanced() {
  const advanced = document.getElementById('advanced-options');
  const btn = document.querySelector('[onclick="toggleAdvanced()"]');

  if (advanced.style.display === 'none') {
    advanced.style.display = 'block';
    btn.textContent = '隐藏高级选项';
  } else {
    advanced.style.display = 'none';
    btn.textContent = '显示高级选项';
  }
}

async function createPaste() {
  const content = document.getElementById('content').value;
  const customId = document.getElementById('customId').value;
  const password = document.getElementById('password').value;
  const expiresIn = getExpirationTime();

  if (!content.trim()) {
    showAlert('请输入一些内容', 'error');
    return;
  }

  const data = {
    content: content,
    customId: customId || undefined,
    password: password || undefined,
    expiresIn: expiresIn || undefined
  };

  try {
    const response = await fetch('/api/paste', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      window.location.href = result.url;
    } else {
      showAlert(result.error || '创建粘贴板失败', 'error');
    }
  } catch (error) {
    showAlert('网络错误', 'error');
  }
}

async function updatePaste(pasteId) {
  const content = document.getElementById('content').value;
  const password = document.getElementById('password').value;

  const data = {
    content: content,
    password: password || undefined
  };

  try {
    const response = await fetch(\`/api/paste/\${pasteId}\`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
      showAlert('粘贴板更新成功！', 'success');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      showAlert(result.error || '更新粘贴板失败', 'error');
    }
  } catch (error) {
    showAlert('网络错误', 'error');
  }
}

async function deletePaste(pasteId) {
  if (!confirm('确定要删除这个粘贴板吗？')) {
    return;
  }

  const password = document.getElementById('password').value;
  const url = \`/api/paste/\${pasteId}\` + (password ? \`?password=\${encodeURIComponent(password)}\` : '');

  try {
    const response = await fetch(url, {
      method: 'DELETE'
    });

    const result = await response.json();

    if (response.ok) {
      showAlert('粘贴板删除成功！', 'success');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    } else {
      showAlert(result.error || '删除粘贴板失败', 'error');
    }
  } catch (error) {
    showAlert('网络错误', 'error');
  }
}

function submitPassword() {
  const password = document.getElementById('password').value;
  const currentUrl = new URL(window.location);
  currentUrl.searchParams.set('password', password);
  window.location.href = currentUrl.toString();
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  const toggle = input.nextElementSibling;

  if (input.type === 'password') {
    input.type = 'text';
    toggle.textContent = '🙈';
    toggle.title = '隐藏密码';
  } else {
    input.type = 'password';
    toggle.textContent = '👁️';
    toggle.title = '显示密码';
  }
}

function initializeDateTimePicker() {
  const expiresSelect = document.getElementById('expiresIn');
  const customDateContainer = document.getElementById('custom-date-container');
  const customDateInput = document.getElementById('customDate');

  if (expiresSelect) {
    expiresSelect.addEventListener('change', function() {
      if (this.value === 'custom') {
        customDateContainer.style.display = 'block';
        // 设置最小日期为当前时间
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        customDateInput.min = now.toISOString().slice(0, 16);
      } else {
        customDateContainer.style.display = 'none';
      }
    });
  }
}

function getExpirationTime() {
  const expiresSelect = document.getElementById('expiresIn');
  const customDateInput = document.getElementById('customDate');

  if (expiresSelect.value === 'custom' && customDateInput.value) {
    const selectedDate = new Date(customDateInput.value);
    const now = new Date();
    const diffInSeconds = Math.floor((selectedDate.getTime() - now.getTime()) / 1000);
    return diffInSeconds > 0 ? diffInSeconds : null;
  } else if (expiresSelect.value) {
    return parseInt(expiresSelect.value);
  }

  return null;
}

// 分享功能
function sharePaste(url) {
  if (navigator.share) {
    navigator.share({
      title: 'XBin 粘贴板',
      text: '查看这个粘贴板内容',
      url: url
    }).catch(err => {
      console.log('分享失败:', err);
      copyToClipboard(url);
    });
  } else {
    // 降级到复制链接
    copyToClipboard(url);
  }
}

// 下载功能
function downloadPaste(pasteId) {
  const content = document.querySelector('.paste-text').textContent;
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = \`paste-\${pasteId}.txt\`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showAlert('文件下载已开始！', 'success');
}

// 统计信息功能
async function showStats() {
  try {
    const response = await fetch('/api/stats');
    const stats = await response.json();

    if (response.ok) {
      const statsHtml = \`
        <div class="stats-modal">
          <div class="stats-content">
            <h3>📊 统计信息</h3>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-number">\${stats.totalPastes || 0}</div>
                <div class="stat-label">活跃粘贴板数</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">\${stats.totalViews || 0}</div>
                <div class="stat-label">总查看次数</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">\${stats.todayPastes || 0}</div>
                <div class="stat-label">今日新增</div>
              </div>
            </div>
            <div style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.05); border-radius: 8px; font-size: 14px; color: #666;">
              <p style="margin: 0;"><strong>说明：</strong></p>
              <p style="margin: 5px 0 0 0;">• 统计数据实时更新，只包含当前有效的粘贴板</p>
              <p style="margin: 5px 0 0 0;">• 已过期和已删除的粘贴板不计入统计</p>
              <p style="margin: 5px 0 0 0;">• 数据与后台管理保持一致</p>
            </div>
            <button onclick="closeStats()" class="btn" style="margin-top: 20px;">关闭</button>
          </div>
        </div>
      \`;
      document.body.insertAdjacentHTML('beforeend', statsHtml);
    }
  } catch (error) {
    showAlert('获取统计信息失败', 'error');
  }
}

function closeStats() {
  const modal = document.querySelector('.stats-modal');
  if (modal) {
    modal.remove();
  }
}

// 快速访问功能
function quickAccess() {
  const pasteId = document.getElementById('quickAccessId').value.trim();

  if (!pasteId) {
    showAlert('请输入粘贴板 ID', 'error');
    return;
  }

  // 简单验证ID格式（只允许字母、数字、连字符、下划线）
  if (!/^[a-zA-Z0-9_-]+$/.test(pasteId)) {
    showAlert('粘贴板 ID 格式无效', 'error');
    return;
  }

  // 跳转到粘贴板页面
  window.location.href = \`/\${pasteId}\`;
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initializeDateTimePicker();

  // 为快速访问输入框添加回车键支持
  const quickAccessInput = document.getElementById('quickAccessId');
  if (quickAccessInput) {
    quickAccessInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        quickAccess();
      }
    });
  }

  // 添加键盘快捷键
  document.addEventListener('keydown', function(e) {
    // Ctrl+Enter 快速创建
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      const createBtn = document.querySelector('[onclick="createPaste()"]');
      if (createBtn) {
        createPaste();
      }
    }

    // Ctrl+K 复制链接
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const copyBtn = document.querySelector('[onclick*="copyToClipboard"]');
      if (copyBtn) {
        copyBtn.click();
      }
    }
  });
});
</script>
`;

export function getHomePage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>XBin - 安全的在线粘贴板服务</title>
  ${CSS_STYLES}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📋 XBin</h1>
      <p>安全、快速、可靠的在线粘贴板服务</p>
    </div>

    <div class="card">
      <div class="form-group">
        <label for="content">内容 *</label>
        <textarea id="content" class="form-control" placeholder="在此粘贴您的内容..."></textarea>
      </div>

      <button type="button" class="btn btn-secondary" onclick="toggleAdvanced()">显示高级选项</button>

      <div id="advanced-options" style="display: none; margin-top: 20px;">
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label for="customId">自定义链接 (可选)</label>
              <input type="text" id="customId" class="form-control" placeholder="my-custom-url">
              <small style="color: #666;">留空则随机生成链接</small>
            </div>
          </div>
          <div class="col">
            <div class="form-group">
              <label for="password">密码保护 (可选)</label>
              <div class="password-input-container">
                <input type="password" id="password" class="form-control" placeholder="输入密码">
                <button type="button" class="password-toggle" onclick="togglePasswordVisibility('password')" title="显示密码">👁️</button>
              </div>
              <small style="color: #666;">为您的粘贴板设置密码保护</small>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="expiresIn">过期时间 (可选)</label>
          <select id="expiresIn" class="form-control">
            <option value="">永不过期</option>
            <option value="1800">30 分钟</option>
            <option value="3600">1 小时</option>
            <option value="21600">6 小时</option>
            <option value="43200">12 小时</option>
            <option value="86400">1 天</option>
            <option value="259200">3 天</option>
            <option value="604800">1 周</option>
            <option value="1209600">2 周</option>
            <option value="2592000">1 个月</option>
            <option value="7776000">3 个月</option>
            <option value="15552000">6 个月</option>
            <option value="31536000">1 年</option>
            <option value="custom">自定义时间</option>
          </select>
        </div>

        <div id="custom-date-container" class="form-group" style="display: none;">
          <label for="customDate">选择过期时间</label>
          <input type="datetime-local" id="customDate" class="datetime-input">
          <small style="color: #666;">选择具体的过期日期和时间</small>
        </div>
      </div>

      <div style="margin-top: 20px;">
        <button type="button" class="btn" onclick="createPaste()">创建粘贴板</button>
        <button type="button" class="btn btn-info" onclick="showStats()">📊 统计信息</button>
        <a href="/admin" class="btn btn-secondary">🔐 后台管理</a>
        <a href="https://github.com/XCQ0607/xbin" target="_blank" class="btn btn-github">
          <svg class="github-icon" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
          </svg>
          GitHub
        </a>
      </div>
    </div>

    <div class="card">
      <h3>🔍 快速访问</h3>
      <div class="form-group">
        <label for="quickAccessId">输入粘贴板 ID</label>
        <div style="display: flex; gap: 10px;">
          <input type="text" id="quickAccessId" class="form-control" placeholder="输入粘贴板 ID..." style="flex: 1;">
          <button type="button" class="btn" onclick="quickAccess()">访问</button>
        </div>
        <small style="color: #666;">输入已知的粘贴板 ID 快速跳转</small>
      </div>
    </div>

    <div class="footer">
      <p>基于 Cloudflare Pages 构建 • <a href="/api" style="color: rgba(255,255,255,0.8);">API 文档</a> • <a href="/admin" style="color: rgba(255,255,255,0.8);">🔐 后台管理</a> • <a href="https://github.com/XCQ0607/xbin" target="_blank" style="color: rgba(255,255,255,0.8);">📦 GitHub</a> • 快捷键: Ctrl+Enter 创建, Ctrl+K 复制链接, Enter 快速访问</p>
    </div>
  </div>

  ${JAVASCRIPT}
</body>
</html>`;
}

export function getPastePage(pasteId, paste = null, requirePassword = false, errorMessage = '', currentDomain = '') {
  if (requirePassword) {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>需要密码 - XBin</title>
  ${CSS_STYLES}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🔒 需要密码</h1>
      <p>此粘贴板受密码保护</p>
    </div>

    ${errorMessage ? `<div class="alert alert-error">${sanitizeHtml(errorMessage)}</div>` : ''}

    <div class="card">
      <div class="form-group">
        <label for="password">输入密码</label>
        <div class="password-input-container">
          <input type="password" id="password" class="form-control" placeholder="输入密码" autofocus>
          <button type="button" class="password-toggle" onclick="togglePasswordVisibility('password')" title="显示密码">👁️</button>
        </div>
      </div>

      <button type="button" class="btn" onclick="submitPassword()">访问粘贴板</button>
      <a href="/" class="btn btn-secondary">创建新粘贴板</a>
    </div>

    <div class="footer">
      <p>基于 Cloudflare Pages 构建 • <a href="https://github.com/XCQ0607/xbin" target="_blank" style="color: rgba(255,255,255,0.8);">📦 GitHub</a></p>
    </div>
  </div>

  ${JAVASCRIPT}
</body>
</html>`;
  }

  const content = sanitizeHtml(paste.content);
  const createdAt = formatDate(paste.createdAt);
  const expiresAt = paste.expiresAt ? formatTimeRemaining(paste.expiresAt) : '永不过期';
  const currentUrl = `${currentDomain}/${pasteId}`;

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>粘贴板 ${pasteId} - XBin</title>
  ${CSS_STYLES}
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📄 XBin</h1>
      <p>粘贴板 ID: ${sanitizeHtml(pasteId)}</p>
    </div>

    <div class="card">
      <div class="paste-info">
        <span><strong>创建时间:</strong> ${createdAt}</span>
        <span><strong>过期时间:</strong> ${expiresAt}</span>
        <span><strong>查看次数:</strong> ${paste.views}</span>
        ${paste.hasPassword ? '<span><strong>🔒 密码保护</strong></span>' : ''}
      </div>

      <div class="paste-content">
        <button class="copy-btn" onclick="copyToClipboard(\`${content.replace(/`/g, '\\`')}\`)">复制</button>
        <div class="paste-text">${content}</div>
      </div>

      <div style="margin-top: 20px;">
        <a href="/" class="btn btn-secondary">创建新粘贴板</a>
        <button type="button" class="btn" onclick="editPaste()">编辑</button>
        <button type="button" class="btn btn-danger" onclick="deletePaste('${pasteId}')">删除</button>
        <button type="button" class="btn btn-info" onclick="sharePaste('${currentUrl}')">分享</button>
        <button type="button" class="btn btn-success" onclick="downloadPaste('${pasteId}')">下载</button>
      </div>

      <div id="edit-section" style="display: none; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px;">
        <div class="form-group">
          <label for="content">编辑内容</label>
          <textarea id="content" class="form-control">${content}</textarea>
        </div>

        ${paste.hasPassword ? `
        <div class="form-group">
          <label for="password">密码</label>
          <div class="password-input-container">
            <input type="password" id="password" class="form-control" placeholder="输入密码以编辑">
            <button type="button" class="password-toggle" onclick="togglePasswordVisibility('password')" title="显示密码">👁️</button>
          </div>
        </div>
        ` : ''}

        <button type="button" class="btn" onclick="updatePaste('${pasteId}')">保存更改</button>
        <button type="button" class="btn btn-secondary" onclick="cancelEdit()">取消</button>
      </div>
    </div>

    <div class="footer">
      <p>基于 Cloudflare Pages 构建 • <a href="https://github.com/XCQ0607/xbin" target="_blank" style="color: rgba(255,255,255,0.8);">📦 GitHub</a></p>
    </div>
  </div>

  ${JAVASCRIPT}

  <script>
  function editPaste() {
    document.getElementById('edit-section').style.display = 'block';
    document.getElementById('content').focus();
  }

  function cancelEdit() {
    document.getElementById('edit-section').style.display = 'none';
  }
  </script>
</body>
</html>`;
}

export function getErrorPage(errorType = 'not_found', pasteId = '', currentDomain = '') {
  let title, heading, message, icon, suggestions;

  switch (errorType) {
    case 'not_found':
      title = '粘贴板未找到 - XBin';
      heading = '😕 粘贴板未找到';
      icon = '🔍';
      message = `抱歉，粘贴板 "${sanitizeHtml(pasteId)}" 不存在或已被删除。`;
      suggestions = [
        '检查链接是否正确',
        '粘贴板可能已过期',
        '粘贴板可能已被删除',
        '创建一个新的粘贴板'
      ];
      break;
    case 'expired':
      title = '粘贴板已过期 - XBin';
      heading = '⏰ 粘贴板已过期';
      icon = '⌛';
      message = `粘贴板 "${sanitizeHtml(pasteId)}" 已过期并被自动删除。`;
      suggestions = [
        '粘贴板已超过设定的过期时间',
        '过期的粘贴板会被自动清理',
        '创建一个新的粘贴板',
        '设置更长的过期时间'
      ];
      break;
    case 'password_required':
      title = '需要密码 - XBin';
      heading = '🔒 需要密码';
      icon = '🔐';
      message = `粘贴板 "${sanitizeHtml(pasteId)}" 受密码保护。`;
      suggestions = [
        '请输入正确的密码',
        '联系分享者获取密码',
        '密码区分大小写',
        '创建一个新的粘贴板'
      ];
      break;
    default:
      title = '出错了 - XBin';
      heading = '❌ 出错了';
      icon = '⚠️';
      message = '发生了未知错误。';
      suggestions = [
        '请稍后重试',
        '检查网络连接',
        '联系技术支持',
        '返回首页'
      ];
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${CSS_STYLES}
  <style>
  .error-container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
  }

  .error-icon {
    font-size: 4rem;
    margin-bottom: 20px;
    display: block;
  }

  .error-heading {
    font-size: 2rem;
    margin-bottom: 15px;
    color: white;
    text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  }

  .error-message {
    font-size: 1.1rem;
    margin-bottom: 30px;
    color: rgba(255,255,255,0.9);
    line-height: 1.6;
  }

  .suggestions {
    background: rgba(255,255,255,0.95);
    backdrop-filter: blur(20px);
    border-radius: 16px;
    padding: 30px;
    margin: 30px 0;
    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    border: 1px solid rgba(255,255,255,0.2);
    text-align: left;
  }

  .suggestions h3 {
    color: #333;
    margin-bottom: 20px;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .suggestions ul {
    list-style: none;
    padding: 0;
  }

  .suggestions li {
    padding: 8px 0;
    color: #555;
    position: relative;
    padding-left: 25px;
  }

  .suggestions li::before {
    content: '💡';
    position: absolute;
    left: 0;
    top: 8px;
  }

  .action-buttons {
    display: flex;
    gap: 15px;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 30px;
  }

  .btn-large {
    padding: 16px 32px;
    font-size: 16px;
    min-width: 160px;
  }

  @media (max-width: 768px) {
    .error-container {
      padding: 10px;
    }

    .error-heading {
      font-size: 1.5rem;
    }

    .suggestions {
      padding: 20px;
    }

    .action-buttons {
      flex-direction: column;
      align-items: center;
    }

    .btn-large {
      width: 100%;
      max-width: 300px;
    }
  }
  </style>
</head>
<body>
  <div class="container">
    <div class="error-container">
      <div class="header">
        <span class="error-icon">${icon}</span>
        <h1 class="error-heading">${heading}</h1>
        <p class="error-message">${message}</p>
      </div>

      <div class="suggestions">
        <h3>💡 可能的原因</h3>
        <ul>
          ${suggestions.map(suggestion => `<li>${suggestion}</li>`).join('')}
        </ul>
      </div>

      <div class="action-buttons">
        <a href="/" class="btn btn-large">🏠 返回首页</a>
        <a href="/" class="btn btn-success btn-large">➕ 创建粘贴板</a>
        ${errorType === 'password_required' ?
          `<button onclick="history.back()" class="btn btn-info btn-large">🔙 重新输入密码</button>` :
          `<button onclick="history.back()" class="btn btn-secondary btn-large">🔙 返回上页</button>`
        }
      </div>

      <div class="footer" style="margin-top: 50px;">
        <p>基于 Cloudflare Pages 构建 • <a href="/api" style="color: rgba(255,255,255,0.8);">API 文档</a> • <a href="/admin" style="color: rgba(255,255,255,0.8);">🔐 后台管理</a> • <a href="https://github.com/XCQ0607/xbin" target="_blank" style="color: rgba(255,255,255,0.8);">📦 GitHub</a></p>
      </div>
    </div>
  </div>

  ${JAVASCRIPT}
</body>
</html>`;
}

export function getApiDocPage() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>API 文档 - XBin</title>
  ${CSS_STYLES}
  <style>
  .endpoint {
    background: #f8f9fa;
    border-left: 4px solid #667eea;
    padding: 15px;
    margin: 20px 0;
    border-radius: 0 8px 8px 0;
  }

  .method {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: bold;
    font-size: 12px;
    margin-right: 10px;
  }

  .method.post { background: #28a745; color: white; }
  .method.get { background: #007bff; color: white; }
  .method.put { background: #ffc107; color: black; }
  .method.delete { background: #dc3545; color: white; }

  .code-block {
    background: #2d3748;
    color: #e2e8f0;
    padding: 15px;
    border-radius: 8px;
    overflow-x: auto;
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
    font-size: 14px;
    margin: 10px 0;
  }

  .param {
    background: #e3f2fd;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: monospace;
    font-size: 14px;
  }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📚 API 文档</h1>
      <p>XBin REST API 参考</p>
    </div>

    <div class="card">
      <h2>基础 URL</h2>
      <div class="code-block">https://xbin.pages.dev/api</div>

      <h2>身份验证</h2>
      <p>无需 API 密钥。受密码保护的粘贴板需要提供密码参数。</p>

      <h2>接口列表</h2>

      <div class="endpoint">
        <h3><span class="method post">POST</span>/paste</h3>
        <p>创建新的粘贴板</p>

        <h4>请求体</h4>
        <div class="code-block">{
  "content": "string (必需) - 粘贴板内容",
  "customId": "string (可选) - 自定义ID",
  "password": "string (可选) - 密码保护",
  "expiresIn": "number (可选) - 过期时间(秒)"
}</div>

        <h4>响应</h4>
        <div class="code-block">{
  "id": "粘贴板ID",
  "url": "https://xbin.pages.dev/粘贴板ID",
  "success": true
}</div>

        <h4>示例</h4>
        <div class="code-block">curl -X POST https://xbin.pages.dev/api/paste \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "你好，世界！",
    "customId": "my-paste",
    "password": "secret123",
    "expiresIn": 3600
  }'</div>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span>/paste/{id}</h3>
        <p>获取粘贴板内容</p>

        <h4>参数</h4>
        <ul>
          <li><span class="param">password</span> (查询参数, 可选) - 受密码保护的粘贴板需要提供</li>
        </ul>

        <h4>响应</h4>
        <div class="code-block">{
  "content": "粘贴板内容",
  "createdAt": 1234567890,
  "expiresAt": 1234567890,
  "views": 5,
  "hasPassword": false
}</div>

        <h4>示例</h4>
        <div class="code-block">curl https://xbin.pages.dev/api/paste/my-paste?password=secret123</div>
      </div>

      <div class="endpoint">
        <h3><span class="method put">PUT</span>/paste/{id}</h3>
        <p>更新粘贴板内容</p>

        <h4>请求体</h4>
        <div class="code-block">{
  "content": "string (必需) - 新的内容",
  "password": "string (可选, 受密码保护的粘贴板需要提供)"
}</div>

        <h4>响应</h4>
        <div class="code-block">{
  "success": true
}</div>

        <h4>示例</h4>
        <div class="code-block">curl -X PUT https://xbin.pages.dev/api/paste/my-paste \\
  -H "Content-Type: application/json" \\
  -d '{
    "content": "更新后的内容",
    "password": "secret123"
  }'</div>
      </div>

      <div class="endpoint">
        <h3><span class="method delete">DELETE</span>/paste/{id}</h3>
        <p>删除粘贴板</p>

        <h4>参数</h4>
        <ul>
          <li><span class="param">password</span> (查询参数, 可选) - 受密码保护的粘贴板需要提供</li>
        </ul>

        <h4>响应</h4>
        <div class="code-block">{
  "success": true
}</div>

        <h4>示例</h4>
        <div class="code-block">curl -X DELETE https://xbin.pages.dev/api/paste/my-paste?password=secret123</div>
      </div>

      <div class="endpoint">
        <h3><span class="method get">GET</span>/stats</h3>
        <p>获取系统统计信息</p>

        <h4>响应</h4>
        <div class="code-block">{
  "totalPastes": 1234,
  "totalViews": 5678,
  "todayPastes": 42,
  "success": true
}</div>

        <h4>响应字段说明</h4>
        <ul>
          <li><span class="param">totalPastes</span> - 总粘贴板数量</li>
          <li><span class="param">totalViews</span> - 总查看次数</li>
          <li><span class="param">todayPastes</span> - 今日新增粘贴板数量</li>
        </ul>

        <h4>示例</h4>
        <div class="code-block">curl https://xbin.pages.dev/api/stats</div>
      </div>

      <h2>错误响应</h2>
      <div class="code-block">{
  "error": "错误信息"
}</div>

      <h2>状态码</h2>
      <ul>
        <li><strong>200</strong> - 成功</li>
        <li><strong>400</strong> - 请求错误</li>
        <li><strong>401</strong> - 未授权 (密码错误)</li>
        <li><strong>404</strong> - 粘贴板不存在</li>
        <li><strong>409</strong> - 冲突 (自定义ID已存在)</li>
        <li><strong>410</strong> - 已过期</li>
        <li><strong>500</strong> - 服务器内部错误</li>
      </ul>

      <div style="margin-top: 30px;">
        <a href="/" class="btn">← 返回首页</a>
      </div>
    </div>

    <div class="footer">
      <p>Powered by Cloudflare Workers</p>
    </div>
  </div>
</body>
</html>`;
}
