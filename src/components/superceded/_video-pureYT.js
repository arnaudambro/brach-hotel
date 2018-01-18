<!-- In case we use youtube javascript without the npm yt-player, we need to put this script in the index.html -->
<script>


      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      const wholeContentDiv = document.querySelector('#wholeContent');
      const video1Div = document.querySelector('.video1');
      const video1iFrame = document.querySelector('#video__video1');

      tag.src = "https://www.youtube.com/iframe_api";
      document.body.append(tag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      let player1;
      let player1start = 0;
      let player1autoplay = false;
      function onYouTubeIframeAPIReady() {
        player1 = new YT.Player('video__video1', {
          height: '100%',
          width: '100%',
          videoId: 'M6kQi1_Btqg',
          playerVars: {
            autoplay: player1autoplay,
            // cc_load_policy: 0,
            color: 'white',
            controls: 0,
            // enablejsapi: 1, //default: they say 0 but it's 1
            loop: 1,
            showinfo: 0,
            modestbranding: 1,
            disablekb: 1,
            iv_load_policy: 3,
            start: player1start,
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            // 'onPlaybackQualityChange': ,
            // 'onPlaybackRateChange': ,
            // 'onError': ,
            // 'onApiChange': 
          }
        });
      }
      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        // event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
        /* event.data === -1;
        ** event.data === 0 <=> YT.PlayerState.ENDED
        ** event.data === 1 <=> YT.PlayerState.PLAYING
        ** event.data === 2 <=> YT.PlayerState.PAUSED
        ** event.data === 3 <=> YT.PlayerState.BUFFERING
        ** event.data === 5 <=> YT.PlayerState.CUED*/

      function onPlayerStateChange(event) {
        console.log(event.data)
        if (event.data == 0 ) {
          event.target.playVideo();
        }
      }


      function stopVideo() {
        console.log('STOOOOOOP')
        player1.stopVideo();
      }

      /* Player controls :
      ** player.playVideo()
      **player.pauseVideo():Void
      **player.stopVideo():Void
      **player.seekTo(seconds:Number, allowSeekAhead:Boolean):Void
      **player.mute():Void
      **player.unMute():Void
      **player.isMuted():Boolean
      **player.setVolume(volume:Number):Void
      **player.getVolume():Number
      **player.setSize(width:Number, height:Number):Object
      **player.getPlaybackRate():Number
      **player.setPlaybackRate(suggestedRate:Number):Void
      **player.getAvailablePlaybackRates():Array

      Playback status
      **player.getVideoLoadedFraction():Float
      **player.getPlayerState():Number
      **player.getCurrentTime():Number



</script>



