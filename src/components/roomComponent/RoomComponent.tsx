import config from "../../config"
import { useEffect } from "react"
import conferenceMaster from "../../conference/conferenceMaster";
import getRandomText from "../../plugins/getRandomText";

function RoomComponent() {
  function startWebRTC() {
    conferenceMaster.peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: [ config.peerServer ] }
      ]
    })

    const peerConnection = conferenceMaster.peerConnection
    peerConnection.onicecandidate = (event: any) => {
      if (event.candidate) {
        console.log(event);
        const candidateJsonB64 = btoa(JSON.stringify({ "candidate": event.candidate }))
        conferenceMaster.doSignalingCandidate(candidateJsonB64)
      } else {
        console.log("onicecandidate event: event.candidate = null!!!  isInit = (doesn't matter for now)")
      }
    }

    peerConnection.ontrack = (event: any) => {
      console.log(event, 'track');
    }

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream: MediaStream) => {
      stream.getTracks().forEach((track: MediaStreamTrack) => {
        conferenceMaster.peerConnection.addTrack(track)
      });
      peerConnection.createOffer().then((offer: RTCOfferOptions) => {
        peerConnection.setLocalDescription(offer)
      })
    })
  }

  useEffect(() => {
    const { Strophe } = window.global
    //@ts-ignore
    history.replaceState({}, '', conferenceMaster.roomName)
    conferenceMaster.initConference.then((connect) => {
      console.log(conferenceMaster);
      const callback = function (status: number) {
        const userId = getRandomText(5)
        conferenceMaster.id = userId
        // @ts-ignore
        if (status === Strophe.Status.REGISTER) {
          // fill out the fields
          connect.register.fields.username = userId;
          connect.register.fields.password = getRandomText(9);
          // calling submit will continue the registration process
          connect.register.submit();
        } else { // @ts-ignore
          if (status === Strophe.Status.REGISTERED) {
            console.log("registered!");
            // calling login will authenticate the registered JID.
            connect.authenticate();
          } else { // @ts-ignore
            if (status === Strophe.Status.CONFLICT) {
              console.log("Contact already existed!");
            } else { // @ts-ignore
              if (status === Strophe.Status.NOTACCEPTABLE) {
                console.log("Registration form not properly filled out.")
              } else { // @ts-ignore
                if (status === Strophe.Status.REGIFAIL) {
                  console.log("The Server does not support In-Band Registration")
                } else if (status === Strophe.Status.CONNECTED) {
                  conferenceMaster.jid = connect.jid
                  conferenceMaster.addHandlers(connect)
                  conferenceMaster.conference = connect
                  conferenceMaster.roomOn()
                  console.info('connect')
                } else {
                  // Do other stuff
                }
              }
            }
          }
        }
      };
      connect.register.connect("prosolen.net", callback);
    })
  }, [])
  return (
    <div>RoomComponent</div>
  )
}

export default RoomComponent
