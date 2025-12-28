/**
 * 统一统计脚本 - 支持三大统计平台
 * 使用方法：<script async src="analytics.js"></script>
 * 
 * @author xxw工具箱
 * @version 1.0.0
 */

(function() {
    'use strict';
    
    // ==================== 配置区域 ====================
    // 默认统计ID - 所有网站默认使用这些ID
    const DEFAULT_ANALYTICS_IDS = {
        ga: 'G-2EE843NKSD',                           // Google Analytics ID
        baidu: 'e4216c0b920a9036e8ae6a85d8774be7',    // 百度统计ID
        umami: 'db3eaad6-38cb-46ed-a3c9-fea8b2c36aeb', // Umami网站ID
        umamiUrl: 'https://cloud.umami.is/script.js'     // Umami脚本地址
    };

    // 独立统计配置 - 后续给特定网站配置独立的统计ID
    // 格式：'域名': { ga: 'G-xxx', baidu: 'xxx', umami: 'xxx-id', umamiUrl: 'xxx' }
    const INDIVIDUAL_CONFIGS = {
        // 示例：为高流量网站配置独立统计
        // 'high-traffic-site.com': {
        //     ga: 'G-DIFFERENTGAID',
        //     baidu: 'different-baidu-id',
        //     umami: 'different-umami-id',
        //     umamiUrl: 'https://cloud.umami.is/script.js'
        // },
        
        // 目前没有独立配置，所有网站都使用默认统计
    };
    
    // 全局设置
    const GLOBAL_SETTINGS = {
        enableInDevelopment: false,    // 是否在开发环境启用统计
        debugMode: false,               // 调试模式
        trackErrors: true,              // 是否追踪错误
        trackPerformance: true          // 是否追踪性能
    };
    
    // ==================== 核心逻辑 ====================
    
    // 获取当前域名配置
    function getDomainConfig() {
        const hostname = window.location.hostname;
        
        // 处理localhost情况
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return null; // 开发环境不启用统计
        }
        
        // 查找精确匹配的独立配置
        if (INDIVIDUAL_CONFIGS[hostname]) {
            return INDIVIDUAL_CONFIGS[hostname];
        }
        
        // 查找子域名匹配的独立配置
        for (const domain in INDIVIDUAL_CONFIGS) {
            if (hostname.includes(domain)) {
                return INDIVIDUAL_CONFIGS[domain];
            }
        }
        
        // 所有未配置独立统计的网站都使用默认统计ID
        return DEFAULT_ANALYTICS_IDS;
    }
    
    // 检查是否应该启用统计
    function shouldEnableAnalytics() {
        // 开发环境检查
        const isDevelopment = window.location.hostname === 'localhost' || 
                             window.location.hostname === '127.0.0.1' ||
                             window.location.hostname.includes('dev.');
        
        if (isDevelopment && !GLOBAL_SETTINGS.enableInDevelopment) {
            return false;
        }
        
        return true;
    }
    
    // ==================== Google Analytics ====================
    function loadGoogleAnalytics(gaId) {
        if (!gaId) return;
        
        try {
            // 加载GA脚本
            const script1 = document.createElement('script');
            script1.async = true;
            script1.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
            document.head.appendChild(script1);
            
            // 初始化GA
            const script2 = document.createElement('script');
            script2.innerHTML = `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                    page_location: window.location.href,
                    page_title: document.title,
                    anonymize_ip: true,
                    cookie_flags: 'SameSite=None;Secure'
                });
            `;
            document.head.appendChild(script2);
            
            if (GLOBAL_SETTINGS.debugMode) {
                console.log('✅ Google Analytics loaded:', gaId);
            }
        } catch (error) {
            console.error('❌ Failed to load Google Analytics:', error);
        }
    }
    
    // ==================== 百度统计 ====================
    function loadBaiduAnalytics(baiduId) {
        if (!baiduId) return;
        
        try {
            const script = document.createElement('script');
            script.innerHTML = `
                var _hmt = _hmt || [];
                (function() {
                    var hm = document.createElement("script");
                    hm.src = "https://hm.baidu.com/hm.js?${baiduId}";
                    var s = document.getElementsByTagName("script")[0]; 
                    s.parentNode.insertBefore(hm, s);
                })();
            `;
            document.head.appendChild(script);
            
            if (GLOBAL_SETTINGS.debugMode) {
                console.log('✅ Baidu Analytics loaded:', baiduId);
            }
        } catch (error) {
            console.error('❌ Failed to load Baidu Analytics:', error);
        }
    }
    
    // ==================== Umami 统计 ====================
    function loadUmamiAnalytics(umamiId, umamiUrl) {
        if (!umamiId || !umamiUrl) return;
        
        try {
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.setAttribute('data-website-id', umamiId);
            script.setAttribute('data-domains', window.location.hostname);
            script.src = umamiUrl;
            document.head.appendChild(script);
            
            if (GLOBAL_SETTINGS.debugMode) {
                console.log('✅ Umami Analytics loaded:', umamiId, umamiUrl);
            }
        } catch (error) {
            console.error('❌ Failed to load Umami Analytics:', error);
        }
    }
    
    // ==================== 错误追踪 ====================
    function setupErrorTracking() {
        if (!GLOBAL_SETTINGS.trackErrors) return;
        
        window.addEventListener('error', function(event) {
            const errorInfo = {
                message: event.message,
                filename: event.filename,
                lineno: event.lineno,
                colno: event.colno,
                stack: event.error ? event.error.stack : '',
                url: window.location.href,
                timestamp: new Date().toISOString()
            };
            
            // 发送错误信息到GA
            if (typeof gtag !== 'undefined') {
                gtag('event', 'javascript_error', {
                    error_message: errorInfo.message,
                    error_url: errorInfo.url,
                    custom_map: { 'custom_dimension_1': 'error_info' }
                });
            }
            
            if (GLOBAL_SETTINGS.debugMode) {
                console.error('🔥 Error tracked:', errorInfo);
            }
        });
    }
    
    // ==================== 性能追踪 ====================
    function setupPerformanceTracking() {
        if (!GLOBAL_SETTINGS.trackPerformance) return;
        
        // 页面加载完成后的性能数据
        window.addEventListener('load', function() {
            setTimeout(function() {
                if (typeof performance !== 'undefined' && performance.timing) {
                    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                    
                    // 发送性能数据到GA
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'page_load_time', {
                            value: loadTime,
                            custom_map: { 'custom_dimension_2': 'performance' }
                        });
                    }
                    
                    if (GLOBAL_SETTINGS.debugMode) {
                        console.log('⚡ Page load time:', loadTime + 'ms');
                    }
                }
            }, 0);
        });
    }
    
    // ==================== 初始化 ====================
    function init() {
        // 检查是否应该启用统计
        if (!shouldEnableAnalytics()) {
            if (GLOBAL_SETTINGS.debugMode) {
                console.log('🚫 Analytics disabled (development mode)');
            }
            return;
        }
        
        // 获取当前域名配置
        const config = getDomainConfig();
        
        if (!config) {
            if (GLOBAL_SETTINGS.debugMode) {
                console.log('🚫 Analytics disabled (development mode)');
            }
            return;
        }
        
        // 加载各个统计平台
        loadGoogleAnalytics(config.ga);
        loadBaiduAnalytics(config.baidu);
        loadUmamiAnalytics(config.umami, config.umamiUrl);
        
        // 设置额外功能
        setupErrorTracking();
        setupPerformanceTracking();
        
        if (GLOBAL_SETTINGS.debugMode) {
            console.log('🎉 Analytics initialized for domain:', window.location.hostname);
            console.log('📊 Configuration:', config);
        }
    }
    
    // 等待DOM加载完成后初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // ==================== 公共API ====================
    // 提供一些公共方法供外部调用
    window.UnifiedAnalytics = {
        // 追踪自定义事件
        track: function(eventName, parameters) {
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, parameters);
            }
            
            if (typeof umami !== 'undefined') {
                umami.track(eventName, parameters);
            }
        },
        
        // 追踪页面访问
        pageview: function(path) {
            if (typeof gtag !== 'undefined') {
                gtag('config', getDomainConfig()?.ga, {
                    page_path: path
                });
            }
            
            if (typeof umami !== 'undefined') {
                umami.track('pageview', { url: path });
            }
        },
        
        // 获取当前配置
        getConfig: function() {
            return getDomainConfig();
        }
    };
    
})();