# 统一统计脚本

🎯 **一行代码集成三大统计平台：Google Analytics、百度统计、Umami**

## 🚀 快速使用

### 1. 配置统计ID

编辑 `analytics.js` 文件中的配置：

```javascript
const ANALYTICS_CONFIG = {
    'your-domain.com': {
        ga: 'G-XXXXXXXXXX',           // 你的Google Analytics ID
        baidu: 'xxxxxxxxxxxxxxxx',    // 你的百度统计ID
        umami: 'your-website-id',     // 你的Umami网站ID
        umamiUrl: 'https://your-umami-domain.com/umami.js'  // 你的Umami脚本地址
    }
};
```

### 2. 上传到GitHub

```bash
# 创建GitHub仓库
git clone https://github.com/your-username/unified-analytics.git
cp analytics.js unified-analytics/
cd unified-analytics
git add analytics.js
git commit -m "Add unified analytics script"
git push origin main
```

### 3. 集成到网站

在任何网站的 `<head>` 中添加一行代码：

```html
<script async src="https://cdn.jsdelivr.net/gh/your-username/unified-analytics@main/analytics.js"></script>
```

**就这么简单！** 🎉

## 📋 配置详解

### 域名配置
```javascript
const ANALYTICS_CONFIG = {
    // 支持精确域名匹配
    'tools.example.com': { ga: 'G-XXX', baidu: 'XXX', umami: 'XXX', umamiUrl: '...' },
    
    // 支持子域名匹配
    'example.com': { ga: 'G-YYY', baidu: 'YYY', umami: 'YYY', umamiUrl: '...' },
    
    // 本地开发环境
    'localhost': { ga: 'G-DEV', baidu: 'DEV-XXX', umami: 'dev-id', umamiUrl: '...' }
};
```

### 全局设置
```javascript
const GLOBAL_SETTINGS = {
    enableInDevelopment: false,    // 是否在开发环境启用统计
    debugMode: false,               // 调试模式
    trackErrors: true,              // 是否追踪错误
    trackPerformance: true          // 是否追踪性能
};
```

## 🛠️ 高级功能

### 1. 事件追踪
```javascript
// 使用统一API
window.UnifiedAnalytics.track('button_click', {
    button_id: 'submit',
    page: 'homepage'
});
```

### 2. 页面访问追踪
```javascript
// 手动触发页面访问
window.UnifiedAnalytics.pageview('/new-page');
```

### 3. 获取配置信息
```javascript
// 查看当前域名的统计配置
console.log(window.UnifiedAnalytics.getConfig());
```

## 🌐 部署选项

### 选项1：GitHub Pages（推荐免费方案）
```bash
git clone https://github.com/your-username/analytics.git
# 上传 analytics.js
# 启用 GitHub Pages
# 访问：https://your-username.github.io/analytics/analytics.js
```

### 选项2：jsDelivr（免费CDN加速）
```bash
# 上传到 GitHub 后使用 jsDelivr
# URL: https://cdn.jsdelivr.net/gh/your-username/analytics@main/analytics.js
```

### 选项3：Vercel/Netlify
- 直接部署单个JS文件
- 获得自定义域名和HTTPS

### 选项4：自建服务器
```bash
# 上传到你的服务器
# 配置Nginx/Apache静态文件服务
# 设置合适的缓存策略
```

## 🔧 维护指南

### 添加新网站
1. 编辑 `analytics.js` 中的 `ANALYTICS_CONFIG`
2. 添加新的域名配置
3. 更新CDN上的文件
4. 新网站只需添加一行引入代码

### 更新统计代码
1. 修改 `analytics.js` 文件
2. 上传到CDN覆盖旧文件
3. 所有网站自动获得更新（无需修改网站代码）

### 性能优化
```javascript
// 启用缓存
<script async src="https://your-cdn.com/analytics.js?v=1.0.0"></script>

// 或使用CDN版本控制
<script async src="https://cdn.jsdelivr.net/gh/your-username/analytics@v1.0.0/analytics.js"></script>
```

## 📊 数据查看

### Google Analytics
访问：https://analytics.google.com

### 百度统计
访问：https://tongji.baidu.com

### Umami
访问：你的Umami后台地址

每个统计平台都能看到：
- 页面访问量
- 用户来源分析
- 设备和浏览器统计
- 实时访问数据
- 自定义事件追踪

## 🛡️ 隐私和合规

- ✅ 支持 GDPR（通过Umami）
- ✅ IP匿名化（Google Analytics）
- ✅ Cookie 设置优化
- ✅ 开发环境可选关闭

## 🚨 故障排除

### 统计数据不显示
1. 检查统计ID是否正确
2. 查看浏览器控制台是否有错误
3. 确认域名配置是否匹配
4. 检查广告拦截器是否阻止了统计脚本

### 调试模式
```javascript
// 在 analytics.js 中启用调试
const GLOBAL_SETTINGS = {
    debugMode: true,  // 启用调试日志
    // ...
};
```

### 域名匹配问题
脚本支持以下匹配方式：
- 精确匹配：`tools.example.com`
- 子域名匹配：`example.com` 匹配 `blog.example.com`
- 本地开发：`localhost` 和 `127.0.0.1`

## 💡 最佳实践

1. **统一管理**：所有网站使用同一个脚本版本
2. **定期更新**：保持统计功能的最新状态
3. **测试验证**：新网站上线后验证统计数据
4. **性能监控**：定期检查统计脚本性能影响
5. **隐私保护**：遵循当地的隐私法规要求

## 🆘 技术支持

如遇问题，请检查：
1. 浏览器控制台错误信息
2. 网络请求是否正常
3. 统计平台设置是否正确
4. 脚本URL是否可访问

---

**这就是你的统一统计解决方案！一行代码，三大平台，无限网站！** 🎉