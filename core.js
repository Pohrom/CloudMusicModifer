(function () {
    var byz = NEJ.P;
    bz = byz("nej.cef.ut");
    bD = byz("nej.n");
    byz("ctl").cefPlayer.AH = function (bzG) {
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
})();