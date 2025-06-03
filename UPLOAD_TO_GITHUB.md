# 📤 上传项目到 GitHub 指南

## 🚀 快速上传步骤

### 第一步：初始化 Git 仓库

```bash
# 在项目根目录执行
git init
git add .
git commit -m "🎉 Initial commit: XBin 现代化粘贴板服务"
```

### 第二步：在 GitHub 创建仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" → "New repository"
3. 填写仓库信息：
   - **Repository name**: `xbin`
   - **Description**: `现代化粘贴板服务 - 支持密码保护、过期时间、后台管理`
   - **Visibility**: Public（推荐）或 Private
   - **不要**勾选 "Add a README file"（我们已经有了）
   - **不要**勾选 "Add .gitignore"（我们已经有了）
   - **License**: MIT（推荐）
4. 点击 "Create repository"

### 第三步：连接本地仓库到 GitHub

```bash
# 添加远程仓库
git remote add origin git@github.com:XCQ0607/xbin.git

# 推送代码到 GitHub
git branch -M main
git push -u origin main
```

## 🔧 详细配置步骤

### 1. 检查文件状态

```bash
# 查看哪些文件会被上传
git status

# 查看 .gitignore 是否正确排除了不需要的文件
cat .gitignore
```

### 2. 配置 Git 用户信息（如果还没配置）

```bash
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"
```

### 3. 验证上传成功

上传完成后，访问你的 GitHub 仓库页面，应该能看到：

- ✅ 所有源代码文件
- ✅ README.md 显示项目介绍
- ✅ 不包含 node_modules 等不需要的文件

## 🌐 部署到 Cloudflare Pages

### 方法一：连接 GitHub 仓库（推荐）

1. **登录 Cloudflare Dashboard**

   - 访问 [Cloudflare Dashboard](https://dash.cloudflare.com)
   - 进入 "Pages" 部分
2. **创建新项目**

   - 点击 "Create a project"
   - 选择 "Connect to Git"
   - 选择 GitHub
   - 授权 Cloudflare 访问你的 GitHub
3. **选择仓库**

   - 找到并选择 `xbin` 仓库
   - 点击 "Begin setup"
4. **配置构建设置**

   - **Project name**: `xbin`
   - **Production branch**: `main`
   - **Build command**: `npm run build`（可选）
   - **Build output directory**: `.`
   - **Root directory**: `/`（默认）
5. **环境变量**（可选）

   - `ADMIN_USER`: `admin`
   - `ADMIN_PASSWORD`: `password`
6. **部署**

   - 点击 "Save and Deploy"
   - 等待部署完成

### 方法二：手动上传

1. **下载项目**

   ```bash
   # 从 GitHub 下载
   git clone https://github.com/XCQ0607/xbin.git
   cd xbin
   npm install
   ```
2. **上传到 Cloudflare Pages**

   - 在 Cloudflare Dashboard 中选择 "Upload assets"
   - 拖拽项目文件夹到上传区域
   - 等待上传完成

### 配置 KV 命名空间

无论使用哪种部署方法，都需要配置 KV 存储：

1. **创建 KV 命名空间**

   - 在 Cloudflare Dashboard 中进入 "Workers & Pages"
   - 点击 "KV" 标签
   - 创建名为 `PASTEBIN_KV` 的命名空间
2. **绑定到 Pages 项目**

   - 进入你的 Pages 项目设置
   - 找到 "Functions" → "KV namespace bindings"
   - 添加绑定：
     - Variable name: `PASTEBIN_KV`
     - KV namespace: 选择刚创建的命名空间
3. **重新部署**

   - 触发重新部署以应用配置

## 🎯 自动化部署

### GitHub Actions（推荐）

项目已包含 `.github/workflows/deploy.yml` 文件，支持自动部署：

1. **设置 Secrets**
   在 GitHub 仓库设置中添加：

   - `CLOUDFLARE_API_TOKEN`: Cloudflare API 令牌
   - `CLOUDFLARE_ACCOUNT_ID`: Cloudflare 账户 ID
2. **自动触发**

   - 每次推送到 `main` 分支时自动部署
   - Pull Request 时自动构建预览

### 使用脚本部署

```bash
# Linux/Mac
chmod +x scripts/setup.sh
./scripts/setup.sh

# Windows
scripts\setup.bat
```

## 📝 更新 README

上传后记得更新 README.md 中的链接：

1. 将 `your-username` 替换为你的 GitHub 用户名
2. 更新演示地址为你的实际域名
3. 更新部署按钮链接

## 🔍 验证清单

上传完成后检查：

- [ ] GitHub 仓库创建成功
- [ ] 所有源代码文件已上传
- [ ] .gitignore 正确排除了不需要的文件
- [ ] README.md 显示正常
- [ ] Cloudflare Pages 部署成功
- [ ] KV 命名空间配置正确
- [ ] 网站可以正常访问
- [ ] 后台管理可以登录
- [ ] API 接口工作正常

## 🎉 完成！

恭喜！你的 XBin 项目现在已经：

- ✅ 上传到 GitHub
- ✅ 部署到 Cloudflare Pages
- ✅ 配置了自动部署
- ✅ 可以在线访问

现在你可以：

1. 分享你的项目链接
2. 接受其他开发者的贡献
3. 继续开发新功能
4. 享受现代化的粘贴板服务！

## 📞 需要帮助？

如果遇到问题：

1. 查看 [故障排除指南](README.md#-故障排除)
2. 检查 Cloudflare Pages 部署日志
3. 在 GitHub 创建 Issue
4. 查看 Cloudflare 文档
