// Practical 4: Camera and Image Picker
// Take photo with camera or choose one from gallery and display at 250x250
import React, { useState, useRef, useEffect } from 'react';
import { Camera, Image as ImageIcon, X, Video, RefreshCw, Sparkles, Check, AlertTriangle } from 'lucide-react';

const SAMPLE_GALLERY = [
  {
    name: 'College Campus',
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Computer Lab',
    url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=80'
  },
  {
    name: 'Study Books',
    url: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=500&auto=format&fit=crop&q=80'
  }
];

export default function Practical4Camera({ onToast }) {
  const [image, setImage] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [permissionGranted, setPermissionGranted] = useState(true);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Gallery: Launch image library
  const pickImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
        if (onToast) onToast('Image selected from gallery!', 'success');
      };
      reader.readAsDataURL(file);
    }
  };

  // Camera: Request camera permission and launch camera
  const takePhoto = async () => {
    setCameraError(null);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera API is not supported in this browser environment');
      }
      setIsCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 640 }, height: { ideal: 640 }, facingMode: 'user' },
        audio: false
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPermissionGranted(true);
    } catch (err) {
      console.warn('Camera permission or device error:', err);
      setCameraError(err.message || 'Camera permission required');
      setIsCameraActive(false);
      if (onToast) onToast('Camera permission denied or camera unavailable', 'error');
    }
  };

  const captureSnapshot = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = 300;
    canvas.height = 300;
    const ctx = canvas.getContext('2d');

    // Draw centered square crop
    const size = Math.min(video.videoWidth, video.videoHeight);
    const startX = (video.videoWidth - size) / 2;
    const startY = (video.videoHeight - size) / 2;

    ctx.drawImage(video, startX, startY, size, size, 0, 0, 300, 300);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setImage(dataUrl);
    stopCamera();
    if (onToast) onToast('Photo captured successfully!', 'success');
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="rn-mobile-screen">
      <div className="rn-header-area">
        <div className="rn-badge">Practical 4</div>
        <h2 className="rn-heading">Camera & Image Picker</h2>
        <p className="rn-subheading">expo-image-picker Integration</p>
      </div>

      {/* Hidden file input for file picker */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        style={{ display: 'none' }}
      />

      {/* Two Action Buttons: Choose from Gallery & Take a Photo */}
      <div className="rn-button-stack">
        <button
          type="button"
          className="rn-button rn-button-primary"
          onClick={pickImage}
        >
          <ImageIcon size={18} />
          <span>Choose from Gallery</span>
        </button>

        <button
          type="button"
          className="rn-button rn-button-secondary"
          onClick={takePhoto}
        >
          <Camera size={18} />
          <span>Take a Photo</span>
        </button>
      </div>

      {/* Camera Live Viewfinder when Active */}
      {isCameraActive && (
        <div className="rn-camera-viewfinder-modal">
          <div className="rn-camera-preview-box">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="rn-camera-video"
            />
            <div className="rn-viewfinder-overlay">
              <div className="viewfinder-crosshair"></div>
            </div>
          </div>
          <div className="rn-camera-controls">
            <button
              type="button"
              className="rn-button rn-button-primary rn-shutter-btn"
              onClick={captureSnapshot}
            >
              <div className="shutter-inner"></div>
              <span>Capture Photo</span>
            </button>
            <button
              type="button"
              className="rn-button rn-button-ghost"
              onClick={stopCamera}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Camera Error / Permission Notice */}
      {cameraError && (
        <div className="rn-message-box error">
          <AlertTriangle size={18} />
          <span>{cameraError} (Ensure browser camera permissions are allowed)</span>
        </div>
      )}

      {/* Sample Gallery Presets */}
      <div className="rn-sample-gallery">
        <span className="gallery-label">Or choose sample image:</span>
        <div className="gallery-thumbnails">
          {SAMPLE_GALLERY.map((sample, idx) => (
            <button
              key={idx}
              type="button"
              className="sample-thumb-btn"
              onClick={() => {
                setImage(sample.url);
                if (onToast) onToast(`Loaded ${sample.name}`, 'info');
              }}
            >
              <img src={sample.url} alt={sample.name} />
              <span>{sample.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Image Preview: Exactly 250 x 250 as required in Practical 4 algorithm */}
      {image ? (
        <div className="rn-image-container">
          <span className="rn-preview-label">Image Preview (250 × 250):</span>
          <div className="rn-image-frame" style={{ width: 250, height: 250 }}>
            <img
              src={image}
              alt="Chosen or Captured"
              style={{ width: 250, height: 250, objectFit: 'cover' }}
            />
            <button
              type="button"
              className="rn-remove-photo-btn"
              onClick={() => setImage(null)}
              title="Remove photo"
            >
              <X size={16} />
            </button>
          </div>
          <p className="rn-image-caption">Photo rendered with React Native Image component</p>
        </div>
      ) : (
        <div className="rn-image-placeholder-box">
          <ImageIcon size={44} className="placeholder-icon" />
          <p>No photo chosen yet</p>
          <small>Click "Choose from Gallery" or "Take a Photo" to test</small>
        </div>
      )}
    </div>
  );
}
