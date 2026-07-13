import { useEffect, useRef, useState } from "react";
import AgoraRTC, {
  type IAgoraRTCClient,
  type IAgoraRTCRemoteUser,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { Mic, MicOff, Video, VideoOff, PhoneOff, MessageCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Agora App ID is a publishable identifier — safe to ship in client code.
const AGORA_APP_ID =
  (import.meta.env.VITE_AGORA_APP_ID as string | undefined) ?? "3fe7bc4b941a4536966abad4225be802";

type Props = {
  channel: string;
  doctorName: string;
  doctorSpecialty: string;
  onEnd: () => void;
  recipientPhone?: string;
  shareUrl?: string;
};

export function AgoraVideoCall({ channel, doctorName, doctorSpecialty, onEnd, recipientPhone, shareUrl }: Props) {
  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const localVideoRef = useRef<HTMLDivElement>(null);
  const remoteVideoRef = useRef<HTMLDivElement>(null);
  const tracksRef = useRef<{ audio?: IMicrophoneAudioTrack; video?: ICameraVideoTrack }>({});

  const [muted, setMuted] = useState(false);
  const [camOff, setCamOff] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [joined, setJoined] = useState(false);
  const [remoteUser, setRemoteUser] = useState<IAgoraRTCRemoteUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Timer
  useEffect(() => {
    if (!joined) return;
    const i = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(i);
  }, [joined]);

  // Join channel
  useEffect(() => {
    let cancelled = false;

    if (!AGORA_APP_ID) {
      setError("Agora App ID is not configured. Add VITE_AGORA_APP_ID to enable video calls.");
      return;
    }

    const client = AgoraRTC.createClient({ mode: "rtc", codec: "vp8" });
    clientRef.current = client;

    client.on("user-published", async (user, mediaType) => {
      await client.subscribe(user, mediaType);
      if (mediaType === "video" && remoteVideoRef.current) {
        user.videoTrack?.play(remoteVideoRef.current);
      }
      if (mediaType === "audio") {
        user.audioTrack?.play();
      }
      setRemoteUser(user);
    });

    client.on("user-unpublished", (user) => {
      if (user.uid === remoteUser?.uid) setRemoteUser(null);
    });

    client.on("user-left", () => setRemoteUser(null));

    (async () => {
      try {
        await client.join(AGORA_APP_ID, channel, null, null);
        const [audioTrack, videoTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
        if (cancelled) {
          audioTrack.close();
          videoTrack.close();
          await client.leave();
          return;
        }
        tracksRef.current = { audio: audioTrack, video: videoTrack };
        if (localVideoRef.current) videoTrack.play(localVideoRef.current);
        await client.publish([audioTrack, videoTrack]);
        setJoined(true);
      } catch (e) {
        if (cancelled) return;
        const msg = e instanceof Error ? e.message : "Failed to join call";
        if (msg.includes("OPERATION_ABORTED") || msg.includes("cancel token canceled")) return;
        setError(msg);
        toast.error("Could not start call: " + msg);
      }
    })();

    return () => {
      cancelled = true;
      tracksRef.current.audio?.close();
      tracksRef.current.video?.close();
      client.leave().catch(() => {});
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  useEffect(() => {
    tracksRef.current.audio?.setMuted(muted);
  }, [muted]);
  useEffect(() => {
    tracksRef.current.video?.setMuted(camOff);
  }, [camOff]);

  const handleEnd = async () => {
    tracksRef.current.audio?.close();
    tracksRef.current.video?.close();
    await clientRef.current?.leave().catch(() => {});
    onEnd();
  };

  const handleShare = () => {
    const link = shareUrl ?? (typeof window !== "undefined" ? `${window.location.origin}/join-call?channel=${encodeURIComponent(channel)}` : channel);
    const message = `Join the video consultation: ${link}\nChannel: ${channel}`;
    const phone = recipientPhone?.replace(/\D/g, "");
    if (phone) {
      navigator.clipboard?.writeText(message).catch(() => {});
      toast.success("Call link copied. Send it to the phone number on WhatsApp.");
      return;
    }
    navigator.clipboard?.writeText(message).catch(() => {});
    toast.success("Call link copied");
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="rounded-2xl overflow-hidden bg-navy text-primary-foreground shadow-[var(--shadow-glow)]">
      <div className="relative aspect-video bg-gradient-to-br from-navy to-[oklch(0.32_0.08_240)]">
        {/* Remote video (doctor) */}
        <div ref={remoteVideoRef} className="absolute inset-0" />

        {/* Placeholder when remote not joined */}
        {!remoteUser && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <div className="size-28 mx-auto rounded-full bg-[var(--gradient-mint)] grid place-items-center text-navy font-display font-bold text-4xl">
                {doctorName.split(" ").slice(-1)[0].charAt(0)}
              </div>
              <div className="mt-4 font-display font-semibold">{doctorName}</div>
              <div className="text-xs text-white/60">{doctorSpecialty}</div>
              <div className="mt-3 inline-flex items-center gap-2 text-xs text-white/70">
                {error ? (
                  <span className="text-destructive">{error}</span>
                ) : joined ? (
                  <>
                    <Loader2 className="size-3 animate-spin" /> Waiting for doctor to join…
                  </>
                ) : (
                  <>
                    <Loader2 className="size-3 animate-spin" /> Connecting…
                  </>
                )}
              </div>
              <div className="mt-2 text-[10px] text-white/40 font-mono">channel: {channel}</div>
            </div>
          </div>
        )}

        {/* Call timer */}
        {joined && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/40 rounded-full px-3 py-1">
            <span className="size-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs font-mono">{mm}:{ss}</span>
          </div>
        )}

        {/* Self preview */}
        <div className="absolute bottom-4 right-4 w-32 sm:w-40 aspect-video rounded-lg overflow-hidden border-2 border-white/20 bg-black grid place-items-center">
          {camOff ? (
            <div className="text-xs text-white/60">Camera off</div>
          ) : (
            <div ref={localVideoRef} className="w-full h-full" />
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-center gap-3 bg-black/20">
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full size-12 border-white/20 ${muted ? "bg-destructive text-destructive-foreground border-destructive" : "bg-white/10 text-white hover:bg-white/20"}`}
          onClick={() => setMuted((m) => !m)}
          aria-label="Toggle mic"
          disabled={!joined}
        >
          {muted ? <MicOff className="size-5" /> : <Mic className="size-5" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className={`rounded-full size-12 border-white/20 ${camOff ? "bg-destructive text-destructive-foreground border-destructive" : "bg-white/10 text-white hover:bg-white/20"}`}
          onClick={() => setCamOff((c) => !c)}
          aria-label="Toggle camera"
          disabled={!joined}
        >
          {camOff ? <VideoOff className="size-5" /> : <Video className="size-5" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full size-12 border-white/20 bg-white/10 text-white hover:bg-white/20"
          onClick={handleShare}
          aria-label="Share channel"
        >
          <MessageCircle className="size-5" />
        </Button>
        <Button variant="destructive" size="icon" className="rounded-full size-12" onClick={handleEnd} aria-label="End call">
          <PhoneOff className="size-5" />
        </Button>
      </div>
    </div>
  );
}
