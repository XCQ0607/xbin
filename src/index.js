import { generateId, hashPassword, verifyPassword, isExpired } from './utils.js';
import { getHomePage, getPastePage, getApiDocPage } from './html/templates.js';
import { getAdminLoginPage, getAdminDashboardPage } from './html/admin.js';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;
    const method = request.method;

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    // Handle CORS preflight
    if (method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // Admin routes
      if (path.startsWith('/admin')) {
        return await handleAdmin(request, env, corsHeaders);
      }

      // API routes
      if (path.startsWith('/api/')) {
        return await handleAPI(request, env, corsHeaders);
      }

      // Static assets
      if (path.startsWith('/static/')) {
        return await handleStatic(path);
      }

      // Main routes
      if (path === '/' || path === '') {
        return new Response(getHomePage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
        });
      }

      // API documentation
      if (path === '/api' || path === '/api/') {
        return new Response(getApiDocPage(), {
          headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
        });
      }

      // Paste routes
      const pasteId = path.slice(1); // Remove leading slash
      if (pasteId) {
        return await handlePaste(pasteId, request, env, corsHeaders);
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });
    } catch (error) {
      console.error('Error:', error);
      return new Response('Internal Server Error', {
        status: 500,
        headers: corsHeaders
      });
    }
  }
};

async function handleAPI(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  if (path === '/api/paste' && method === 'POST') {
    return await createPaste(request, env, corsHeaders);
  }

  if (path.startsWith('/api/paste/') && method === 'GET') {
    const pasteId = path.split('/')[3];
    return await getPaste(pasteId, request, env, corsHeaders);
  }

  if (path.startsWith('/api/paste/') && method === 'PUT') {
    const pasteId = path.split('/')[3];
    return await updatePaste(pasteId, request, env, corsHeaders);
  }

  if (path.startsWith('/api/paste/') && method === 'DELETE') {
    const pasteId = path.split('/')[3];
    return await deletePaste(pasteId, request, env, corsHeaders);
  }

  if (path === '/api/stats' && method === 'GET') {
    return await getStats(env, corsHeaders);
  }

  return new Response('API endpoint not found', {
    status: 404,
    headers: corsHeaders
  });
}

