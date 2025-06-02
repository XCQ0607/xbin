@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo 🚀 XBin 项目设置脚本
echo ====================
echo.

:: 检查 Node.js
echo 📋 检查依赖...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装。请访问 https://nodejs.org 安装 Node.js
    pause
    exit /b 1
)

:: 检查 npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm 未安装。请安装 npm
    pause
    exit /b 1
)

echo ✅ 依赖检查完成
echo.

:: 安装项目依赖
echo 📦 安装项目依赖...
npm install
if errorlevel 1 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成
echo.

:: 安装 Wrangler CLI
echo 🔧 检查 Wrangler CLI...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo 安装 Wrangler CLI...
    npm install -g wrangler
    if errorlevel 1 (
        echo ❌ Wrangler CLI 安装失败
        pause
        exit /b 1
    )
    echo ✅ Wrangler CLI 安装完成
) else (
    echo ✅ Wrangler CLI 已安装
)
echo.

:: 询问是否继续设置
set /p continue="是否要登录 Cloudflare 并创建 KV 命名空间？(y/n): "
if /i not "%continue%"=="y" goto :completion

:: 登录 Cloudflare
echo 🔐 登录 Cloudflare...
echo 请在浏览器中完成登录...
wrangler login
if errorlevel 1 (
    echo ❌ Cloudflare 登录失败
    pause
    exit /b 1
)
echo ✅ Cloudflare 登录完成
echo.

:: 创建 KV 命名空间
echo 🗄️ 创建 KV 命名空间...
echo 创建生产环境 KV 命名空间...
wrangler kv:namespace create "PASTEBIN_KV" --preview false > temp_prod.txt
if errorlevel 1 (
    echo ❌ 生产环境 KV 命名空间创建失败
    del temp_prod.txt 2>nul
    pause
    exit /b 1
)

echo 创建预览环境 KV 命名空间...
wrangler kv:namespace create "PASTEBIN_KV" --preview > temp_preview.txt
if errorlevel 1 (
    echo ❌ 预览环境 KV 命名空间创建失败
    del temp_prod.txt temp_preview.txt 2>nul
    pause
    exit /b 1
)

echo ✅ KV 命名空间创建完成
echo.
echo 📝 请手动更新 wrangler.toml 文件中的 KV 命名空间 ID
echo 生产环境 ID 信息：
type temp_prod.txt
echo.
echo 预览环境 ID 信息：
type temp_preview.txt
echo.

del temp_prod.txt temp_preview.txt 2>nul

:: 询问是否部署
set /p deploy="是否要立即部署项目？(y/n): "
if /i not "%deploy%"=="y" goto :completion

:: 部署项目
echo 🚀 部署项目...
npm run deploy
if errorlevel 1 (
    echo ❌ 项目部署失败
    pause
    exit /b 1
)
echo ✅ 项目部署完成

:completion
echo.
echo 🎉 设置完成！
echo ===============
echo.
echo 📋 接下来你可以：
echo 1. 访问你的 Cloudflare Pages 项目查看部署状态
echo 2. 配置自定义域名（可选）
echo 3. 设置环境变量（可选）：
echo    - ADMIN_USER: 管理员用户名
echo    - ADMIN_PASSWORD: 管理员密码
echo.
echo 🔗 有用的命令：
echo    npm run dev     - 本地开发
echo    npm run deploy  - 重新部署
echo    wrangler pages deployment tail - 查看日志
echo.
echo 📚 更多信息请查看 README.md
echo.
pause
