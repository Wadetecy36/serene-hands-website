import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, RotateCcw, Check } from "lucide-react";

type Props = {
  onCapture: (file: File) => void;
  captured: File | null;
};

/**
 * Live front-camera capture for the guardian's selfie. A live capture
 * (rather than a plain file upload) matters here — it's meaningfully
 * harder to submit an old or borrowed photo when the shot has to be
 * taken in the moment. Falls back to a native file input (with the
 * mobile "capture" attribute, which still opens the camera app on most
 * phones) if getUserMedia isn't available or permission is denied —
 * this device/browser can still complete the flow.
 */
export default function CameraCapture({ onCapture, captured }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<"idle" | "starting" | "live" | "unavailable">("idle");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const startCamera = useCallback(async () => {
    setStatus("starting");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setStatus("live");
    } catch {
      setStatus("unavailable");
    }
  }, []);

  useEffect(() => {
    if (!captured) startCamera();
    return () => stopStream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(video, 0, 0);
    canvas.toBlob(
      (blob) => {
        if (!blob) return;
        const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
        setPreviewUrl(URL.createObjectURL(blob));
        onCapture(file);
        stopStream();
      },
      "image/jpeg",
      0.9,
    );
  };

  const retake = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setPreviewUrl(null);
    onCapture(null as unknown as File);
    startCamera();
  };

  const handleFallbackFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onCapture(file);
    }
  };

  if (captured && previewUrl) {
    return (
      <div className="overflow-hidden rounded-xl border border-blush-deep bg-cream">
        <img src={previewUrl} alt="Captured selfie preview" className="aspect-[4/3] w-full object-cover" />
        <button
          type="button"
          onClick={retake}
          className="flex w-full items-center justify-center gap-2 border-t border-blush-deep bg-cloud py-2.5 text-sm font-semibold text-rose hover:bg-blush"
        >
          <RotateCcw size={16} aria-hidden="true" />
          Retake photo
        </button>
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="rounded-xl border border-dashed border-blush-deep bg-cream p-4 text-center">
        <p className="text-sm text-ink-soft">
          We couldn't access your camera. You can still upload a selfie below.
        </p>
        <label className="mt-3 inline-flex cursor-pointer items-center gap-2 rounded-full bg-rose px-5 py-2.5 text-sm font-semibold text-cloud hover:bg-rose-deep">
          <Camera size={16} aria-hidden="true" />
          Take or upload a photo
          <input
            type="file"
            accept="image/*"
            capture="user"
            onChange={handleFallbackFile}
            className="sr-only"
          />
        </label>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-blush-deep bg-ink">
      <video
        ref={videoRef}
        muted
        playsInline
        aria-label="Live camera preview for selfie capture"
        className="aspect-[4/3] w-full scale-x-[-1] object-cover"
      />
      <button
        type="button"
        onClick={capturePhoto}
        disabled={status !== "live"}
        className="flex w-full items-center justify-center gap-2 border-t border-blush-deep bg-cloud py-2.5 text-sm font-semibold text-rose transition-colors hover:bg-blush disabled:opacity-50"
      >
        <Check size={16} aria-hidden="true" />
        {status === "starting" ? "Starting camera…" : "Capture photo"}
      </button>
    </div>
  );
}
