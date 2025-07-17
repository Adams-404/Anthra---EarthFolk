"use client";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { FastForward, Pause, Play, Rewind, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface NarrationPath {
    narrationPath: string;
}

const ResponsiveNarrationPlayer: React.FC<NarrationPath> = ({ narrationPath }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [volume, setVolume] = useState(1);
    const [speed, setSpeed] = useState(1);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const setAudioData = () => {
            setDuration(audio.duration);
            setCurrentTime(audio.currentTime);
        };

        const setAudioTime = () => setCurrentTime(audio.currentTime);

        audio.addEventListener('loadeddata', setAudioData);
        audio.addEventListener('timeupdate', setAudioTime);

        return () => {
            audio.removeEventListener('loadeddata', setAudioData);
            audio.removeEventListener('timeupdate', setAudioTime);
        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current?.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current?.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (newValue: number[]) => {
        const newVolume = newValue[0];
        setVolume(newVolume);
        if (audioRef.current) audioRef.current.volume = newVolume;
    };

    const handleSpeedChange = (newValue: number[]) => {
        const newSpeed = newValue[0];
        setSpeed(newSpeed);
        if (audioRef.current) audioRef.current.playbackRate = newSpeed;
    };

    const handleSeek = (newValue: number[]) => {
        const newTime = newValue[0];
        setCurrentTime(newTime);
        if (audioRef.current) audioRef.current.currentTime = newTime;
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="w-full max-w-3xl bg-transparent rounded-lg shadow-md p-4 space-y-4">
            <audio ref={audioRef} src={narrationPath} preload="metadata" />

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)} aria-label="Rewind 10 seconds">
                        <Rewind className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"}>
                        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => audioRef.current && (audioRef.current.currentTime += 10)} aria-label="Fast forward 10 seconds">
                        <FastForward className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex items-center space-x-2">
                    <VolumeX className="h-4 w-4" />
                    <Slider
                        value={[volume]}
                        min={0}
                        max={1}
                        step={0.1}
                        onValueChange={handleVolumeChange}
                        className="w-20"
                        aria-label="Volume"
                    />
                    <Volume2 className="h-4 w-4" />
                </div>

                <div className="flex items-center space-x-2">
                    <span className="text-sm">Speed:</span>
                    <Slider
                        value={[speed]}
                        min={0.5}
                        max={2}
                        step={0.1}
                        onValueChange={handleSpeedChange}
                        className="w-20"
                        aria-label="Playback speed"
                    />
                    <span className="text-sm w-8">{speed.toFixed(1)}x</span>
                </div>
            </div>

            <div className="w-full">
                <Slider
                    value={[currentTime]}
                    min={0}
                    max={duration}
                    step={1}
                    onValueChange={handleSeek}
                    aria-label="Seek"
                />
                <div className="flex justify-between text-sm text-muted-foreground mt-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveNarrationPlayer;