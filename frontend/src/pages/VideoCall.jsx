import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';

const ICE_SERVERS = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
  ]
};

export default function VideoCall() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  
  const [stream, setStream] = useState(null);
  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [remoteSocketId, setRemoteSocketId] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Connect to Socket
    socketRef.current = io('http://localhost:5000');
    
    // Get Local Media
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream);
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = currentStream;
        }

        socketRef.current.emit('join-room', roomId, user.id);
      })
      .catch((err) => console.error("Failed to get local stream", err));

    // Socket Event Handlers
    socketRef.current.on('user-connected', (userId) => {
      // Create offer when another user connects
      setRemoteSocketId(userId);
      createOffer(userId);
    });

    socketRef.current.on('offer', handleReceiveOffer);
    socketRef.current.on('answer', handleReceiveAnswer);
    socketRef.current.on('ice-candidate', handleNewICECandidateMsg);
    
    socketRef.current.on('user-disconnected', () => {
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      if (peerRef.current) peerRef.current.close();
    });

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (socketRef.current) socketRef.current.disconnect();
      if (peerRef.current) peerRef.current.close();
    };
  }, [roomId]);

  const createPeer = () => {
    const peer = new RTCPeerConnection(ICE_SERVERS);
    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    
    if (stream) {
      stream.getTracks().forEach(track => peer.addTrack(track, stream));
    }
    
    return peer;
  };

  const createOffer = (target) => {
    const peer = createPeer();
    peerRef.current = peer;

    peer.createOffer().then(offer => {
      return peer.setLocalDescription(offer);
    }).then(() => {
      socketRef.current.emit('offer', { target, caller: socketRef.current.id, sdp: peer.localDescription });
    }).catch(e => console.error(e));
  };

  const handleReceiveOffer = async (incoming) => {
    setRemoteSocketId(incoming.caller);
    const peer = createPeer();
    peerRef.current = peer;
    const desc = new RTCSessionDescription(incoming.sdp);
    
    peer.setRemoteDescription(desc).then(() => {
      return peer.createAnswer();
    }).then(answer => {
      return peer.setLocalDescription(answer);
    }).then(() => {
      socketRef.current.emit('answer', { target: incoming.caller, caller: socketRef.current.id, sdp: peer.localDescription });
    }).catch(e => console.error(e));
  };

  const handleReceiveAnswer = (incoming) => {
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current.setRemoteDescription(desc).catch(e => console.error(e));
  };

  const handleICECandidateEvent = (e) => {
    if (e.candidate && remoteSocketId) {
      socketRef.current.emit('ice-candidate', { target: remoteSocketId, candidate: e.candidate });
    }
  };

  const handleNewICECandidateMsg = (incoming) => {
    const candidate = new RTCIceCandidate(incoming);
    peerRef.current?.addIceCandidate(candidate).catch(e => console.error(e));
  };

  const handleTrackEvent = (e) => {
    if (remoteVideoRef.current) {
      remoteVideoRef.current.srcObject = e.streams[0];
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks()[0].enabled = !micOn;
      setMicOn(!micOn);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks()[0].enabled = !videoOn;
      setVideoOn(!videoOn);
    }
  };

  const endCall = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-900 text-white p-6 relative">
      <div className="max-w-6xl mx-auto h-full flex flex-col pt-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">VetReach Consultation <span className="text-sm font-normal text-slate-400">| Room: {roomId}</span></h2>
        
        <div className="flex-1 grid md:grid-cols-2 gap-6 relative">
          
          <div className="bg-slate-800 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-700/50 flex flex-col h-[60vh] md:h-auto">
             {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
             <video playsInline autoPlay ref={remoteVideoRef} className="w-full h-full object-cover" />
             <div className="absolute bottom-4 left-4 bg-black/50 px-3 py-1.5 rounded-lg backdrop-blur-sm shadow-sm text-sm font-medium">
               Client / Vet
             </div>
          </div>

          <div className="bg-slate-800 rounded-3xl overflow-hidden relative shadow-2xl border border-slate-700/50 flex flex-col h-[60vh] md:h-auto md:absolute md:w-64 md:h-48 md:bottom-8 md:right-8 z-10 hover:scale-105 transition-transform duration-300">
             <video playsInline muted autoPlay ref={localVideoRef} className="w-full h-full object-cover" />
             <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md backdrop-blur-sm text-xs font-semibold">
               You
             </div>
          </div>
        </div>

        {/* Controls */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4 bg-slate-800/80 backdrop-blur-md px-8 py-4 rounded-full border border-slate-700/50 shadow-2xl mt-8">
          <button onClick={toggleMic} className={`p-4 rounded-full transition-all ${micOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'}`}>
            {micOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>
          <button onClick={endCall} className="p-5 rounded-full bg-red-500 hover:bg-red-600 transition-all hover:scale-110 shadow-lg shadow-red-500/20">
            <PhoneOff size={24} />
          </button>
          <button onClick={toggleVideo} className={`p-4 rounded-full transition-all ${videoOn ? 'bg-slate-700 hover:bg-slate-600' : 'bg-red-500 hover:bg-red-600'}`}>
            {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
}
