/*
 * Partage d'une fenêtre / d'un onglet de la régie vers l'écran public.
 * WebRTC en boucle locale : la signalisation passe par le BroadcastChannel.
 */
(function () {
  function createSender(bus, { onEnd } = {}) {
    let stream = null, pc = null, session = '';

    async function connect() {
      if (pc) pc.close();
      session = WC.uid('rtc');
      pc = new RTCPeerConnection();
      const my = session;
      stream.getTracks().forEach((t) => pc.addTrack(t, stream));
      pc.onicecandidate = (e) => e.candidate && bus.send('rtc', { session: my, ice: e.candidate.toJSON() });
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      bus.send('rtc', { session: my, offer: pc.localDescription.toJSON() });
    }

    bus.on('event', async (type, data) => {
      if (type === 'rtc' && pc && data.session === session) {
        if (data.answer) await pc.setRemoteDescription(data.answer);
        else if (data.ice && data.from === 'ecran') await pc.addIceCandidate(data.ice).catch(() => {});
      }
      // Un écran public vient (re)d'ouvrir : on relance le partage en cours
      if (type === 'peer' && data.role === 'ecran' && stream) connect();
    });

    return {
      get active() { return !!stream; },
      async start() {
        stream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 30 }, audio: true });
        stream.getVideoTracks()[0].addEventListener('ended', () => this.stop());
        await connect();
        return stream;
      },
      stop() {
        if (stream) stream.getTracks().forEach((t) => t.stop());
        stream = null;
        if (pc) pc.close();
        pc = null;
        bus.send('rtc', { stop: true });
        onEnd && onEnd();
      },
    };
  }

  function createReceiver(bus, onStream) {
    let pc = null, session = '';
    bus.on('event', async (type, data) => {
      if (type !== 'rtc') return;
      if (data.stop) { if (pc) pc.close(); pc = null; onStream(null); return; }
      if (data.offer) {
        if (pc) pc.close();
        session = data.session;
        pc = new RTCPeerConnection();
        const my = session;
        pc.ontrack = (e) => onStream(e.streams[0]);
        pc.onicecandidate = (e) => e.candidate && bus.send('rtc', { session: my, ice: e.candidate.toJSON(), from: 'ecran' });
        await pc.setRemoteDescription(data.offer);
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        bus.send('rtc', { session: my, answer: pc.localDescription.toJSON() });
      } else if (data.ice && data.from !== 'ecran' && pc && data.session === session) {
        await pc.addIceCandidate(data.ice).catch(() => {});
      }
    });
  }

  WC.share = { createSender, createReceiver };
})();
