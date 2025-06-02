#!/bin/bash

# XBin 项目设置脚本
# 此脚本帮助快速设置和部署 XBin 项目

set -e

echo "🚀 XBin 项目设置脚本"
echo "===================="

# 检查是否安装了必要的工具
check_dependencies() {
    echo "📋 检查依赖..."
    
    if ! command -v node &> /dev/null; then
        echo "❌ Node.js 未安装。请访问 https://nodejs.org 安装 Node.js"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        echo "❌ npm 未安装。请安装 npm"
        exit 1
    fi
    
    echo "✅ 依赖检查完成"
}

# 安装项目依赖
install_dependencies() {
    echo "📦 安装项目依赖..."
    npm install
    echo "✅ 依赖安装完成"
}

# 安装 Wrangler CLI
install_wrangler() {
    echo "🔧 安装 Wrangler CLI..."
    if ! command -v wrangler &> /dev/null; then
        npm install -g wrangler
        echo "✅ Wrangler CLI 安装完成"
    else
        echo "✅ Wrangler CLI 已安装"
    fi
}

# 登录 Cloudflare
login_cloudflare() {
    echo "🔐 登录 Cloudflare..."
    echo "请在浏览器中完成登录..."
    wrangler login
    echo "✅ Cloudflare 登录完成"
}

# 创建 KV 命名空间
create_kv_namespace() {
    echo "🗄️ 创建 KV 命名空间..."
    
    echo "创建生产环境 KV 命名空间..."
    PROD_KV=$(wrangler kv:namespace create "PASTEBIN_KV" --preview false | grep -o 'id = "[^"]*"' | cut -d'"' -f2)
    
    echo "创建预览环境 KV 命名空间..."
    PREVIEW_KV=$(wrangler kv:namespace create "PASTEBIN_KV" --preview | grep -o 'id = "[^"]*"' | cut -d'"' -f2)
    
    echo "✅ KV 命名空间创建完成"
    echo "生产环境 ID: $PROD_KV"
    echo "预览环境 ID: $PREVIEW_KV"
    
    # 更新 wrangler.toml
    echo "📝 更新 wrangler.toml 配置..."
    sed -i.bak "s/your-kv-namespace-id/$PROD_KV/g" wrangler.toml
    sed -i.bak "s/your-preview-kv-namespace-id/$PREVIEW_KV/g" wrangler.toml
    rm wrangler.toml.bak
    echo "✅ 配置文件更新完成"
}

# 部署项目
deploy_project() {
    echo "🚀 部署项目..."
    npm run deploy
    echo "✅ 项目部署完成"
}

# 显示完成信息
show_completion() {
    echo ""
    echo "🎉 设置完成！"
    echo "==============="
    echo ""
    echo "📋 接下来你可以："
    echo "1. 访问你的 Cloudflare Pages 项目查看部署状态"
    echo "2. 配置自定义域名（可选）"
    echo "3. 设置环境变量（可选）："
    echo "   - ADMIN_USER: 管理员用户名"
    echo "   - ADMIN_PASSWORD: 管理员密码"
    echo ""
    echo "🔗 有用的命令："
    echo "   npm run dev     - 本地开发"
    echo "   npm run deploy  - 重新部署"
    echo "   wrangler pages deployment tail - 查看日志"
    echo ""
    echo "📚 更多信息请查看 README.md"
}

# 主函数
main() {
    echo "开始设置 XBin 项目..."
    echo ""
    
    check_dependencies
    install_dependencies
    install_wrangler
    
    echo ""
    read -p "是否要登录 Cloudflare 并创建 KV 命名空间？(y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        login_cloudflare
        create_kv_namespace
        
        echo ""
        read -p "是否要立即部署项目？(y/n): " -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            deploy_project
        fi
    fi
    
    show_completion
}

# 运行主函数
main "$@"
