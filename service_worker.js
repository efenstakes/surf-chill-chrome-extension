chrome.runtime.onInstalled.addListener(init);

function init() { }

async function createOffscreen() {

    if( await chrome.offscreen.hasDocument() ) {

        console.log("we have offscreen document")
        return
    }

    await chrome.offscreen.createDocument({
        url: "offscreen.html",

        reasons: [ "AUDIO_PLAYBACK" ],
        justification: "testing",
    })

}


chrome.runtime.onMessage.addListener(async (msg)=> {

    if( msg.type == "play" ) {
        await createOffscreen()

        await chrome.runtime.sendMessage({
            ...msg,
            offscreen: true,
        })
    }


    if( msg.type == "pause" ) {
        console.log('====================================');
        console.log("SW :: pause now");
        console.log('====================================');

        await createOffscreen()

        console.log('====================================');
        console.log("msg ", msg);
        console.log('====================================');
        

        await chrome.runtime.sendMessage({
            ...msg,
            offscreen: true,
        })
    }

})