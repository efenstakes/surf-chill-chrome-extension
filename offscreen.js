

chrome.runtime.onMessage.addListener((msg)=> {

    if( !msg.offscreen ) {

        console.log("no offscreen");
        return
    }

    if( msg.type == "play" ) {

        playAudio(msg?.play)
    }

    if( msg.type == "pause" ) {
        
        pauseAudio()
    }
})

const audio = document.querySelector("#myAudio")

function playAudio({ url, }) {
    
    // audio.src = "./Flying - Track Tribe.mp3"
    audio.src = url; // chrome.runtime.getURL("./Flying - Track Tribe.mp3")
    audio.play()
}

function pauseAudio() {
    
    audio.pause()
}
