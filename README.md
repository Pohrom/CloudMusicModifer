# 网易云音乐 桌面歌词翻译显示

## 发现
* 使用网易 NEJ 前端框架, 基于 [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef)
* 可以开启 Chromium 远程调试端口, 使用参数 `/remote-debugging-port=2016` 并可通过 Chrome Devtools > Remote Devices 进行 Inspect
* 发现 `--enable-dev-tools` 参数
* 签名使用了 Windows Crypto API
* 使用了 PROV_RSA_SIG 进行签名, 使用 SHA Hash 算法进行摘要

### NTPK 文件结构
* magic number
* version ( = 0x00000000 )
* size
* signature
* 0100h: ZIP Compressed Data

### Javascript
* 修改 orpheus.ntpk/pub/core.js
* 使用了 NEJ 的 [player.js](https://github.com/Young-Wang/netease/blob/master/%E5%A4%A7%E4%BD%9C%E4%B8%9A/start/nginx-1.5.2/html/nej/js/nej/native/cef/util/player.js)

## Javascript 修改
```Javascript
function (bzG) {
    var cr = 0;
    if (!bzG) {
        bD.cFB("player.setLRCEmpty")
    } else if (bzG.nolyric) {
        bD.cFB("player.setMusicOnly")
    } else if (bzG.tlyric && bzG.tlyric.lyric) {
        bD.cFB("player.setLyrics", {
            krc: "",
            lrc: bzG.tlyric.lyric || ""
        });
        if (bzG.lrc) cr = bzG.lrc.offset || 0
    } else if (bzG.lrc && bzG.lrc.source) {
        bD.cFB("player.setLyrics", {
            krc: "",
            lrc: bzG.lrc.source || ""
        });
        cr = bzG.lrc.offset || 0
    } else {
        bD.cFB("player.setLRCEmpty")
    }
    this.cdq(cr)
};
```

## 修改方案一

### Patch the Signature Checker
* 定位".ntpk"
* 找到相关验证函数
```
.text:100B8760                 push    ebp
.text:100B8761                 mov     ebp, esp
.text:100B8763                 sub     esp, 0C8h
.text:100B8769                 push    ebx
.text:100B876A                 push    esi
.text:100B876B                 push    0F0000040h      ; dwFlags
.text:100B8770                 push    1               ; dwProvType
.text:100B8772                 xor     ebx, ebx
.text:100B8774                 lea     eax, [ebp+phProv]
.text:100B8777                 push    offset szProvider ; "Microsoft Base Cryptographic Provider v"...
.text:100B877C                 push    ebx             ; szContainer
.text:100B877D                 push    eax             ; phProv
.text:100B877E                 mov     [ebp+phKey], ebx
.text:100B8781                 mov     [ebp+var_1], bl
.text:100B8784                 call    ds:CryptAcquireContextW
```
* Patch it  
使用了 [Luigi Auriemma](http://aluigi.altervista.org/) 的 [Lame Patcher](http://aluigi.altervista.org/mytoolz.htm)，见 `lpatch.dat`

### Modify the core.js

## 修改方案二

### 使用远程调试注入 Javascript 代码

见 `main.py` 与 `core.js`

#### 依赖
* websocket
* requests
