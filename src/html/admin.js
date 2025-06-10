// 后台管理界面模板

const ADMIN_CSS = `
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
  line-height: 1.6;
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

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20px;
  position: relative;
}

.login-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.15),
    0 0 0 1px rgba(255,255,255,0.2);
  padding: 50px;
  width: 100%;
  max-width: 450px;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
}

.login-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
}

.login-header {
  margin-bottom: 40px;
}

.login-header h1 {
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 12px;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-header p {
  color: #666;
  font-size: 1.1rem;
  font-weight: 300;
}

.form-group {
  margin-bottom: 25px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  color: #444;
  font-weight: 600;
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

.btn {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 14px 28px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
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
}

.btn:active {
  transform: translateY(-1px);
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none;
}

.alert {
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 14px;
}

.alert-error {
  background: #fee;
  color: #c33;
  border: 1px solid #fcc;
}

.alert-success {
  background: #efe;
  color: #363;
  border: 1px solid #cfc;
}

/* 管理界面样式 */
.admin-container {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  background-attachment: fixed;
  min-height: 100vh;
  position: relative;
}

.admin-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

.admin-header {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.admin-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  max-width: 1400px;
  margin: 0 auto;
}

.admin-logo {
  font-size: 1.8rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.admin-user {
  display: flex;
  align-items: center;
  gap: 20px;
  font-weight: 500;
  color: #555;
}

.admin-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 30px 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 30px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255,255,255,0.2);
  text-align: center;
  border: 1px solid rgba(255,255,255,0.2);
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-number {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 10px;
}

.stat-label {
  color: #555;
  font-size: 1.1rem;
  font-weight: 500;
}

.data-table-container {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.1),
    0 0 0 1px rgba(255,255,255,0.2);
  overflow: hidden;
  border: 1px solid rgba(255,255,255,0.2);
}

.table-header {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
}

.table-actions {
  display: flex;
  gap: 10px;
}

.btn-sm {
  padding: 8px 16px;
  font-size: 14px;
  width: auto;
  min-width: auto;
}

.btn-danger {
  background: #dc3545;
}

.btn-danger:hover {
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.4);
}

.btn-success {
  background: #28a745;
}

.btn-success:hover {
  box-shadow: 0 5px 15px rgba(40, 167, 69, 0.4);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.data-table tr:hover {
  background: #f8f9fa;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.btn-xs {
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px;
}

.text-truncate {
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.badge-success {
  background: #d4edda;
  color: #155724;
}

.badge-warning {
  background: #fff3cd;
  color: #856404;
}

.badge-danger {
  background: #f8d7da;
  color: #721c24;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 20px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:hover {
  background: #f8f9fa;
}

.pagination button.active {
  background: #667eea;
  color: white;
  border-color: #667eea;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 自定义模态框样式 */
.custom-modal {
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
  z-index: 2000;
  animation: fadeIn 0.3s ease;
}

.custom-modal-content {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255,255,255,0.2);
  max-width: 500px;
  width: 90%;
  text-align: center;
  animation: slideUp 0.3s ease;
}

.custom-modal h3 {
  margin-bottom: 20px;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
}

.custom-modal p {
  margin-bottom: 30px;
  color: #666;
  font-size: 1rem;
  line-height: 1.6;
}

.custom-modal-buttons {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.custom-modal .btn {
  width: auto;
  min-width: 100px;
  padding: 12px 24px;
}

.toast {
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
}

.toast.success {
  border-left: 4px solid #28a745;
}

.toast.error {
  border-left: 4px solid #dc3545;
}

.toast.warning {
  border-left: 4px solid #ffc107;
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

/* 默认隐藏移动端布局 */
.mobile-card-view {
  display: none;
}

@media (max-width: 768px) {
  .admin-header {
    padding: 0 15px;
  }

  .admin-nav {
    height: auto;
    min-height: 60px;
    padding: 15px 0;
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
  }

  .admin-logo {
    font-size: 1.5rem;
    text-align: center;
  }

  .admin-user {
    justify-content: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .admin-content {
    padding: 15px 10px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 15px;
    margin-bottom: 25px;
  }

  .stat-card {
    padding: 20px;
  }

  .stat-number {
    font-size: 2.5rem;
  }

  .table-header {
    flex-direction: column;
    gap: 15px;
    align-items: stretch;
    padding: 15px;
  }

  .table-title {
    text-align: center;
    font-size: 1.1rem;
  }

  .table-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .data-table-container {
    border-radius: 12px;
    overflow-x: auto;
  }

  .data-table {
    font-size: 12px;
    min-width: 600px;
  }

  .data-table th,
  .data-table td {
    padding: 8px 6px;
    white-space: nowrap;
  }

  .text-truncate {
    max-width: 80px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 4px;
  }

  .btn-xs {
    padding: 6px 8px;
    font-size: 11px;
    width: 100%;
    min-width: 60px;
  }

  .pagination {
    flex-wrap: wrap;
    gap: 5px;
    padding: 15px 10px;
  }

  .pagination button {
    padding: 6px 10px;
    font-size: 12px;
  }

  .custom-modal-content {
    padding: 25px 20px;
    margin: 20px;
    width: calc(100% - 40px);
  }

  .custom-modal h3 {
    font-size: 1.3rem;
  }

  .custom-modal-buttons {
    flex-direction: column;
    gap: 10px;
  }

  .custom-modal .btn {
    width: 100%;
  }

  .toast {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: none;
    font-size: 14px;
  }

  /* 表格卡片式布局 */
  .mobile-card-view {
    display: none;
  }
}

@media (max-width: 480px) {
  .admin-content {
    padding: 10px 5px;
  }

  .stats-grid {
    gap: 10px;
  }

  .stat-card {
    padding: 15px;
  }

  .stat-number {
    font-size: 2rem;
  }

  .stat-label {
    font-size: 1rem;
  }

  .data-table {
    min-width: 500px;
  }

  .text-truncate {
    max-width: 60px;
  }

  /* 隐藏表格，显示卡片式布局 */
  .data-table {
    display: none !important;
  }

  .mobile-card-view {
    display: block !important;
    padding: 15px;
  }

  .mobile-paste-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 15px;
    border-left: 4px solid #667eea;
  }

  .mobile-paste-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .mobile-paste-id {
    font-family: monospace;
    font-weight: bold;
    color: #333;
    font-size: 14px;
  }

  .mobile-paste-content {
    color: #666;
    font-size: 13px;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .mobile-paste-meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
    font-size: 12px;
    color: #888;
    margin-bottom: 10px;
  }

  .mobile-paste-actions {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .mobile-paste-actions .btn-xs {
    flex: 1;
    min-width: 70px;
  }
}
</style>
`;

