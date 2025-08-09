"use client";

import React, { useState, useRef, useEffect } from 'react';
import { CheckCircle, Eye, Play, Pause, VolumeX, Volume2, RotateCcw, Maximize } from 'lucide-react';

type VideoId = 'video1' | 'video2';

export default function MeetTeachersSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<VideoId | null>(null);
  const [playingVideo, setPlayingVideo] = useState<VideoId | null>(null);
  const [mutedStates, setMutedStates] = useState<Record<VideoId, boolean>>({ 
    video1: true, 
    video2: true 
  });
  const [progress, setProgress] = useState<Record<VideoId, number>>({ 
    video1: 0, 
    video2: 0 
  });

  const videoRefs = {
    video1: useRef<HTMLVideoElement>(null),
    video2: useRef<HTMLVideoElement>(null),
  };

  const videos = [
    {
      id: 'video1' as VideoId,
      src: '/tab1.mp4',
      title: 'Approche Pédagogique Innovante',
      description: 'Découvrez nos méthodes d\'enseignement modernes et interactives qui transforment l\'apprentissage en une expérience engageante.',
      category: 'Pédagogie',
      duration: '2:45',
      views: '1.2k',
    },
    {
      id: 'video2' as VideoId,
      src: '/tab2.mp4',
      title: 'Excellence Académique',
      description: 'Plongez dans l\'univers de nos programmes académiques d\'excellence qui préparent nos étudiants aux défis de demain.',
      category: 'Excellence',
      duration: '3:20',
      views: '2.8k',
    },
  ];

  const togglePlay = (videoId: VideoId) => {
    const video = videoRefs[videoId].current;
    if (video) {
      if (video.paused) {
        Object.keys(videoRefs).forEach((id) => {
          if (id !== videoId && videoRefs[id as VideoId].current) {
            videoRefs[id as VideoId].current?.pause();
          }
        });
        video.play().catch((error) => console.error('Video play failed:', error));
        setPlayingVideo(videoId);
      } else {
        video.pause();
        setPlayingVideo(null);
      }
    }
  };

  const toggleMute = (videoId: VideoId) => {
    const video = videoRefs[videoId].current;
    if (video) {
      video.muted = !video.muted;
      setMutedStates((prev) => ({
        ...prev,
        [videoId]: video.muted,
      }));
    }
  };

  const resetVideo = (videoId: VideoId) => {
    const video = videoRefs[videoId].current;
    if (video) {
      video.currentTime = 0;
      setProgress((prev) => ({ ...prev, [videoId]: 0 }));
    }
  };

  const toggleFullscreen = (videoId: VideoId) => {
    const video = videoRefs[videoId].current;
    if (video) {
      if (!document.fullscreenElement) {
        video.requestFullscreen().catch((error) => console.error('Fullscreen failed:', error));
      } else {
        document.exitFullscreen();
      }
    }
  };

  useEffect(() => {
    const updateProgress = (videoId: VideoId) => {
      const video = videoRefs[videoId].current;
      if (video && video.duration) {
        const progressPercent = (video.currentTime / video.duration) * 100;
        setProgress((prev) => ({ ...prev, [videoId]: progressPercent }));
      }
    };

    const handleError = (videoId: VideoId) => {
      console.error(`Failed to load video: ${videoId}`);
    };

    const cleanup = Object.keys(videoRefs).map((videoId) => {
      const video = videoRefs[videoId as VideoId].current;
      if (video) {
        const handleTimeUpdate = () => updateProgress(videoId as VideoId);
        const handleEnded = () => setPlayingVideo(null);
        const handleErrorEvent = () => handleError(videoId as VideoId);

        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('ended', handleEnded);
        video.addEventListener('error', handleErrorEvent);

        return () => {
          video.removeEventListener('timeupdate', handleTimeUpdate);
          video.removeEventListener('ended', handleEnded);
          video.removeEventListener('error', handleErrorEvent);
        };
      }
      return () => {};
    });

    return () => cleanup.forEach((fn) => fn());
  }, []);

  const teachers = [
    {
      id: 1,
      name: 'Angela T. Hall',
      subject: 'Science & Mathematics',
      image: '/exp1.jpg',
      bgColor: 'bg-gray-200',
      verified: true,
    },
    {
      id: 2,
      name: 'Frank A. Mirand',
      subject: 'Science & Literature',
      image: '/exp2.jpg',
      bgColor: 'bg-orange-100',
      verified: true,
    },
    {
      id: 3,
      name: 'Edward D. Sanchez',
      subject: 'Art & Literature',
      image: '/exp3.jpg',
      bgColor: 'bg-gray-700',
      verified: true,
    },
    {
      id: 4,
      name: 'Kristen A. Pugh',
      subject: 'Science & Literature',
      image: '/exp4.jpg',
      bgColor: 'bg-orange-300',
      verified: true,
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div
          className="text-center mb-12"
          style={{
            animation: 'fadeInUp 0.8s ease-out',
          }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4 relative">
            Meet With Our{' '}
            <span className="text-orange-500 relative inline-block">
              Teachers
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 transform scale-x-0 animate-pulse group-hover:scale-x-100 transition-transform duration-500"></div>
            </span>
          </h2>
          <p
            className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed"
            style={{
              animation: 'fadeInUp 0.8s ease-out 0.2s both',
            }}
          >
            Our experienced educators are committed to providing you with quality education. Get to know working with our team.
          </p>
        </div>

        {/* Video Section */}
        <div
          className="mt-20 mb-16"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.6s both',
          }}
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              Découvrez Notre{' '}
              <span className="text-orange-500 relative inline-block">
                Excellence
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full"></div>
              </span>
            </h3>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explorez nos vidéos pour comprendre notre approche pédagogique unique
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="group relative"
                style={{
                  animation: `slideInUp 0.6s ease-out ${0.8 + index * 0.2}s both`,
                }}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
              >
                {/* Video Container */}
                <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl group-hover:shadow-3xl transition-all duration-500 transform group-hover:-translate-y-2">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>

                  {/* Video Element */}
                  <div className="relative aspect-video">
                    <video
                      ref={videoRefs[video.id]}
                      className="w-full h-full object-cover"
                      muted={mutedStates[video.id]}
                      playsInline
                      preload="metadata"
                    >
                      <source src={video.src} type="video/mp4" />
                      Votre navigateur ne supporte pas la lecture vidéo.
                    </video>

                    {/* Video Overlay */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 transition-opacity duration-300 ${
                        hoveredVideo === video.id || playingVideo !== video.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      {/* Top Info Bar */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full">
                            {video.category}
                          </span>
                          <div className="flex items-center text-white/80 text-xs">
                            <Eye className="w-3 h-3 mr-1" />
                            {video.views}
                          </div>
                        </div>
                        <span className="text-white/80 text-xs bg-black/40 px-2 py-1 rounded">
                          {video.duration}
                        </span>
                      </div>

                      {/* Center Play Button */}
                      {playingVideo !== video.id && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <button
                            onClick={() => togglePlay(video.id)}
                            className="w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-900 transform transition-all duration-300 hover:scale-110 hover:bg-white group/play"
                            aria-label="Play video"
                          >
                            <Play className="w-8 h-8 ml-1 group-hover/play:scale-110 transition-transform duration-200" />
                          </button>
                        </div>
                      )}

                      {/* Bottom Controls */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        {/* Progress Bar */}
                        <div className="mb-3">
                          <div className="w-full bg-white/20 rounded-full h-1">
                            <div
                              className="bg-gradient-to-r from-orange-500 to-pink-500 h-1 rounded-full transition-all duration-300"
                              style={{ width: `${progress[video.id] || 0}%` }}
                            ></div>
                          </div>
                        </div>

                        {/* Control Buttons */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => togglePlay(video.id)}
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                              aria-label={playingVideo === video.id ? 'Pause video' : 'Play video'}
                            >
                              {playingVideo === video.id ? (
                                <Pause className="w-4 h-4" />
                              ) : (
                                <Play className="w-4 h-4 ml-0.5" />
                              )}
                            </button>

                            <button
                              onClick={() => toggleMute(video.id)}
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                              aria-label={mutedStates[video.id] ? 'Unmute video' : 'Mute video'}
                            >
                              {mutedStates[video.id] ? (
                                <VolumeX className="w-4 h-4" />
                              ) : (
                                <Volume2 className="w-4 h-4" />
                              )}
                            </button>

                            <button
                              onClick={() => resetVideo(video.id)}
                              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                              aria-label="Reset video"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          </div>

                          <button
                            onClick={() => toggleFullscreen(video.id)}
                            className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
                            aria-label="Toggle fullscreen"
                          >
                            <Maximize className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Floating Particles */}
                    {hoveredVideo === video.id && (
                      <>
                        <div className="absolute top-6 right-8 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                        <div className="absolute top-12 right-16 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-300"></div>
                        <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping delay-700"></div>
                      </>
                    )}
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-6 text-center lg:text-left">
                  <h4
                    className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      hoveredVideo === video.id ? 'text-orange-600' : 'text-gray-900'
                    }`}
                  >
                    {video.title}
                  </h4>
                  <p className="text-gray-600 leading-relaxed">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <div
              key={teacher.id}
              className="group cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
              style={{
                animation: `slideInUp 0.6s ease-out ${index * 0.15}s both`,
              }}
              onMouseEnter={() => setHoveredCard(teacher.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Teacher Card */}
              <div className="relative">
                {/* Glow Effect */}
                <div
                  className={`absolute -inset-2 bg-gradient-to-r from-orange-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500`}
                ></div>

                {/* Image Container */}
                <div
                  className={`relative ${teacher.bgColor} p-6 mb-4 transition-all duration-500 group-hover:shadow-2xl`}
                  style={{
                    borderRadius: '1rem 1rem 1rem 0rem',
                  }}
                >
                  {/* Floating animation dots */}
                  {hoveredCard === teacher.id && (
                    <>
                      <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                      <div className="absolute top-4 right-6 w-1 h-1 bg-orange-300 rounded-full animate-ping delay-300"></div>
                      <div className="absolute top-6 right-4 w-1.5 h-1.5 bg-orange-500 rounded-full animate-ping delay-700"></div>
                    </>
                  )}

                  <div className="aspect-square relative overflow-hidden rounded-xl group-hover:rounded-2xl transition-all duration-500">
                    <img
                      src={teacher.image}
                      alt={`Portrait of ${teacher.name}`}
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        hoveredCard === teacher.id ? 'scale-110 brightness-110' : 'scale-100'
                      }`}
                    />

                    {/* Overlay Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent transition-opacity duration-500 ${
                        hoveredCard === teacher.id ? 'opacity-100' : 'opacity-0'
                      }`}
                    ></div>

                    {/* Shimmer effect on hover */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-transform duration-1000 ${
                        hoveredCard === teacher.id ? 'translate-x-full' : '-translate-x-full'
                      }`}
                    ></div>
                  </div>
                </div>

                {/* Teacher Info */}
                <div className="text-center transform transition-all duration-300 group-hover:translate-y-1">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3
                      className={`text-lg font-semibold transition-colors duration-300 ${
                        hoveredCard === teacher.id ? 'text-orange-600' : 'text-gray-900'
                      }`}
                    >
                      {teacher.name}
                    </h3>
                    {teacher.verified && (
                      <CheckCircle
                        className={`w-5 h-5 text-green-500 fill-current transition-all duration-300 ${
                          hoveredCard === teacher.id ? 'scale-110 rotate-12' : 'scale-100'
                        }`}
                        aria-label="Verified teacher"
                      />
                    )}
                  </div>
                  <p
                    className={`text-sm transition-colors duration-300 ${
                      hoveredCard === teacher.id ? 'text-gray-700 font-medium' : 'text-gray-600'
                    }`}
                  >
                    {teacher.subject}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </section>
  );
}