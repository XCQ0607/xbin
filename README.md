# XBin - 现代化粘贴板服务

一个功能完整的现代化中文粘贴板服务，部署在 Cloudflare Pages 上，支持密码保护、过期时间设置、后台管理和完整的 API 接口。

[![Deploy to Cloudflare Pages](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/XCQ0607/xbin)

## 🚀 在线演示

- **演示地址**: [https://xbin.pages.dev](https://xbin.pages.dev)
- **后台管理**: [https://xbin.pages.dev/admin](https://xbin.pages.dev/admin) (用户名: admin, 密码: password)

## ✨ 特性

### 🎯 核心功能

- 🚀 **快速部署** - 基于 Cloudflare Pages，全球边缘计算
- 🔒 **密码保护** - 可选的密码保护功能，支持密码可见性切换
- ⏰ **过期时间** - 支持多种预设时间或自定义日期时间
- 🎨 **精美界面** - 响应式设计，支持移动端，完全中文化
- 🔗 **自定义URL** - 支持自定义粘贴板链接
- 📊 **访问统计** - 查看次数统计和系统统计信息
- 🛠️ **完整API** - RESTful API 支持，包含统计接口

### 🔍 便捷功能

- 🔍 **快速访问** - 输入ID直接跳转到粘贴板页面
- 📤 **分享功能** - 支持原生分享API和链接复制
- 💾 **下载功能** - 将粘贴板内容下载为文本文件
- ⌨️ **键盘快捷键** - Ctrl+Enter创建，Ctrl+K复制链接，Enter快速访问

### 🛡️ 后台管理

- 🔐 **安全登录** - 基于环境变量的管理员账号系统
- 📊 **数据统计** - 总粘贴板数、总查看次数、今日新增等
- 📝 **数据管理** - 查看、编辑、删除所有粘贴板数据
- 🗑️ **批量操作** - 一键清空所有数据功能
- 📄 **分页显示** - 支持大量数据的分页浏览

### 🔧 技术特性

- 💾 **KV存储** - 使用 Cloudflare KV 存储数据
- 🌐 **动态域名** - 自动检测访问域名，支持自定义域名
- 🔒 **会话管理** - 安全的管理员会话系统
- 🎯 **现代UI** - 统一的按钮设计和现代化界面

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd cloudflare-pastebin
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置 Cloudflare

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. 创建一个新的 KV 命名空间：
   ```bash
   npx wrangler kv:namespace create "PASTEBIN_KV"
   npx wrangler kv:namespace create "PASTEBIN_KV" --preview
   ```
3. 复制返回的命名空间 ID

### 4. 配置 wrangler.toml

编辑 `wrangler.toml` 文件：

```toml
name = "xbin"
compatibility_date = "2024-01-01"
pages_build_output_dir = "."

[[kv_namespaces]]
binding = "PASTEBIN_KV"
id = "your-kv-namespace-id"  # 替换为你的 KV 命名空间 ID
preview_id = "your-preview-kv-namespace-id"  # 替换为预览环境的 KV 命名空间 ID
```

### 5. 创建 Pages 项目

```bash
npx wrangler pages project create xbin
```

### 6. 本地开发

```bash
npm run dev
```

### 7. 部署到 Cloudflare Pages

```bash
npm run deploy
```

## 📖 使用说明

### 网页界面

1. 访问你的域名
2. 在文本框中输入内容
3. 可选择设置：
   - 自定义URL
   - 密码保护
   - 过期时间
4. 点击"Create Paste"创建

### 后台管理

1. 访问 `/admin` 进入管理后台
2. 使用管理员账号登录（默认：admin/password）
3. 在管理面板中可以：
   - 查看系统统计信息
   - 浏览所有粘贴板数据
   - 编辑粘贴板内容
   - 删除单个或所有粘贴板
   - 分页浏览大量数据

### API 使用

#### 创建粘贴板

```bash
curl -X POST https://your-domain.com/api/paste \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hello, World!",
    "customId": "my-paste",
    "password": "secret123",
    "expiresIn": 3600
  }'
```

#### 获取粘贴板内容

```bash
curl https://your-domain.com/api/paste/my-paste?password=secret123
```

#### 更新粘贴板

```bash
curl -X PUT https://your-domain.com/api/paste/my-paste \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Updated content",
    "password": "secret123"
  }'
```

#### 删除粘贴板

```bash
curl -X DELETE https://your-domain.com/api/paste/my-paste?password=secret123
```

#### 获取统计信息

```bash
curl https://your-domain.com/api/stats
```

响应示例：

```json
{
  "totalPastes": 1234,
  "totalViews": 5678,
  "todayPastes": 42,
  "success": true
}
```

## 🚀 部署指南

### 方法一：一键部署（推荐）

点击上方的 "Deploy to Cloudflare Pages" 按钮，自动 Fork 仓库并部署。

### 方法二：使用 Wrangler CLI

#### 1. 准备工作

```bash
# 克隆仓库
git clone https://github.com/XCQ0607/xbin.git
cd xbin

# 安装依赖
npm install

# 安装 Wrangler CLI（如果还没有）
npm install -g wrangler
```

#### 2. 登录 Cloudflare

```bash
# 登录 Cloudflare 账号
wrangler login
```

#### 3. 创建 KV 命名空间

```bash
# 创建生产环境 KV 命名空间
wrangler kv:namespace create "PASTEBIN_KV"

# 创建预览环境 KV 命名空间
wrangler kv:namespace create "PASTEBIN_KV" --preview
```

#### 4. 更新配置文件

将上一步输出的 KV 命名空间 ID 复制到 `wrangler.toml` 文件中：

```toml
[[kv_namespaces]]
binding = "PASTEBIN_KV"
id = "your-production-kv-id"      # 替换为生产环境 ID
preview_id = "your-preview-kv-id" # 替换为预览环境 ID
```

#### 5. 部署项目

```bash
# 部署到 Cloudflare Pages
npm run deploy
```

### 方法三：通过 Cloudflare Dashboard

#### 1. 下载项目

```bash
# 方式 A：克隆仓库
git clone https://github.com/XCQ0607/xbin.git

# 方式 B：下载 ZIP 文件
# 从 GitHub 下载项目 ZIP 文件并解压
```

#### 2. 准备文件

```bash
# 进入项目目录
cd xbin

# 安装依赖（如果需要构建）
npm install

# 构建项目（如果需要）
npm run build
```

#### 3. 登录 Cloudflare Dashboard

- 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
- 登录你的账号

#### 4. 创建 Pages 项目

1. 进入 "Pages" 部分
2. 点击 "Create a project"
3. 选择 "Upload assets"
4. 上传项目文件（可以直接拖拽整个项目文件夹）

#### 5. 配置构建设置

- **项目名称**: `xbin` (或你喜欢的名称)
- **构建命令**: `npm run build` (如果需要构建)
- **输出目录**: `.` (当前目录)
- **Node.js 版本**: 18 或更高

#### 6. 创建 KV 命名空间

1. 在 Cloudflare Dashboard 中进入 "Workers & Pages"
2. 点击 "KV" 标签
3. 点击 "Create a namespace"
4. 命名空间名称: `PASTEBIN_KV`
5. 点击 "Add"

#### 7. 绑定 KV 命名空间

1. 回到你的 Pages 项目
2. 进入 "Settings" → "Functions"
3. 滚动到 "KV namespace bindings"
4. 点击 "Add binding"
5. 填写：
   - **Variable name**: `PASTEBIN_KV`
   - **KV namespace**: 选择刚创建的 `PASTEBIN_KV`
6. 点击 "Save"

#### 8. 配置环境变量（可选）

1. 在 "Settings" → "Environment variables" 中
2. 添加以下变量：
   - `ADMIN_USER`: 管理员用户名（默认：admin）
   - `ADMIN_PASSWORD`: 管理员密码（默认：password）

#### 9. 重新部署

1. 点击 "Deployments" 标签
2. 点击 "Retry deployment" 或上传新版本

### 方法四：连接 Git 仓库（推荐用于持续部署）

#### 1. Fork 仓库

1. 访问 [项目仓库](https://github.com/XCQ0607/xbin)
2. 点击 "Fork" 按钮
3. Fork 到你的 GitHub 账号

#### 2. 连接到 Cloudflare Pages

1. 在 Cloudflare Dashboard 中进入 "Pages"
2. 点击 "Create a project"
3. 选择 "Connect to Git"
4. 选择你 Fork 的仓库
5. 配置构建设置：
   - **构建命令**: `npm run build`
   - **输出目录**: `.`

#### 3. 配置 KV 和环境变量

按照上面 "方法三" 的步骤 6-8 进行配置。

## 🔧 配置选项

### 环境变量

#### 后台管理配置

- `ADMIN_USER` - 管理员用户名（默认：admin）
- `ADMIN_PASSWORD` - 管理员密码（默认：password）

#### 其他配置

- `DOMAIN` - 你的域名（可选，自动检测）

### KV 存储

项目使用 Cloudflare KV 存储粘贴板数据，数据结构如下：

```json
{
  "content": "粘贴板内容",
  "createdAt": 1234567890,
  "expiresAt": 1234567890,
  "hasPassword": true,
  "passwordHash": "hashed-password",
  "views": 5,
  "updatedAt": 1234567890
}
```

## 🛠️ 开发

### 项目结构

```
├── src/
│   ├── index.js          # 主要的 Worker 代码和路由处理
│   ├── utils.js          # 工具函数（ID生成、密码哈希等）
│   └── html/
│       ├── templates.js  # 前台HTML模板
│       └── admin.js      # 后台管理HTML模板
├── functions/
│   └── _middleware.js    # Cloudflare Pages 中间件
├── wrangler.toml         # Cloudflare Workers 配置
├── package.json          # 项目依赖
├── _routes.json          # Pages 路由配置
└── README.md            # 项目文档
```

### 本地测试

```bash
# 启动开发服务器
npm run dev

# 部署到预览环境
wrangler deploy --env preview
```

## 📝 API 文档

完整的 API 文档可以在部署后访问 `/api` 路径查看，或查看项目中的 API 文档页面。

## 🔒 安全性

- 密码使用 SHA-256 哈希存储
- 支持 CORS 跨域请求
- 自动清理过期的粘贴板
- 输入内容自动转义防止 XSS
- 系统保留端点保护，防止ID冲突
- 管理员会话安全管理

## 🐛 故障排除

### 常见问题

#### 1. 部署后无法访问

**问题**: 部署成功但网站无法访问
**解决方案**:

- 检查 KV 命名空间是否正确绑定
- 确认环境变量配置正确
- 查看 Cloudflare Pages 的部署日志

#### 2. KV 命名空间错误

**问题**: `Error: KV namespace not found`
**解决方案**:

```bash
# 重新创建 KV 命名空间
wrangler kv:namespace create "PASTEBIN_KV"
wrangler kv:namespace create "PASTEBIN_KV" --preview

# 更新 wrangler.toml 中的 ID
```

#### 3. 管理员登录失败

**问题**: 无法登录后台管理
**解决方案**:

- 检查环境变量 `ADMIN_USER` 和 `ADMIN_PASSWORD` 是否设置
- 默认账号：用户名 `admin`，密码 `password`
- 清除浏览器缓存和 Cookie

#### 4. 一键删除不工作

**问题**: 点击"清空所有数据"没有反应
**解决方案**:

- 确保已登录管理员账号
- 检查浏览器控制台是否有错误
- 确认 KV 命名空间权限正确

### 开发调试

```bash
# 查看详细日志
wrangler pages deployment tail

# 本地调试
npm run dev

# 检查 KV 数据
wrangler kv:key list --binding PASTEBIN_KV
```

## 🚀 性能优化

### 建议配置

1. **启用 Cloudflare 缓存**

   - 静态资源自动缓存
   - API 响应适当缓存
2. **使用自定义域名**

   - 更好的 SEO 表现
   - 专业的品牌形象
3. **监控和分析**

   - 启用 Cloudflare Analytics
   - 监控 KV 存储使用量

## 📊 功能特性

### 前台功能

- ✅ 创建粘贴板（支持自定义ID、密码、过期时间）
- ✅ 查看粘贴板内容
- ✅ 密码保护验证
- ✅ 快速访问（输入ID跳转）
- ✅ 分享功能（原生分享API + 链接复制）
- ✅ 下载功能（保存为文本文件）
- ✅ 统计信息查看
- ✅ 键盘快捷键支持

### 后台管理

- ✅ 安全登录系统
- ✅ 数据统计面板
- ✅ 粘贴板列表管理
- ✅ 在线编辑内容
- ✅ 单个删除操作
- ✅ 批量选择删除
- ✅ 一键清空所有数据
- ✅ 分页浏览支持
- ✅ 创建新粘贴板

### API 接口

- ✅ RESTful API 设计
- ✅ 完整的 CRUD 操作
- ✅ 统计信息接口
- ✅ 错误处理和状态码
- ✅ CORS 跨域支持

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

### 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📞 支持

如果你遇到任何问题：

1. 查看 [故障排除](#-故障排除) 部分
2. 搜索现有的 [Issues](https://github.com/XCQ0607/xbin/issues)
3. 创建新的 Issue 并提供详细信息
4. 加入我们的讨论社区

## 🌟 Star History

如果这个项目对你有帮助，请给它一个 ⭐️！

[![Star History Chart](https://api.star-history.com/svg?repos=XCQ0607/xbin&type=Date)](https://star-history.com/#XCQ0607/xbin&Date)
