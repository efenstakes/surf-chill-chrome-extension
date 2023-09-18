document.addEventListener("DOMContentLoaded", init);


const songList = [

    {
        name: "A Sitar Story",
        singer: "Hanu Dixit",
        url: "https://musica-extension.s3.us-east-2.amazonaws.com/A+Sitar+Story+-+Hanu+Dixit.mp3",
        tags: [ "ambient", "classical", ]
    },

    {
        name: "Body of Water",
        singer: "Track Tribe",
        url: "https://musica-extension.s3.us-east-2.amazonaws.com/Body+of+Water+-+TrackTribe.mp3",
        tags: [ "ambient", "classical", ]
    },

    {
        name: "Dance Of The Gypsies",
        singer: "Hanu Dixit",
        url: "https://musica-extension.s3.us-east-2.amazonaws.com/Dance+Of+The+Gypsies+-+Hanu+Dixit.mp3",
        tags: [ "ambient", "hiphop", "classical", ]
    },

]

function init() {

    // add songs to playlist
    addSongsToPlaylist()

    // const playButton = document.querySelector(".play_audio")
    // const pauseButton = document.querySelector(".pause_audio")

    // playButton.addEventListener('click', ()=> {

    //     console.log("play audio now");

    //     console.log('====================================');
    //     console.log("", chrome.runtime.getURL("./default_popup.html"));
    //     console.log('====================================');

    //     chrome.runtime.sendMessage({
    //         type: "play", play: { source: "", volume: .6 }
    //     })

    // })

    // pauseButton.addEventListener('click', ()=> {

    //     console.log("pause audio now");

    //     chrome.runtime.sendMessage({
    //         type: "pause", play: { source: "", volume: .6 }
    //     })

    // })

}


const addSongsToPlaylist = async ()=> {

    
    songList.forEach((song)=> {

        buildSongCard(song)
    })
}

const buildSongCard = ({ name, singer, tags, url, })=> {

    const div = document.createElement("div")
    div.innerHTML = `
        <div class="song_card__name_singer">
            ${name} - ${singer}
        </div>
        <div class="song_card__tags">
            ${tags.join(",")}
        </div>
    `
    div.classList.add("song_card")

    document.body.appendChild(div)

    div.addEventListener('click', ()=> {

        console.log('====================================');
        console.log("div.lastChild.textContent ", div.lastChild.textContent);
        console.log('====================================');

        console.log('====================================');
        console.log("div.children.length ", div.children.length);
        console.log('====================================');

        // const isCurrentPlaying = div.children.length === 3 && div.lastChild.textContent === "Playing"
        const isCurrentPlaying = div.classList.contains("active_playing_song")
        const isCurrentPaused = div.classList.contains("active_paused_song")

        // play it now
        if( !isCurrentPlaying && !isCurrentPaused ) {

            // remove the play and pause indicator from all elements with class song_card
            for (const el of document.getElementsByClassName("song_card")) {

                // remove playing class
                el.classList.remove("active_playing_song")
                el.classList.remove("active_paused_song")
                
                const hasIndicator = el.children.length === 3

                if( hasIndicator ) el.removeChild(el.lastChild)
            }


            // play it now
            div.classList.add("active_playing_song")

            const isPlayingEl = document.createElement("div")
            isPlayingEl.classList.add("song_card__playing_indicator")
            isPlayingEl.textContent = "Playing"
            div.appendChild(isPlayingEl)

            chrome.runtime.sendMessage({
                type: "play", play: { name, singer, tags, url, }
            })
            console.log('====================================');
            console.log("clicked ", name, singer, tags, url,)
            console.log("play it");
            console.log('====================================');

            return
        }

        // pause it now
        if( isCurrentPlaying ) {

            // remove playing class
            div.classList.remove("active_playing_song")
            div.classList.add("active_paused_song")

            // remove is playing indicator
            div.removeChild(div.lastChild)

            // add paused element
            const isPausedEl = document.createElement("div")
            isPausedEl.classList.add("song_card__paused_indicator")
            isPausedEl.textContent = "Paused"
            div.appendChild(isPausedEl)

            chrome.runtime.sendMessage({
                type: "pause", play: { name, singer, tags, url, }
            })
            console.log('====================================');
            console.log("clicked ", name, singer, tags, url,)
            console.log("pause it");
            console.log('====================================');
            return
        }

        // play it
        if( isCurrentPaused ) {

            // remove playing class
            div.classList.remove("active_paused_song")
            div.classList.add("active_playing_song")

            // remove is paused indicator
            div.removeChild(div.lastChild)

            // add playing element
            const isPlayingEl = document.createElement("div")
            isPlayingEl.classList.add("song_card__playing_indicator")
            isPlayingEl.textContent = "Playing"
            div.appendChild(isPlayingEl)

            chrome.runtime.sendMessage({
                type: "play", play: { name, singer, tags, url, }
            })
            console.log('====================================');
            console.log("clicked ", name, singer, tags, url,)
            console.log("play it");
            console.log('====================================');
            return
        }

        return

        if( !isCurrentPlaying ) {

            // remove the play indicator from all elements with class song_card
            for (const el of document.getElementsByClassName("song_card")) {

                // remove playing class
                el.classList.remove("active_playing_song")
                
                const hasPlayIndicator = el.children.length === 3

                if( hasPlayIndicator ) el.removeChild(el.lastChild)
            }


            // play it now
            div.classList.add("active_playing_song")
            
            const isPlayingEl = document.createElement("div")
            isPlayingEl.classList.add("song_card__playing_indicator")
            isPlayingEl.textContent = "Playing"
            div.appendChild(isPlayingEl)

            chrome.runtime.sendMessage({
                type: "play", play: { name, singer, tags, url, }
            })
            console.log('====================================');
            console.log("clicked ", name, singer, tags, url,)
            console.log("play it");
            console.log('====================================');
        } else {

            // remove playing class
            div.classList.remove("active_playing_song")
            div.classList.add("active_paused_song")

            const isPausedEl = document.createElement("div")
            isPausedEl.classList.add("song_card__paused_indicator")
            isPausedEl.textContent = "Paused"
            div.appendChild(isPausedEl)

            chrome.runtime.sendMessage({
                type: "pause", play: { name, singer, tags, url, }
            })
            console.log('====================================');
            console.log("clicked ", name, singer, tags, url,)
            console.log("pause it");
            console.log('====================================');

        }
    })
}