async function createPaste(request, env, corsHeaders) {
  try {
    const data = await request.json();
    const { content, customId, password, expiresIn } = data;

    if (!content) {
      return new Response(JSON.stringify({ error: 'Content is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const pasteId = customId || generateId();

    // Check if custom ID is reserved or already exists
    if (customId) {
      // 系统保留的端点列表
      const RESERVED_ENDPOINTS = [
        'api', 'admin', 'static', 'assets', 'public', 'www', 'ftp', 'mail', 'email',
        'blog', 'news', 'forum', 'shop', 'store', 'app', 'mobile', 'web', 'site',
        'dashboard', 'panel', 'control', 'manage', 'config', 'settings', 'setup',
        'install', 'update', 'upgrade', 'backup', 'restore', 'export', 'import',
        'login', 'logout', 'register', 'signup', 'signin', 'auth', 'oauth',
        'user', 'users', 'profile', 'account', 'accounts', 'member', 'members',
        'home', 'index', 'main', 'root', 'base', 'core', 'system', 'sys',
        'test', 'demo', 'example', 'sample', 'temp', 'tmp', 'cache', 'log', 'logs',
        'error', 'errors', '404', '500', 'status', 'health', 'ping', 'info',
        'about', 'contact', 'help', 'support', 'faq', 'terms', 'privacy', 'legal'
      ];

      const lowercaseId = customId.toLowerCase();
      if (RESERVED_ENDPOINTS.includes(lowercaseId)) {
        return new Response(JSON.stringify({
          error: '自定义ID与系统端点冲突，请选择其他ID'
        }), {
          status: 400,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const existing = await env.PASTEBIN_KV.get(pasteId);
      if (existing) {
        return new Response(JSON.stringify({ error: 'Custom ID already exists' }), {
          status: 409,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    const pasteData = {
      content,
      createdAt: Date.now(),
      expiresAt: expiresIn ? Date.now() + (expiresIn * 1000) : null,
      hasPassword: !!password,
      passwordHash: password ? await hashPassword(password) : null,
      views: 0
    };

    await env.PASTEBIN_KV.put(pasteId, JSON.stringify(pasteData));

    const requestUrl = new URL(request.url);
    return new Response(JSON.stringify({
      id: pasteId,
      url: `${requestUrl.origin}/${pasteId}`,
      success: true
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create paste' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function getPaste(pasteId, request, env, corsHeaders) {
  try {
    const pasteData = await env.PASTEBIN_KV.get(pasteId);

    if (!pasteData) {
      return new Response(JSON.stringify({ error: 'Paste not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const paste = JSON.parse(pasteData);

    // Check if expired
    if (isExpired(paste)) {
      await env.PASTEBIN_KV.delete(pasteId);
      return new Response(JSON.stringify({ error: 'Paste has expired' }), {
        status: 410,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Check password
    if (paste.hasPassword) {
      const url = new URL(request.url);
      const password = url.searchParams.get('password');

      if (!password || !(await verifyPassword(password, paste.passwordHash))) {
        return new Response(JSON.stringify({ error: 'Password required or incorrect' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    // Increment view count
    paste.views++;
    await env.PASTEBIN_KV.put(pasteId, JSON.stringify(paste));

    return new Response(JSON.stringify({
      content: paste.content,
      createdAt: paste.createdAt,
      expiresAt: paste.expiresAt,
      views: paste.views,
      hasPassword: paste.hasPassword
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to get paste' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function updatePaste(pasteId, request, env, corsHeaders) {
  try {
    const data = await request.json();
    const { content, password } = data;

    const pasteData = await env.PASTEBIN_KV.get(pasteId);

    if (!pasteData) {
      return new Response(JSON.stringify({ error: 'Paste not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const paste = JSON.parse(pasteData);

    // Check if expired
    if (isExpired(paste)) {
      await env.PASTEBIN_KV.delete(pasteId);
      return new Response(JSON.stringify({ error: 'Paste has expired' }), {
        status: 410,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Check password
    if (paste.hasPassword) {
      if (!password || !(await verifyPassword(password, paste.passwordHash))) {
        return new Response(JSON.stringify({ error: 'Password required or incorrect' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    paste.content = content;
    paste.updatedAt = Date.now();

    await env.PASTEBIN_KV.put(pasteId, JSON.stringify(paste));

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update paste' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function deletePaste(pasteId, request, env, corsHeaders) {
  try {
    const url = new URL(request.url);
    const password = url.searchParams.get('password');

    const pasteData = await env.PASTEBIN_KV.get(pasteId);

    if (!pasteData) {
      return new Response(JSON.stringify({ error: 'Paste not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const paste = JSON.parse(pasteData);

    // Check password
    if (paste.hasPassword) {
      if (!password || !(await verifyPassword(password, paste.passwordHash))) {
        return new Response(JSON.stringify({ error: 'Password required or incorrect' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }
    }

    await env.PASTEBIN_KV.delete(pasteId);

    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete paste' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

async function handlePaste(pasteId, request, env, corsHeaders) {
  try {
    const pasteData = await env.PASTEBIN_KV.get(pasteId);
    const requestUrl = new URL(request.url);
    const currentDomain = requestUrl.origin;

    if (!pasteData) {
      return new Response('Paste not found', {
        status: 404,
        headers: corsHeaders
      });
    }

    const paste = JSON.parse(pasteData);

    // Check if expired
    if (isExpired(paste)) {
      await env.PASTEBIN_KV.delete(pasteId);
      return new Response('Paste has expired', {
        status: 410,
        headers: corsHeaders
      });
    }

    // If password protected, show password form
    if (paste.hasPassword) {
      const url = new URL(request.url);
      const password = url.searchParams.get('password');

      if (!password) {
        return new Response(getPastePage(pasteId, null, true, '', currentDomain), {
          headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
        });
      }

      if (!(await verifyPassword(password, paste.passwordHash))) {
        return new Response(getPastePage(pasteId, null, true, 'Incorrect password', currentDomain), {
          headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
        });
      }
    }

    // Increment view count
    paste.views++;
    await env.PASTEBIN_KV.put(pasteId, JSON.stringify(paste));

    return new Response(getPastePage(pasteId, paste, false, '', currentDomain), {
      headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
    });
  } catch (error) {
    return new Response('Internal Server Error', {
      status: 500,
      headers: corsHeaders
    });
  }
}

async function getStats(env, corsHeaders) {
  try {
    // 获取所有粘贴板的键
    const { keys } = await env.PASTEBIN_KV.list();

    let totalPastes = 0;
    let totalViews = 0;
    let todayPastes = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    // 遍历所有粘贴板统计信息
    for (const key of keys) {
      try {
        const pasteData = await env.PASTEBIN_KV.get(key.name);
        if (pasteData) {
          const paste = JSON.parse(pasteData);

          // 跳过已过期的粘贴板
          if (isExpired(paste)) {
            await env.PASTEBIN_KV.delete(key.name);
            continue;
          }

          totalPastes++;
          totalViews += paste.views || 0;

          // 检查是否是今天创建的
          if (paste.createdAt >= todayTimestamp) {
            todayPastes++;
          }
        }
      } catch (error) {
        // 忽略单个粘贴板的错误，继续统计其他的
        console.error('Error processing paste:', key.name, error);
      }
    }

    return new Response(JSON.stringify({
      totalPastes,
      totalViews,
      todayPastes,
      success: true
    }), {
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Stats error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get statistics',
      totalPastes: 0,
      totalViews: 0,
      todayPastes: 0
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// 管理员认证中间件
async function isAdminAuthenticated(request, env) {
  const sessionCookie = request.headers.get('Cookie');
  if (!sessionCookie) return false;

  const sessionMatch = sessionCookie.match(/admin_session=([^;]+)/);
  if (!sessionMatch) return false;

  const sessionId = sessionMatch[1];
  const session = await env.PASTEBIN_KV.get(`admin_session:${sessionId}`);

  return !!session;
}

// 生成管理员会话
async function createAdminSession(env) {
  const sessionId = generateId();
  const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24小时

  await env.PASTEBIN_KV.put(`admin_session:${sessionId}`, JSON.stringify({
    createdAt: Date.now(),
    expiresAt
  }), { expirationTtl: 24 * 60 * 60 });

  return sessionId;
}

// 处理管理员路由
async function handleAdmin(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  // 登录页面
  if (path === '/admin' || path === '/admin/') {
    const errorMessage = url.searchParams.get('error') || '';
    return new Response(getAdminLoginPage(errorMessage), {
      headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
    });
  }

  // 登录处理
  if (path === '/admin/login' && method === 'POST') {
    return await handleAdminLogin(request, env, corsHeaders);
  }

  // 登出处理
  if (path === '/admin/logout' && method === 'POST') {
    return await handleAdminLogout(request, env, corsHeaders);
  }

  // 需要认证的路由
  const isAuthenticated = await isAdminAuthenticated(request, env);
  if (!isAuthenticated) {
    return new Response('', {
      status: 302,
      headers: { 'Location': '/admin', ...corsHeaders }
    });
  }

  // 管理面板
  if (path === '/admin/dashboard') {
    return await handleAdminDashboard(request, env, corsHeaders);
  }

  // 管理API
  if (path.startsWith('/admin/api/')) {
    return await handleAdminAPI(request, env, corsHeaders);
  }

  return new Response('Not Found', { status: 404, headers: corsHeaders });
}

// 处理管理员登录
async function handleAdminLogin(request, env, corsHeaders) {
  try {
    const { username, password } = await request.json();

    // 从环境变量获取管理员账号密码，默认为admin/password
    const adminUser = env.ADMIN_USER || 'admin';
    const adminPassword = env.ADMIN_PASSWORD || 'password';

    if (username === adminUser && password === adminPassword) {
      const sessionId = await createAdminSession(env);

      return new Response(JSON.stringify({ success: true }), {
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': `admin_session=${sessionId}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`,
          ...corsHeaders
        }
      });
    } else {
      return new Response(JSON.stringify({ error: '用户名或密码错误' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: '登录失败' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}

// 处理管理员登出
async function handleAdminLogout(request, env, corsHeaders) {
  const sessionCookie = request.headers.get('Cookie');
  if (sessionCookie) {
    const sessionMatch = sessionCookie.match(/admin_session=([^;]+)/);
    if (sessionMatch) {
      const sessionId = sessionMatch[1];
      await env.PASTEBIN_KV.delete(`admin_session:${sessionId}`);
    }
  }

  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': 'admin_session=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/',
      ...corsHeaders
    }
  });
}

// 处理管理面板
async function handleAdminDashboard(request, env, corsHeaders) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const pageSize = 20;

    // 获取统计信息
    const stats = await getAdminStats(env);

    // 获取粘贴板列表
    const { keys } = await env.PASTEBIN_KV.list();
    const allPastes = [];

    for (const key of keys) {
      if (key.name.startsWith('admin_session:')) continue;

      try {
        const pasteData = await env.PASTEBIN_KV.get(key.name);
        if (pasteData) {
          const paste = JSON.parse(pasteData);

          // 跳过已过期的粘贴板
          if (isExpired(paste)) {
            await env.PASTEBIN_KV.delete(key.name);
            continue;
          }

          allPastes.push({
            id: key.name,
            content: paste.content.substring(0, 100) + (paste.content.length > 100 ? '...' : ''),
            createdAt: paste.createdAt,
            expiresAt: paste.expiresAt,
            views: paste.views || 0,
            hasPassword: paste.hasPassword || false
          });
        }
      } catch (error) {
        console.error('Error processing paste:', key.name, error);
      }
    }

    // 按创建时间排序
    allPastes.sort((a, b) => b.createdAt - a.createdAt);

    // 分页
    const totalPages = Math.ceil(allPastes.length / pageSize);
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const pagedPastes = allPastes.slice(startIndex, endIndex);

    return new Response(getAdminDashboardPage(stats, pagedPastes, page, totalPages), {
      headers: { 'Content-Type': 'text/html; charset=utf-8', ...corsHeaders }
    });
  } catch (error) {
    console.error('Admin dashboard error:', error);
    return new Response('Internal Server Error', {
      status: 500,
      headers: corsHeaders
    });
  }
}

// 获取管理统计信息
async function getAdminStats(env) {
  try {
    const { keys } = await env.PASTEBIN_KV.list();

    let totalPastes = 0;
    let totalViews = 0;
    let todayPastes = 0;
    let activePastes = 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    for (const key of keys) {
      if (key.name.startsWith('admin_session:')) continue;

      try {
        const pasteData = await env.PASTEBIN_KV.get(key.name);
        if (pasteData) {
          const paste = JSON.parse(pasteData);

          if (isExpired(paste)) {
            await env.PASTEBIN_KV.delete(key.name);
            continue;
          }

          totalPastes++;
          totalViews += paste.views || 0;
          activePastes++;

          if (paste.createdAt >= todayTimestamp) {
            todayPastes++;
          }
        }
      } catch (error) {
        console.error('Error processing paste for stats:', key.name, error);
      }
    }

    return {
      totalPastes,
      totalViews,
      todayPastes,
      activePastes
    };
  } catch (error) {
    console.error('Stats error:', error);
    return {
      totalPastes: 0,
      totalViews: 0,
      todayPastes: 0,
      activePastes: 0
    };
  }
}

// 处理管理API
async function handleAdminAPI(request, env, corsHeaders) {
  const url = new URL(request.url);
  const path = url.pathname;
  const method = request.method;

  console.log('handleAdminAPI called with:', { path, method });

  // 检查管理员权限
  const isAuthenticated = await isAdminAuthenticated(request, env);
  if (!isAuthenticated) {
    console.log('❌ Admin authentication failed');
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }

  console.log('✅ Admin authenticated');

  // 删除所有粘贴板 - 必须放在单个删除之前，避免路由冲突
  console.log('Checking delete all route:', { path, method, matches: path === '/admin/api/paste/all' && method === 'DELETE' });

  if (path === '/admin/api/paste/all' && method === 'DELETE') {
    console.log('✅ Delete all route matched!');
    try {
      console.log('Starting delete all operation...');

      // 获取所有键
      const { keys } = await env.PASTEBIN_KV.list();
      console.log('Total keys found:', keys.length);

      let deletedCount = 0;
      let skippedCount = 0;
      const deleteResults = [];

      // 逐个删除，而不是批量删除，以便更好地跟踪
      for (const key of keys) {
        if (key.name.startsWith('admin_session:')) {
          skippedCount++;
          console.log('Skipping admin session:', key.name);
          continue;
        }

        try {
          console.log('Deleting key:', key.name);
          await env.PASTEBIN_KV.delete(key.name);
          deletedCount++;
          deleteResults.push({ key: key.name, status: 'deleted' });
        } catch (deleteError) {
          console.error('Failed to delete key:', key.name, deleteError);
          deleteResults.push({ key: key.name, status: 'failed', error: deleteError.message });
        }
      }

      console.log('Delete operation completed. Deleted:', deletedCount, 'Skipped:', skippedCount);

      // 验证删除结果 - 重新获取键列表
      const { keys: remainingKeys } = await env.PASTEBIN_KV.list();
      const remainingPasteKeys = remainingKeys.filter(key => !key.name.startsWith('admin_session:'));

      console.log('Remaining paste keys after deletion:', remainingPasteKeys.length);

      return new Response(JSON.stringify({
        success: true,
        deletedCount: deletedCount,
        skippedCount: skippedCount,
        remainingKeys: remainingPasteKeys.length,
        message: `成功删除 ${deletedCount} 个粘贴板，跳过 ${skippedCount} 个管理员会话，剩余 ${remainingPasteKeys.length} 个键`,
        details: deleteResults
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      console.error('Delete all error:', error);
      return new Response(JSON.stringify({
        error: 'Delete all failed',
        details: error.message,
        stack: error.stack
      }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }

  // 删除单个粘贴板 - 排除 'all' 关键字
  if (path.match(/^\/admin\/api\/paste\/([^\/]+)$/) && method === 'DELETE') {
    const pasteId = path.split('/')[4];

    // 防止意外删除系统关键字
    if (pasteId === 'all') {
      console.log('❌ Blocked attempt to delete "all" as single paste');
      return new Response(JSON.stringify({ error: 'Invalid paste ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    console.log('Deleting single paste:', pasteId);
    try {
      await env.PASTEBIN_KV.delete(pasteId);
      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Delete failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }

  // 编辑粘贴板
  if (path.match(/^\/admin\/api\/paste\/([^\/]+)$/) && method === 'PUT') {
    const pasteId = path.split('/')[4];
    try {
      const { content } = await request.json();
      const pasteData = await env.PASTEBIN_KV.get(pasteId);

      if (!pasteData) {
        return new Response(JSON.stringify({ error: 'Paste not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const paste = JSON.parse(pasteData);
      paste.content = content;
      paste.updatedAt = Date.now();

      await env.PASTEBIN_KV.put(pasteId, JSON.stringify(paste));

      return new Response(JSON.stringify({ success: true }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Update failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }

  // 获取粘贴板完整内容
  if (path.match(/^\/admin\/api\/paste\/([^\/]+)\/content$/) && method === 'GET') {
    const pasteId = path.split('/')[4];
    try {
      const pasteData = await env.PASTEBIN_KV.get(pasteId);

      if (!pasteData) {
        return new Response(JSON.stringify({ error: 'Paste not found' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      const paste = JSON.parse(pasteData);

      return new Response(JSON.stringify({
        content: paste.content,
        success: true
      }), {
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    } catch (error) {
      return new Response(JSON.stringify({ error: 'Get content failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }
  }



  console.log('❌ No matching route found for:', { path, method });
  return new Response('API endpoint not found', {
    status: 404,
    headers: corsHeaders
  });
}

async function handleStatic(path) {
  // Handle static files (CSS, JS)
  if (path.endsWith('.css')) {
    return new Response('/* CSS will be inlined */', {
      headers: { 'Content-Type': 'text/css' }
    });
  }

  if (path.endsWith('.js')) {
    return new Response('// JS will be inlined', {
      headers: { 'Content-Type': 'application/javascript' }
    });
  }

  return new Response('Not Found', { status: 404 });
}
