if(!self.define){let e,s={};const c=(c,a)=>(c=new URL(c+".js",a).href,s[c]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=c,e.onload=s,document.head.appendChild(e)}else e=c,importScripts(c),s()})).then((()=>{let e=s[c];if(!e)throw new Error(`Module ${c} didn’t register its module`);return e})));self.define=(a,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const r=e=>c(e,t),d={module:{uri:t},exports:n,require:r};s[t]=Promise.all(a.map((e=>d[e]||r(e)))).then((e=>(i(...e),n)))}}define(["./workbox-40866503"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/FxbxpmgH6CKsMuWShWJWN/_buildManifest.js",revision:"bde1a6df4ab1eed08dd4ab334f24b396"},{url:"/_next/static/FxbxpmgH6CKsMuWShWJWN/_middlewareManifest.js",revision:"60ed9523f510025b6e688aada2df4cec"},{url:"/_next/static/FxbxpmgH6CKsMuWShWJWN/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1226-88ade488bc3aea27.js",revision:"88ade488bc3aea27"},{url:"/_next/static/chunks/1297-a92909ace6739770.js",revision:"a92909ace6739770"},{url:"/_next/static/chunks/135-a192d6f2df8ee084.js",revision:"a192d6f2df8ee084"},{url:"/_next/static/chunks/2422-21cc4bb0230e2a7b.js",revision:"21cc4bb0230e2a7b"},{url:"/_next/static/chunks/336-279431ec2421422c.js",revision:"279431ec2421422c"},{url:"/_next/static/chunks/3494-d6d2eb97515d6612.js",revision:"d6d2eb97515d6612"},{url:"/_next/static/chunks/3958-9df698fc13a33bc8.js",revision:"9df698fc13a33bc8"},{url:"/_next/static/chunks/3975bccd-898623687bc47540.js",revision:"898623687bc47540"},{url:"/_next/static/chunks/4380-34bdcc9319bd551e.js",revision:"34bdcc9319bd551e"},{url:"/_next/static/chunks/4803-c393e9e6b92a7c4f.js",revision:"c393e9e6b92a7c4f"},{url:"/_next/static/chunks/4979-a6ea69f84a6b8c6f.js",revision:"a6ea69f84a6b8c6f"},{url:"/_next/static/chunks/5335-3d747357709d5591.js",revision:"3d747357709d5591"},{url:"/_next/static/chunks/5700-84397f7bb4fc17f5.js",revision:"84397f7bb4fc17f5"},{url:"/_next/static/chunks/6152-770c3f7b426dc970.js",revision:"770c3f7b426dc970"},{url:"/_next/static/chunks/6504-1b36038861c757ef.js",revision:"1b36038861c757ef"},{url:"/_next/static/chunks/6988.c9d729bda8505769.js",revision:"c9d729bda8505769"},{url:"/_next/static/chunks/7120.39647ac3cb6baf94.js",revision:"39647ac3cb6baf94"},{url:"/_next/static/chunks/7448-838e00ccc0b87329.js",revision:"838e00ccc0b87329"},{url:"/_next/static/chunks/75fc9c18-dbea95b340aace72.js",revision:"dbea95b340aace72"},{url:"/_next/static/chunks/7914-5138d7c105012c78.js",revision:"5138d7c105012c78"},{url:"/_next/static/chunks/8567-1241dbb3008d9289.js",revision:"1241dbb3008d9289"},{url:"/_next/static/chunks/9016-9c1fe7f487242c3f.js",revision:"9c1fe7f487242c3f"},{url:"/_next/static/chunks/9128-50170efe5c832aaa.js",revision:"50170efe5c832aaa"},{url:"/_next/static/chunks/d30c6e48-894aaf16472657ed.js",revision:"894aaf16472657ed"},{url:"/_next/static/chunks/framework-47503b8bb4de6bb8.js",revision:"47503b8bb4de6bb8"},{url:"/_next/static/chunks/main-5e6b01ca15278cce.js",revision:"5e6b01ca15278cce"},{url:"/_next/static/chunks/pages/404-a3a6bd0a9f22aafa.js",revision:"a3a6bd0a9f22aafa"},{url:"/_next/static/chunks/pages/_app-6916e74f28202bdb.js",revision:"6916e74f28202bdb"},{url:"/_next/static/chunks/pages/_error-785557186902809b.js",revision:"785557186902809b"},{url:"/_next/static/chunks/pages/chat-62f555017ede12c3.js",revision:"62f555017ede12c3"},{url:"/_next/static/chunks/pages/contact-dcafbfd3582860eb.js",revision:"dcafbfd3582860eb"},{url:"/_next/static/chunks/pages/crush-51e5f50f06460dc7.js",revision:"51e5f50f06460dc7"},{url:"/_next/static/chunks/pages/crush/%5Bid%5D-a91647de86bf7ab9.js",revision:"a91647de86bf7ab9"},{url:"/_next/static/chunks/pages/discover-afd6d344998e62d4.js",revision:"afd6d344998e62d4"},{url:"/_next/static/chunks/pages/feed-2b0e2b30d0f053ff.js",revision:"2b0e2b30d0f053ff"},{url:"/_next/static/chunks/pages/index-154da753040fd47d.js",revision:"154da753040fd47d"},{url:"/_next/static/chunks/pages/job-b3ec572f23059a1f.js",revision:"b3ec572f23059a1f"},{url:"/_next/static/chunks/pages/job/%5Bslug%5D-8d4df317946dda7c.js",revision:"8d4df317946dda7c"},{url:"/_next/static/chunks/pages/job/create-2f153429a4370fcb.js",revision:"2f153429a4370fcb"},{url:"/_next/static/chunks/pages/jobs-sitemap.xml-cfe0238f297dc1aa.js",revision:"cfe0238f297dc1aa"},{url:"/_next/static/chunks/pages/me-c2458a34262d9882.js",revision:"c2458a34262d9882"},{url:"/_next/static/chunks/pages/me/followers-33e64463804e5cc8.js",revision:"33e64463804e5cc8"},{url:"/_next/static/chunks/pages/me/following-728536517c0c4d0f.js",revision:"728536517c0c4d0f"},{url:"/_next/static/chunks/pages/messages-6740ede9a9372eef.js",revision:"6740ede9a9372eef"},{url:"/_next/static/chunks/pages/messages/%5Bconversation%5D-240ca2c930e783c3.js",revision:"240ca2c930e783c3"},{url:"/_next/static/chunks/pages/notifications-8f2d0d935239c583.js",revision:"8f2d0d935239c583"},{url:"/_next/static/chunks/pages/post/%5Bslug%5D-69a77f7c550eb559.js",revision:"69a77f7c550eb559"},{url:"/_next/static/chunks/pages/post/create-7dd42e90e16c2002.js",revision:"7dd42e90e16c2002"},{url:"/_next/static/chunks/pages/post/edit/%5Bslug%5D-2cd51db7edb75636.js",revision:"2cd51db7edb75636"},{url:"/_next/static/chunks/pages/post/preview-33540ee433059e94.js",revision:"33540ee433059e94"},{url:"/_next/static/chunks/pages/posts-sitemap.xml-074cc6a2253fbb0e.js",revision:"074cc6a2253fbb0e"},{url:"/_next/static/chunks/pages/profile/%5Busername%5D-cf17b570f747aea8.js",revision:"cf17b570f747aea8"},{url:"/_next/static/chunks/pages/profile/%5Busername%5D/followers-d979c740ffeaf8ab.js",revision:"d979c740ffeaf8ab"},{url:"/_next/static/chunks/pages/profile/%5Busername%5D/following-de5d2e54d9c7a3a5.js",revision:"de5d2e54d9c7a3a5"},{url:"/_next/static/chunks/pages/saved-86326e65363416cb.js",revision:"86326e65363416cb"},{url:"/_next/static/chunks/pages/school-bf13793656dc09b9.js",revision:"bf13793656dc09b9"},{url:"/_next/static/chunks/pages/school/%5Bslug%5D-af6b10806f6d63e4.js",revision:"af6b10806f6d63e4"},{url:"/_next/static/chunks/pages/school/%5Bslug%5D/edit-ae50bcc08f5d627f.js",revision:"ae50bcc08f5d627f"},{url:"/_next/static/chunks/pages/school/create-3e4f04782e36b45d.js",revision:"3e4f04782e36b45d"},{url:"/_next/static/chunks/pages/search-a0e998035b168bfd.js",revision:"a0e998035b168bfd"},{url:"/_next/static/chunks/pages/settings-74835b68dd230510.js",revision:"74835b68dd230510"},{url:"/_next/static/chunks/pages/settings/cover-a73784e3aa83280e.js",revision:"a73784e3aa83280e"},{url:"/_next/static/chunks/pages/settings/curriculum-fd39149ea42b4258.js",revision:"fd39149ea42b4258"},{url:"/_next/static/chunks/pages/settings/facebook-9a8d014477fd5501.js",revision:"9a8d014477fd5501"},{url:"/_next/static/chunks/pages/settings/notification-221300260e1311ac.js",revision:"221300260e1311ac"},{url:"/_next/static/chunks/pages/settings/password-640bf84525b538e1.js",revision:"640bf84525b538e1"},{url:"/_next/static/chunks/pages/settings/picture-78b2a2f722389dc7.js",revision:"78b2a2f722389dc7"},{url:"/_next/static/chunks/pages/settings/profile-222d6026e4bcfadc.js",revision:"222d6026e4bcfadc"},{url:"/_next/static/chunks/pages/settings/school-6c3b62ef4e70858e.js",revision:"6c3b62ef4e70858e"},{url:"/_next/static/chunks/pages/teacher/%5Bid%5D-f7afe768a3c3c2fb.js",revision:"f7afe768a3c3c2fb"},{url:"/_next/static/chunks/pages/terms-cd9dad89ce4bb8ae.js",revision:"cd9dad89ce4bb8ae"},{url:"/_next/static/chunks/polyfills-5cd94c89d3acac5f.js",revision:"99442aec5788bccac9b2f0ead2afdd6b"},{url:"/_next/static/chunks/webpack-df25d061399ad9eb.js",revision:"df25d061399ad9eb"},{url:"/_next/static/css/0417714b599c453f.css",revision:"0417714b599c453f"},{url:"/_next/static/css/086e6c498745ec23.css",revision:"086e6c498745ec23"},{url:"/_next/static/css/0b1bf31fd79ba03f.css",revision:"0b1bf31fd79ba03f"},{url:"/_next/static/css/1016436ecac466ee.css",revision:"1016436ecac466ee"},{url:"/_next/static/css/16c4b8c13aff1911.css",revision:"16c4b8c13aff1911"},{url:"/_next/static/css/16e168dcb85f424e.css",revision:"16e168dcb85f424e"},{url:"/_next/static/css/1923c69e736b80d1.css",revision:"1923c69e736b80d1"},{url:"/_next/static/css/1bf2e508fcb94453.css",revision:"1bf2e508fcb94453"},{url:"/_next/static/css/1ee16637e1d9aff5.css",revision:"1ee16637e1d9aff5"},{url:"/_next/static/css/1fdd667cb53752a1.css",revision:"1fdd667cb53752a1"},{url:"/_next/static/css/2ab1b979e300a844.css",revision:"2ab1b979e300a844"},{url:"/_next/static/css/2b7bc9af937dff10.css",revision:"2b7bc9af937dff10"},{url:"/_next/static/css/2eeeb4e16df59e2d.css",revision:"2eeeb4e16df59e2d"},{url:"/_next/static/css/3734fdcbb34e5462.css",revision:"3734fdcbb34e5462"},{url:"/_next/static/css/3844230684c5d602.css",revision:"3844230684c5d602"},{url:"/_next/static/css/3cd1b2cffa2ab338.css",revision:"3cd1b2cffa2ab338"},{url:"/_next/static/css/59771eca70cb1bb8.css",revision:"59771eca70cb1bb8"},{url:"/_next/static/css/5e4340113d99f3c0.css",revision:"5e4340113d99f3c0"},{url:"/_next/static/css/820d8f4f92766e07.css",revision:"820d8f4f92766e07"},{url:"/_next/static/css/9123db5cc51f69f4.css",revision:"9123db5cc51f69f4"},{url:"/_next/static/css/917aecb051820fcc.css",revision:"917aecb051820fcc"},{url:"/_next/static/css/96716378747a4b29.css",revision:"96716378747a4b29"},{url:"/_next/static/css/9686f91391f94bd6.css",revision:"9686f91391f94bd6"},{url:"/_next/static/css/9c46d110ba8b979a.css",revision:"9c46d110ba8b979a"},{url:"/_next/static/css/9ee3e95ba380b2a8.css",revision:"9ee3e95ba380b2a8"},{url:"/_next/static/css/a49421a54b27e176.css",revision:"a49421a54b27e176"},{url:"/_next/static/css/ba8d296fd3136902.css",revision:"ba8d296fd3136902"},{url:"/_next/static/css/cbe7ac2d890ac5f3.css",revision:"cbe7ac2d890ac5f3"},{url:"/_next/static/css/ceb4c986cfdf976d.css",revision:"ceb4c986cfdf976d"},{url:"/_next/static/css/d3e5c5dffffad8c3.css",revision:"d3e5c5dffffad8c3"},{url:"/_next/static/css/dd11b2dfaa0ca538.css",revision:"dd11b2dfaa0ca538"},{url:"/_next/static/css/e3254cebf2af866a.css",revision:"e3254cebf2af866a"},{url:"/_next/static/css/e5878059872c4482.css",revision:"e5878059872c4482"},{url:"/_next/static/css/ea3fa599dbfbb537.css",revision:"ea3fa599dbfbb537"},{url:"/_next/static/css/f0772554b7f0591f.css",revision:"f0772554b7f0591f"},{url:"/_next/static/css/f9c55b2f3ff82c09.css",revision:"f9c55b2f3ff82c09"},{url:"/_next/static/css/fb0bbd07c51f875c.css",revision:"fb0bbd07c51f875c"},{url:"/_next/static/media/default-avatar.8469ad1e.jpg",revision:"5c99ec1ed08c0bbb31e278e3a4b7c074"},{url:"/_next/static/media/loading-circle.6af05dee.gif",revision:"282ef7face7aed19c325a134557ebe84"},{url:"/_next/static/media/logo.96f5cbad.png",revision:"12d1d113cd77fcd9be214021479f45dd"},{url:"/favicon.ico",revision:"4bee93749d3478b57183715af8b1523c"},{url:"/firebase-messaging-sw.js",revision:"dfdd7d306a2ce1a6d7e485014bd8a706"},{url:"/icon-192x192.png",revision:"03d1430c8ec93f8eef7958c37459bf3c"},{url:"/icon-256x256.png",revision:"de5c6d38f5a002dfdd2ab99e1edc19d1"},{url:"/icon-384x384.png",revision:"e6d3c8109a41dc59c7b69a25822fdba0"},{url:"/icon-512x512.png",revision:"c23131afe80b1c1521ae008b5a8f80b2"},{url:"/manifest.webmanifest",revision:"2117dc2119592c7c8abb380448d3a968"},{url:"/privacy.html",revision:"ae1c6960642aaf18321a8adde10898a2"},{url:"/robots.txt",revision:"c9c09ab305ddd7530287eca2bbb05979"},{url:"/sitemap-0.xml",revision:"75f8153acf048437190292188dc11e3d"},{url:"/sitemap.xml",revision:"6237ff66bc16da04d9ad35812ad98f6b"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:c,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
