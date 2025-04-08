import React, { useState, useEffect } from 'react'
import './timeportal.css'
import vid1 from './vid21.mp4';
import vid2 from './vid22.mp4';
import vid3 from './vid23.mp4';
import vid4 from './vid24.mp4';
import vid5 from './vid25.mp4';
import vid6 from './vid26.mp4';
import { faExpand, faVolumeOff, faVolumeLow, faVolumeMute, faVolumeHigh, faLeftLong } from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import song1 from "../../../assets/sound/Shaan.mp3";
import song3 from "../../../assets/sound/Kuhad_Track.mp3";
import song5 from "../../../assets/sound/Amit_Trivedi.mp3";
import song2 from "../../../assets/sound/Shalmali.mp3";
import song4 from "../../../assets/sound/Ritviz.mp3";
import song6 from "../../../assets/sound/divine.mp3";
import { Link, useNavigate } from 'react-router-dom';
import '../../EventsMarket/market.css';
import Mapbar from '../../Mapbar/Mapbar';

export default function Gallery() {
    const vid_arr = [vid4, vid5, vid6, vid2, vid3, vid1];
    const title_arr = ["Ritviz", "Amit Trivedi", "Divine", "Shalmali", "Prateek Kuhad", "Shaan"]
    const subtitle_arr = ["", "", "", "", "", ""]
    const len = 6;
    const [stlone, setstlone] = useState("gdivtwostl2");
    const [stltwo, setstltwo] = useState("gdivtwostl1");
    const [stlthree, setstlthree] = useState("");
    const [title, setTitle] = useState(title_arr[0]);
    const [subtitle, setSubtitle] = useState(subtitle_arr[0]);
    const [textdivClass, setTextdivClass] = useState("div-show");
    const [i, seti] = useState(2);
    const [ph1, setph1] = useState(vid_arr[0]);
    const [ph2, setph2] = useState(vid_arr[1]);
    const [ph3, setph3] = useState(vid_arr[2]);
    
    const aud_arr = [song4, song5, song6, song2, song3, song1];
    const [audio, setAudio] = useState(new Audio(song4));
    const [volume, setVolume] = useState(faVolumeHigh);
    useEffect(() => {
      audio.loop=true; 
        // console.log("in useeffect", audio, audio.paused)
        if(audio.paused && volume.iconName=="volume-high"){
            audio.load();
            audio.autoplay=true;
            audio.play();
            // console.log(audio)
        } else audio.pause(); 
    },[audio])

    useEffect(()=>{
      audio.play();
    },[])
    
    const changestlone = (e) => {
      console.log("onclick i'm", e.target)
      let t = i;
      if (i+1>vid_arr.length-1) {
        seti(-1);
        t = -1;
      }
      let s = Math.abs((t-2)%6);
      console.log("s:",s,t)
      console.log(i>len-1)
      console.log("i:",i);
      console.log("ph:",[ph1, ph2, ph3]);
      if (stlone == "gdivtwostl1") {
        setstlone("gdivtwostl2");
        setstltwo("gdivtwostl1");
        setstlthree("gdivtwostl2hold");
        seti(t+1);
        setTimeout(() => {
          setph3(vid_arr[t+1]);
        }, 1050);
      }
      else if (stltwo == "gdivtwostl1") {
        setstlthree("gdivtwostl1");
        setstltwo("gdivtwostl2");
        setstlone("gdivtwostl2hold");
        seti(t+1);
        setTimeout(() => {
          setph1(vid_arr[t+1]);
        }, 1050);
      }
      else if (stlthree == "gdivtwostl1") {
        setstlthree("gdivtwostl2");
        setstlone("gdivtwostl1");
        setstltwo("gdivtwostl2hold");
        seti(t+1);
        setTimeout(() => {
          setph2(vid_arr[t+1]);
        }, 1050);
      }
    }

    const mousedownFunc = () => {console.log("mousedownfunc")
      setTextdivClass("div-hide");
      if(stlone == "gdivtwostl1") {
        const t = stlone;
        setstlone(t+" window-anim")
      }
      else if(stltwo == "gdivtwostl1") {
        const t = stltwo;
        setstltwo(t+" window-anim")
      }
      else if(stlthree == "gdivtwostl1") {
        const t = stlthree;
        setstlthree(t+" window-anim")
      }
    }

    const mouseupFunc = () => {console.log("mouseupfunc")
      let t = i;
      if (t<1) {
        t=t+6
      }
      let s = Math.abs((t-1)%6);
      console.log("mouseup", s,t,i);
      setTitle(title_arr[s]);
      setSubtitle(subtitle_arr[s]);

      audio.pause();
      setAudio(new Audio(aud_arr[s]));
      // console.log(audio);
      if(stlone == "gdivtwostl1 window-anim") {
        const t = stlone; 
        setstlone(t.split(" ",1)[0]);
      }
      else if(stltwo == "gdivtwostl1 window-anim") {
        const t = stltwo; 
        setstltwo(t.split(" ",1)[0]);
      }
      else if(stlthree == "gdivtwostl1 window-anim") {
        const t = stlthree; 
        setstlthree(t.split(" ",1)[0]);
      }
      setTextdivClass("div-show");
    }    

    const galleryAudioPauseFunc = () => {
        audio.pause();
        // audio.load();
        setVolume(faVolumeMute)
    }

    function toggleFullScreen() {
        if(document.fullscreenElement == null) {
            document.documentElement.requestFullscreen().catch(console.log);
            return;
        }
        if(document.fullscreenElement) {
            document.exitFullscreen()
            .then(() => console.log('hello'))
            .catch((error) => console.log(error));
        }
    }

    function playSound() {
      // console.log(audio.paused,volume)
        if(volume.iconName == 'volume-high' && audio.paused==false) {
            audio.pause();
            // console.log(audio.paused)
            setVolume(faVolumeMute)
        } else if (volume.iconName == 'volume-xmark' && audio.paused) {
            audio.play();
            // console.log(audio.paused)
            setVolume(faVolumeHigh)
        }
    }

    const navigate = useNavigate();

    const handleBackClick = () => {
      galleryAudioPauseFunc();
      navigate("/", {state: {prevRoute: 'gallery'}});
    }


  return (

<div className='gdivone' style={{position: "absolute", top: "0", left: "0"}} >
    <div onClick={handleBackClick}>
            <div className="event-backIcon" style={{zIndex:'15'}}>
                <FontAwesomeIcon icon={faLeftLong} className="fa-2x"></FontAwesomeIcon>
                {/* <FontAwesomeIcon icon={this.state.volume} className="fa-2xs" onClick={this.playSound.bind(this)}></FontAwesomeIcon> */}
            </div>
      </div>
      <div className={`${stlone} comm`} style={{backgroundColor: "black"}}>
        <video autoPlay muted loop id="myVideo" key={ph1} >
          <source src={ph1} type="video/mp4" />
        </video>
      </div>
      <div className={`${stltwo} comm`} style={{backgroundColor: "black"}}>
        <video autoPlay muted loop id="myVideo" key={ph2} >
          <source src={ph2} type="video/mp4" />
        </video>
      </div>
      <div className={`${stlthree} comm`} style={{backgroundColor: "black"}}>
        <video autoPlay muted loop id="myVideo" key={ph3} >
          <source src={ph3} type="video/mp4" />
        </video>
      </div>
      <div id='text-div' className={textdivClass}>
        <span className='title' key={title}>{title}</span>
      </div>
      <div id='overlay-div' onClick={changestlone} onMouseDown={mousedownFunc} onMouseUp={mouseupFunc} ></div>
      <div className='gallery-instruction-div'>Click to enter the portal</div>
      <div className='gallery-sound-icon'>
        <FontAwesomeIcon icon={volume} onClick={playSound} className="fa-2xs"></FontAwesomeIcon>
        <FontAwesomeIcon icon={faExpand} onClick={toggleFullScreen} className="fa-2xs lp1-icon-2"></FontAwesomeIcon>
      </div>
      <Link to={'/photogallery'}>
      {/* <button className='godown gallery-go-btn'>Photo Gallery &darr;</button> */}
      </Link>

      <div className='navmap' style={{zIndex:997}}>
                                <Mapbar  setv = {audio}/>
                    </div>
</div>
   
  )
}