export function getAdminLoginPage(errorMessage = '') {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>后台管理登录 - XBin</title>
  ${ADMIN_CSS}
  <style>
    .home-button {
      position: absolute;
      top: 15px;
      right: 15px;
      background: transparent;
      color: #667eea;
      border: none;
      padding: 5px 10px;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
      display: flex;
      align-items: center;
      transition: all 0.2s ease;
      text-decoration: none;
    }
    .home-button:hover {
      background: rgba(102, 126, 234, 0.1);
    }
  </style>
</head>
<body>
  <div class="login-container">
    <div class="login-card">
      <a href="/" class="home-button">🏠 返回首页</a>
      
      <div class="login-header">
        <h1>🔐 后台管理</h1>
        <p>XBin 粘贴板管理系统</p>
      </div>

      ${errorMessage ? `<div class="alert alert-error">${errorMessage}</div>` : ''}

      <form id="loginForm">
        <div class="form-group">
          <label for="username">用户名</label>
          <input type="text" id="username" name="username" class="form-control" required autofocus>
        </div>

        <div class="form-group">
          <label for="password">密码</label>
          <input type="password" id="password" name="password" class="form-control" required>
        </div>

        <button type="submit" class="btn" id="loginBtn">登录</button>
      </form>
    </div>
  </div>

  <script>
  document.getElementById('loginForm').addEventListener('submit', async function(e) {
    e.preventDefault();

    const loginBtn = document.getElementById('loginBtn');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    loginBtn.disabled = true;
    loginBtn.textContent = '登录中...';

    try {
      const response = await fetch('/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = '/admin/dashboard';
      } else {
        window.location.href = '/admin?error=' + encodeURIComponent(result.error || '登录失败');
      }
    } catch (error) {
      window.location.href = '/admin?error=' + encodeURIComponent('网络错误');
    } finally {
      loginBtn.disabled = false;
      loginBtn.textContent = '登录';
    }
  });
  </script>
</body>
</html>`;
}

export function getAdminDashboardPage(stats, pastes, currentPage = 1, totalPages = 1) {
  const pastesHtml = pastes.map(paste => `
    <tr>
      <td><input type="checkbox" class="paste-checkbox" value="${paste.id}" onchange="updateSelectedCount()"></td>
      <td><code>${paste.id}</code></td>
      <td class="text-truncate" title="${paste.content.replace(/"/g, '&quot;')}">${paste.content}</td>
      <td>${new Date(paste.createdAt).toLocaleString('zh-CN', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Shanghai'
      })}</td>
      <td>${paste.updatedAt ? new Date(paste.updatedAt).toLocaleString('zh-CN', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Shanghai'
      }) : '无'}</td>
      <td>${paste.expiresAt ? new Date(paste.expiresAt).toLocaleString('zh-CN', {
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false,
        timeZone: 'Asia/Shanghai'
      }) : '永不过期'}</td>
      <td>${paste.views}</td>
      <td>
        ${paste.hasPassword ? '<span class="badge badge-warning">有密码</span>' : '<span class="badge badge-success">无密码</span>'}
      </td>
      <td>
        <div class="action-buttons">
          <button class="btn btn-xs btn-success" onclick="editPaste('${paste.id}')">编辑</button>
          <button class="btn btn-xs btn-danger" onclick="deletePaste('${paste.id}')">删除</button>
        </div>
      </td>
    </tr>
  `).join('');

  const paginationHtml = Array.from({length: totalPages}, (_, i) => i + 1).map(page => `
    <button class="pagination-btn ${page === currentPage ? 'active' : ''}" onclick="loadPage(${page})">${page}</button>
  `).join('');

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>后台管理 - XBin</title>
  ${ADMIN_CSS}
</head>
<body>
  <div class="admin-container">
    <header class="admin-header">
      <nav class="admin-nav">
        <div class="admin-logo">📋 XBin 管理后台</div>
        <div class="admin-user">
          <a href="/" class="btn btn-sm" style="background: #28a745; margin-right: 10px;">
            🏠 返回首页
          </a>
          <a href="https://github.com/XCQ0607/xbin" target="_blank" class="btn btn-sm" style="background: #24292e; margin-right: 10px;">
            <svg style="width: 14px; height: 14px; fill: currentColor; margin-right: 5px;" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            GitHub
          </a>
          <span>管理员</span>
          <button class="btn btn-sm" onclick="logout()">退出登录</button>
        </div>
      </nav>
    </header>

    <main class="admin-content">
      <!-- 统计卡片 -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-number">${stats.totalPastes}</div>
          <div class="stat-label">总粘贴板数</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.totalViews}</div>
          <div class="stat-label">总查看次数</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.todayPastes}</div>
          <div class="stat-label">今日新增</div>
        </div>
        <div class="stat-card">
          <div class="stat-number">${stats.activePastes || 0}</div>
          <div class="stat-label">活跃粘贴板</div>
        </div>
      </div>

      <!-- 数据表格 -->
      <div class="data-table-container">
        <div class="table-header">
          <h2 class="table-title">粘贴板管理</h2>
          <div class="table-actions">
            <button class="btn btn-sm" onclick="showCreateModal()">➕ 创建粘贴板</button>
            <button class="btn btn-sm btn-danger" onclick="deleteSelected()" id="deleteSelectedBtn" style="display: none;">🗑️ 删除选中 (<span id="selectedCount">0</span>)</button>
            <button class="btn btn-sm btn-success" onclick="refreshData()">🔄 刷新</button>
            <button class="btn btn-sm btn-danger" onclick="deleteAllPastes()">🗑️ 清空所有</button>
          </div>
        </div>

        <table class="data-table">
          <thead>
            <tr>
              <th><input type="checkbox" id="selectAll" onchange="toggleSelectAll()"></th>
              <th>ID</th>
              <th>内容预览</th>
              <th>创建时间</th>
              <th>修改时间</th>
              <th>过期时间</th>
              <th>查看次数</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${pastesHtml}
          </tbody>
        </table>

        <!-- 移动端卡片式布局 -->
        <div class="mobile-card-view">
          ${pastes.map(paste => `
            <div class="mobile-paste-card">
              <div class="mobile-paste-header">
                <div class="mobile-paste-id">${paste.id}</div>
                <input type="checkbox" class="paste-checkbox" value="${paste.id}" onchange="updateSelectedCount()">
              </div>
              <div class="mobile-paste-content">${paste.content}</div>
              <div class="mobile-paste-meta">
                <div><strong>创建:</strong> ${new Date(paste.createdAt).toLocaleDateString('zh-CN', {timeZone: 'Asia/Shanghai'})}</div>
                <div><strong>查看:</strong> ${paste.views}次</div>
                <div><strong>修改:</strong> ${paste.updatedAt ? new Date(paste.updatedAt).toLocaleDateString('zh-CN', {timeZone: 'Asia/Shanghai'}) : '无'}</div>
                <div><strong>过期:</strong> ${paste.expiresAt ? new Date(paste.expiresAt).toLocaleDateString('zh-CN', {timeZone: 'Asia/Shanghai'}) : '永不'}</div>
                <div><strong>状态:</strong> ${paste.hasPassword ? '🔒有密码' : '🔓无密码'}</div>
              </div>
              <div class="mobile-paste-actions">
                <button class="btn btn-xs btn-success" onclick="editPaste('${paste.id}')">编辑</button>
                <button class="btn btn-xs btn-danger" onclick="deletePaste('${paste.id}')">删除</button>
              </div>
            </div>
          `).join('')}
        </div>

        ${totalPages > 1 ? `
        <div class="pagination">
          <button onclick="loadPage(${currentPage - 1})" ${currentPage <= 1 ? 'disabled' : ''}>上一页</button>
          ${paginationHtml}
          <button onclick="loadPage(${currentPage + 1})" ${currentPage >= totalPages ? 'disabled' : ''}>下一页</button>
        </div>
        ` : ''}
      </div>
    </main>
  </div>

  <!-- 创建粘贴板模态框 -->
  <div id="createModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 1000; overflow-y: auto;">
    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); padding: 40px; border-radius: 20px; width: 90%; max-width: 800px; max-height: 90vh; box-shadow: 0 20px 40px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.2); overflow-y: auto;">
      <h3 style="margin-bottom: 30px; color: #333; font-size: 1.5rem; font-weight: 600;">➕ 创建粘贴板</h3>

      <div class="form-group" style="margin-bottom: 25px;">
        <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">自定义ID（可选）</label>
        <input type="text" id="createCustomId" class="form-control" placeholder="留空则自动生成">
      </div>

      <div class="form-group" style="margin-bottom: 25px;">
        <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">内容 *</label>
        <textarea id="createContent" class="form-control" placeholder="请输入粘贴板内容..." style="font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; line-height: 1.6; resize: vertical; height: 250px; min-height: 200px; max-height: 400px;"></textarea>
      </div>

      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 25px;">
        <div class="form-group">
          <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">密码保护（可选）</label>
          <div style="position: relative;">
            <input type="password" id="createPassword" class="form-control" placeholder="留空则无密码保护">
            <button type="button" onclick="togglePasswordVisibility('createPassword', 'createPasswordToggle')" id="createPasswordToggle" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 18px;">👁️</button>
          </div>
        </div>

        <div class="form-group">
          <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">过期时间</label>
          <select id="createExpires" class="form-control">
            <option value="">永不过期</option>
            <option value="3600">1小时后</option>
            <option value="86400">1天后</option>
            <option value="604800">1周后</option>
            <option value="2592000">1个月后</option>
            <option value="custom">自定义时间</option>
          </select>
        </div>
      </div>

      <div class="form-group" id="customExpiresGroup" style="display: none; margin-bottom: 25px;">
        <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">自定义过期时间</label>
        <input type="datetime-local" id="createCustomExpires" class="form-control">
      </div>

      <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 30px;">
        <button class="btn btn-sm" onclick="closeCreateModal()" style="background: #6c757d; width: auto; min-width: 80px;">取消</button>
        <button class="btn btn-sm" onclick="createPaste()" style="width: auto; min-width: 100px;">创建</button>
      </div>
    </div>
  </div>

  <!-- 编辑模态框 -->
  <div id="editModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); backdrop-filter: blur(8px); z-index: 1000; overflow-y: auto;">
    <div style="position: relative; margin: 40px auto; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); padding: 40px; border-radius: 20px; width: 90%; max-width: 800px; box-shadow: 0 20px 40px rgba(0,0,0,0.2); border: 1px solid rgba(255,255,255,0.2);">
      <h3 style="margin-bottom: 30px; color: #333; font-size: 1.5rem; font-weight: 600;">编辑粘贴板</h3>

      <div class="form-group" style="margin-bottom: 20px;">
        <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">ID</label>
        <input type="text" id="editId" class="form-control" readonly style="background: #f8f9fa; color: #666;">
      </div>
      
      <div class="form-group" style="margin-bottom: 20px;">
        <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">密码保护</label>
        <div style="position: relative;">
          <input type="password" id="editPassword" class="form-control" placeholder="密码保护">
          <button type="button" onclick="togglePasswordVisibility('editPassword', 'editPasswordToggle')" id="editPasswordToggle" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 18px;">👁️</button>
        </div>
        <small style="color: #666; font-size: 0.85rem; margin-top: 5px; display: block;">留空则不更改现有密码，填入新密码则更新</small>
      </div>

      <div class="form-group" style="margin-bottom: 20px;">
        <label style="color: #444; font-weight: 600; margin-bottom: 10px; display: block;">内容</label>
        <textarea id="editContent" class="form-control" style="font-family: 'JetBrains Mono', 'Fira Code', 'Monaco', 'Menlo', 'Ubuntu Mono', monospace; font-size: 14px; line-height: 1.6; resize: vertical; min-height: 300px; max-height: 50vh; width: 100%;"></textarea>
      </div>

      <div style="display: flex; gap: 15px; justify-content: flex-end; margin-top: 30px;">
        <button class="btn btn-sm" onclick="closeEditModal()" style="background: #6c757d; width: auto; min-width: 80px;">取消</button>
        <button class="btn btn-sm btn-success" onclick="saveEdit()" style="width: auto; min-width: 80px;">保存</button>
      </div>
    </div>
  </div>

  <script>
  let currentEditId = null;

  // 自定义Toast通知
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = \`toast \${type}\`;
    toast.innerHTML = \`
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 18px;">
          \${type === 'success' ? '✅' : type === 'error' ? '❌' : '⚠️'}
        </span>
        <span>\${message}</span>
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

  // 自定义确认对话框
  function showConfirm(title, message, onConfirm, onCancel = null) {
    const modalId = 'modal_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    const modal = document.createElement('div');
    modal.className = 'custom-modal';
    modal.id = modalId;
    modal.innerHTML = \`
      <div class="custom-modal-content">
        <h3>\${title}</h3>
        <p>\${message}</p>
        <div class="custom-modal-buttons">
          <button class="btn" style="background: #6c757d;" onclick="closeConfirmModal('\${modalId}', false)">取消</button>
          <button class="btn btn-danger" onclick="closeConfirmModal('\${modalId}', true)">确认</button>
        </div>
      </div>
    \`;

    document.body.appendChild(modal);

    // 存储回调函数
    window.confirmCallbacks = window.confirmCallbacks || {};
    window.confirmCallbacks[modalId] = { onConfirm, onCancel };

    // 点击背景关闭
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeConfirmModal(modalId, false);
      }
    });
  }

  // 关闭确认模态框
  window.closeConfirmModal = function(modalId, confirmed) {
    const modal = document.getElementById(modalId);
    if (modal) {
      document.body.removeChild(modal);
    }

    const callbacks = window.confirmCallbacks && window.confirmCallbacks[modalId];
    if (callbacks) {
      if (confirmed && callbacks.onConfirm) {
        callbacks.onConfirm();
      } else if (!confirmed && callbacks.onCancel) {
        callbacks.onCancel();
      }
      delete window.confirmCallbacks[modalId];
    }
  };

  async function refreshData() {
    window.location.reload();
  }

  async function loadPage(page) {
    window.location.href = \`/admin/dashboard?page=\${page}\`;
  }

  async function deletePaste(id) {
    showConfirm(
      '删除确认',
      '确定要删除这个粘贴板吗？此操作不可恢复。',
      async function() {
        try {
          const response = await fetch(\`/admin/api/paste/\${id}\`, {
            method: 'DELETE'
          });

          if (response.ok) {
            showToast('删除成功', 'success');
            refreshData();
          } else {
            showToast('删除失败', 'error');
          }
        } catch (error) {
          showToast('网络错误', 'error');
        }
      }
    );
  }

  async function deleteAllPastes() {
    showConfirm(
      '⚠️ 危险操作',
      '确定要删除所有粘贴板吗？此操作将清空所有数据且不可恢复！',
      function() {
        showConfirm(
          '🚨 最终确认',
          '再次确认：这将永久删除所有数据，确定继续吗？',
          async function() {
            try {
              console.log('Sending DELETE request to /admin/api/paste/all');

              const response = await fetch('/admin/api/paste/all', {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              });

              console.log('Response status:', response.status);
              console.log('Response headers:', [...response.headers.entries()]);

              let result;
              try {
                result = await response.json();
                console.log('Response body:', result);
              } catch (parseError) {
                console.error('Failed to parse response as JSON:', parseError);
                const text = await response.text();
                console.log('Response text:', text);
                showToast('服务器响应格式错误', 'error');
                return;
              }

              if (response.ok) {
                showToast(result.message || '所有数据已清空', 'success');
                console.log('Delete all result:', result);

                // 延迟刷新，让用户看到反馈
                setTimeout(() => {
                  refreshData();
                }, 1500);
              } else {
                showToast(result.error || '清空失败 (状态码: ' + response.status + ')', 'error');
                console.error('Delete all failed:', result);
              }
            } catch (error) {
              showToast('网络错误: ' + error.message, 'error');
              console.error('Delete all network error:', error);
            }
          }
        );
      }
    );
  }

  async function editPaste(id) {
    currentEditId = id;
    document.getElementById('editId').value = id;
    document.getElementById('editContent').value = '加载中...';
    document.getElementById('editPassword').value = '';
    document.getElementById('editModal').style.display = 'block';

    try {
      console.log('Fetching paste content:', '/admin/api/paste/' + id + '/content');
      showToast('正在加载内容...', 'info');
      
      const response = await fetch('/admin/api/paste/' + id + '/content');
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Response data:', data);
        document.getElementById('editContent').value = data.content || '';
        
        // 更新密码输入框的提示文本
        const passwordInput = document.getElementById('editPassword');
        const passwordHelp = document.querySelector('#editPassword + small');
        
        if (data.hasPassword) {
          // 有密码保护时
          passwordInput.placeholder = "此粘贴板已有密码保护";
          if (passwordHelp) {
            passwordHelp.innerHTML = '留空则不更改现有密码，填入新密码则更新';
          }
        } else {
          // 无密码保护时
          passwordInput.placeholder = "此粘贴板无密码保护";
          if (passwordHelp) {
            passwordHelp.innerHTML = '留空则不更改现有密码，填入新密码则更新';
          }
        }
      } else {
        console.error('Failed to get content:', response.status);
        // 尝试获取错误详情
        let errorText = '获取内容失败 (状态码: ' + response.status + ')';
        try {
          const errorData = await response.json();
          console.error('Error data:', errorData);
          if (errorData.error) {
            errorText += ' - ' + errorData.error;
          }
        } catch (e) {
          console.error('Could not parse error response', e);
        }
        
        showToast(errorText, 'error');
        closeEditModal();
      }
    } catch (error) {
      console.error('Network error:', error);
      showToast('网络错误: ' + error.message, 'error');
      closeEditModal();
    }
  }

  function closeEditModal() {
    document.getElementById('editModal').style.display = 'none';
    currentEditId = null;
  }

  async function saveEdit() {
    if (!currentEditId) return;

    const content = document.getElementById('editContent').value;
    const password = document.getElementById('editPassword').value;

    showToast('正在保存更改...', 'info');
    console.log('Saving edit for ID:', currentEditId);

    try {
      // Create data object with content and optional password
      const data = { content };
      if (password) {
        data.password = password;
        console.log('Password provided, will be updated');
      }

      console.log('Sending PUT request to:', '/admin/api/paste/' + currentEditId);
      
      const response = await fetch('/admin/api/paste/' + currentEditId, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      console.log('Save response status:', response.status);
      
      if (response.ok) {
        let resultText = '保存成功';
        try {
          const result = await response.json();
          console.log('Save result:', result);
          if (result.message) {
            resultText += ' - ' + result.message;
          }
        } catch (e) {
          console.log('No JSON response for save operation');
        }
        
        showToast(resultText, 'success');
        closeEditModal();
        refreshData();
      } else {
        let errorText = '保存失败 (状态码: ' + response.status + ')';
        try {
          const errorData = await response.json();
          console.error('Save error data:', errorData);
          if (errorData.error) {
            errorText += ' - ' + errorData.error;
          }
        } catch (e) {
          console.error('Could not parse error response for save', e);
        }
        
        showToast(errorText, 'error');
      }
    } catch (error) {
      console.error('Save network error:', error);
      showToast('网络错误: ' + error.message, 'error');
    }
  }

  // 批量选择功能
  function toggleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const pasteCheckboxes = document.querySelectorAll('.paste-checkbox');

    pasteCheckboxes.forEach(checkbox => {
      checkbox.checked = selectAllCheckbox.checked;
    });

    updateSelectedCount();
  }

  function updateSelectedCount() {
    const selectedCheckboxes = document.querySelectorAll('.paste-checkbox:checked');
    const count = selectedCheckboxes.length;
    const deleteBtn = document.getElementById('deleteSelectedBtn');
    const countSpan = document.getElementById('selectedCount');

    countSpan.textContent = count;

    if (count > 0) {
      deleteBtn.style.display = 'inline-block';
    } else {
      deleteBtn.style.display = 'none';
    }

    // 更新全选复选框状态
    const allCheckboxes = document.querySelectorAll('.paste-checkbox');
    const selectAllCheckbox = document.getElementById('selectAll');

    if (count === 0) {
      selectAllCheckbox.indeterminate = false;
      selectAllCheckbox.checked = false;
    } else if (count === allCheckboxes.length) {
      selectAllCheckbox.indeterminate = false;
      selectAllCheckbox.checked = true;
    } else {
      selectAllCheckbox.indeterminate = true;
    }
  }

  async function deleteSelected() {
    const selectedCheckboxes = document.querySelectorAll('.paste-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.value);

    if (selectedIds.length === 0) {
      showToast('请先选择要删除的粘贴板', 'warning');
      return;
    }

    showConfirm(
      '批量删除确认',
      '确定要删除选中的 ' + selectedIds.length + ' 个粘贴板吗？此操作不可恢复。',
      async function() {
        let successCount = 0;
        let failCount = 0;

        // 显示进度
        showToast('正在删除 ' + selectedIds.length + ' 个粘贴板...', 'info');

        // 逐个删除
        for (const id of selectedIds) {
          try {
            const response = await fetch('/admin/api/paste/' + id, {
              method: 'DELETE'
            });

            if (response.ok) {
              successCount++;
            } else {
              failCount++;
            }
          } catch (error) {
            failCount++;
          }
        }

        // 显示结果
        if (failCount === 0) {
          showToast('成功删除 ' + successCount + ' 个粘贴板', 'success');
        } else {
          showToast('删除完成：成功 ' + successCount + ' 个，失败 ' + failCount + ' 个', 'warning');
        }

        // 刷新页面
        setTimeout(() => {
          refreshData();
        }, 1500);
      }
    );
  }

  // 创建粘贴板功能
  function showCreateModal() {
    // 重置表单
    document.getElementById('createCustomId').value = '';
    document.getElementById('createContent').value = '';
    document.getElementById('createPassword').value = '';
    document.getElementById('createExpires').value = '';
    document.getElementById('createCustomExpires').value = '';
    document.getElementById('customExpiresGroup').style.display = 'none';

    // 设置过期时间选择监听器
    const expiresSelect = document.getElementById('createExpires');
    const customGroup = document.getElementById('customExpiresGroup');

    expiresSelect.onchange = function() {
      if (this.value === 'custom') {
        customGroup.style.display = 'block';
        // 设置默认时间为明天
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('createCustomExpires').value = tomorrow.toISOString().slice(0, 16);
      } else {
        customGroup.style.display = 'none';
      }
    };

    document.getElementById('createModal').style.display = 'block';
  }

  function closeCreateModal() {
    document.getElementById('createModal').style.display = 'none';
  }

  function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);

    if (input.type === 'password') {
      input.type = 'text';
      button.textContent = '🙈';
    } else {
      input.type = 'password';
      button.textContent = '👁️';
    }
  }

  async function createPaste() {
    const customId = document.getElementById('createCustomId').value.trim();
    const content = document.getElementById('createContent').value.trim();
    const password = document.getElementById('createPassword').value;
    const expiresSelect = document.getElementById('createExpires').value;
    const customExpires = document.getElementById('createCustomExpires').value;

    // 验证必填字段
    if (!content) {
      showToast('请输入粘贴板内容', 'error');
      return;
    }

    // 计算过期时间
    let expiresIn = null;
    if (expiresSelect && expiresSelect !== 'custom') {
      expiresIn = parseInt(expiresSelect);
    } else if (expiresSelect === 'custom' && customExpires) {
      const expiresDate = new Date(customExpires);
      const now = new Date();
      if (expiresDate <= now) {
        showToast('过期时间必须在未来', 'error');
        return;
      }
      expiresIn = Math.floor((expiresDate.getTime() - now.getTime()) / 1000);
    }

    // 准备数据
    const data = {
      content: content,
      customId: customId || undefined,
      password: password || undefined,
      expiresIn: expiresIn
    };

    try {
      showToast('正在创建粘贴板...', 'info');

      const response = await fetch('/api/paste', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      if (response.ok) {
        showToast(\`粘贴板创建成功！ID: \${result.id}\`, 'success');
        closeCreateModal();

        // 延迟刷新，让用户看到反馈
        setTimeout(() => {
          refreshData();
        }, 1500);
      } else {
        showToast(result.error || '创建失败', 'error');
      }
    } catch (error) {
      showToast('网络错误: ' + error.message, 'error');
    }
  }

  async function logout() {
    try {
      await fetch('/admin/logout', { method: 'POST' });
    } catch (error) {
      // 忽略错误
    }
    window.location.href = '/admin';
  }
  </script>
</body>
</html>`;
}
