# 贡献指南

感谢你对 XBin 项目的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告 Bug

如果你发现了 bug，请：

1. 检查 [Issues](https://github.com/XCQ0607/xbin/issues) 确认问题未被报告
2. 创建新的 Issue，包含：
   - 清晰的标题和描述
   - 重现步骤
   - 预期行为和实际行为
   - 环境信息（浏览器、操作系统等）
   - 截图或错误日志（如果适用）

### 建议新功能

我们欢迎新功能建议：

1. 创建 Issue 描述你的想法
2. 说明功能的用途和价值
3. 提供可能的实现方案
4. 等待社区讨论和反馈

### 提交代码

#### 开发环境设置

```bash
# 1. Fork 仓库并克隆
git clone https://github.com/XCQ0607/xbin.git
cd xbin

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

#### 代码规范

- 使用 2 空格缩进
- 遵循现有的代码风格
- 添加必要的注释
- 确保代码通过测试

#### 提交流程

1. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **进行开发**
   - 编写代码
   - 测试功能
   - 更新文档

3. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **推送分支**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **创建 Pull Request**
   - 提供清晰的标题和描述
   - 说明更改的内容和原因
   - 链接相关的 Issues

#### 提交信息规范

使用 [Conventional Commits](https://conventionalcommits.org/) 格式：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式调整
- `refactor:` 代码重构
- `test:` 测试相关
- `chore:` 构建或工具相关

示例：
```
feat: add batch delete functionality
fix: resolve KV namespace binding issue
docs: update deployment guide
```

## 🧪 测试

在提交 PR 之前，请确保：

1. 功能正常工作
2. 没有破坏现有功能
3. 代码符合项目规范

```bash
# 本地测试
npm run dev

# 部署测试
npm run deploy
```

## 📝 文档

如果你的更改影响用户使用：

1. 更新 README.md
2. 更新相关文档
3. 添加示例代码

## 🎯 优先级

我们特别欢迎以下类型的贡献：

- 🐛 Bug 修复
- 🚀 性能优化
- 🌐 国际化支持
- 📱 移动端优化
- 🔒 安全性改进
- 📚 文档完善

## 💬 交流

- 通过 Issues 讨论问题和建议
- 在 PR 中进行代码审查
- 保持友好和建设性的交流

## 📄 许可证

通过贡献代码，你同意你的贡献将在 MIT 许可证下发布。

---

再次感谢你的贡献！🎉
