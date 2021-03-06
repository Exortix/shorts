var isMobile = false; //initiate as false
// device detection
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

if(isMobile) {
  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = 'css/mobile-style.css';
  link.media = 'all';
  head.appendChild(link);
} else {
  var head  = document.getElementsByTagName('head')[0];
  var link  = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = 'css/style.css';
  link.media = 'all';
  head.appendChild(link);
}


let shortVideosData = []
let currentIndex = (Number(localStorage.getItem("shortsId")) != 0 && !isNaN(localStorage.getItem("shortsId"))) 
? Number(localStorage.getItem("shortsId")) : 0 

getShorts("json/videos.json")

async function getShorts(url) {
  shortVideosData = await fetch(url)
  .then(response => response.json())
  .then(data => {
    displayVideos(data)
    setCurrentIndex(data)
    createSwipe(document.querySelector("#shorts"), currentIndex);
    setPlay(currentIndex)
    return data
  })
  .catch(error => console.error(error));
}
function displayVideos(data) {
  document.querySelector(".shorts .shorts-wrap").innerHTML = data.map((video, index) => {
    let videoElement = ""
    switch (video.type) {
      case "file":
          videoElement = `
          <div class="video-wrapper">
          <div class="video">
            <video src="${video.src}" index="${index}" onclick="playpause(this)" allowfullscreen loop="loop"></video>
          </div>
          <div class="details">
            <h2>${video.title}</h2>
            <p>${video.description}</p>
          </div>
          <div class="controls">
            <i onclick="muteunmute(this)" class="sound fa fa-solid fa-volume-low"></i>
            <i onclick="fullScreen(this)" class="fullscreen fa fa-solid fa-expand"></i>
          </div>
          </div>`
        break;
      case "vimeo":
        videoElement = `
        <div class="video-wrapper">
        <div class="video">
          <iframe class="thevideo" src="${video.src}?title=0&portrait=0&byline=0&autoplay=0&loop=1&controls=0" frameborder="0"></iframe>
        </div>
        <div class="details">
          <h2>${video.title}</h2>
          <p>${video.description}</p>
        </div>
        </div>`
        break;
      case "youtube":
        videoElement = `
        <div class="video-wrapper">
        <div class="video">
          <iframe style="z-index:1000" width="360" height="558"  index="${index}" src="${video.src}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; autoplay; modestbranding;" controls = "disabled" allowfullscreen></iframe>
        </div>
        <div class="details">
          <h2>${video.title}</h2>
          <p>${video.description}</p>
        </div>
        </div>`
        break;
      default:
        videoElement = ``
        break;
    }
    return videoElement;
  });
}
function playpause(ref) {
  if (ref.getAttribute("index") != currentIndex) return;
  ref.paused ? ref.play() : ref.pause();  
}
function setPlay(index) {
  try {
    let videos = document.querySelectorAll(".shorts .shorts-wrap .active");
    for (let index = 0; index < videos.length; index++) {
      const element = videos[index];
      element.classList.remove("active");
      element.pause();
    }
  } catch (error) {
    console.error(error);
  }
  let videoWrapper = document.querySelectorAll(".shorts .shorts-wrap .video-wrapper")[index];
  let video = videoWrapper.querySelector("video");
  video.classList.add("active");
  currentIndex = index
  localStorage.setItem("shortsId", currentIndex)
  video.play();
}
function createSwipe(swipeElement, currentIndex) {
  new Swipe(swipeElement, {
    startSlide: currentIndex,
    draggable: true,
    autoRestart: false,
    continuous: false,
    disableScroll: true,
    stopPropogation: true,
    callback: (index, element) => {
      setPlay(index);
    }
  });
}
function setCurrentIndex(data) {
  if (currentIndex > data.length-1 || currentIndex < 0)
    currentIndex = 0
  if (currentIndex != null)
    localStorage.setItem("shortsId", currentIndex)
}

function fullScreen(ref) {
  ref.parentElement.parentElement.querySelector("video").requestFullscreen()
}
function muteunmute(ref) {
  let video = ref.parentElement.parentElement.querySelector("video")
  video.muted = !video.muted;
  if (video.muted) {
    ref.classList.add("fa-volume-xmark")
    ref.classList.remove("fa-volume-low")
  }
  else {
    ref.classList.remove("fa-volume-xmark")
    ref.classList.add("fa-volume-low")
  }
}