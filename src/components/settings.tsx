"use client";

import * as Slider from "@radix-ui/react-slider";
import { AnimatePresence, motion } from "framer-motion";
import { Settings, Volume2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const teamMembers = [
    {
        name: "Alpha Romer Coma",
        position: "Software Developer",
        image: "/credits/coma.jpg",
        linkedin: "https://www.linkedin.com/in/alpharomercoma",
    },
    {
        name: "Rab Karl Colasino",
        position: "Designer, Animations",
        image: "/credits/colasino.jpg",
        linkedin: "https://www.linkedin.com/in/mr-colasino/",
    },
    {
        name: "Aron Joash Pasamante",
        position: "Researcher, Story Writer",
        image: "/credits/pasamante.png",
        linkedin: "https://www.linkedin.com/in/aron-joash-pasamante-337190330/",
    },
    {
        name: "Jommel Rowin Sabater",
        position: "Data Analyst",
        image: "/credits/sabater.jpg",
        linkedin: "https://www.linkedin.com/in/jomszxc/",
    },
    {
        name: "Marc Olata",
        position: "Documentation Specialist",
        image: "/credits/olata.jpg",
        linkedin: "https://www.facebook.com/profile.php?id=100087194946054",
    },
    {
        name: "Abraham Magpantay",
        position: "Adviser",
        image: "/credits/magpantay.jpg",
        linkedin: "https://www.linkedin.com/in/aber-magpantay/",
    },

];

import { ISound, IVolume } from "./discover";

const SettingsComponent: React.FC<ISound & IVolume> = ({ setSoundEnabled, soundEnabled, volume, setVolume }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [showCredits, setShowCredits] = useState(false);

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume / 100;
        }
    }, [volume]);

    useEffect(() => {
        if (audioRef.current) {
            if (soundEnabled) {
                audioRef.current.play().catch(error => console.error("Audio playback failed:", error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [soundEnabled]);

    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setShowCredits(false);
            }
        };

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const handleVolumeChange = (newValue: number[]) => {
        setVolume(newValue[0]);
        if (audioRef.current) {
            audioRef.current.volume = newValue[0] / 100;
        }
    };

    const toggleSound = (enabled: boolean) => {
        setSoundEnabled(enabled);
    };

    return (
        <>
            <div className="absolute top-4 right-4 flex items-center space-x-2 z-50">
                <Button variant="outline" onClick={() => setShowCredits(true)}>
                    Credits
                </Button>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon">
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Open settings</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <DropdownMenuLabel>Settings</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <div className="p-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="sound-toggle" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        Enable Sound
                                    </Label>
                                    <Switch
                                        id="sound-toggle"
                                        checked={soundEnabled}
                                        onCheckedChange={toggleSound}
                                    />
                                </div>
                                {soundEnabled && (
                                    <div className="mt-4">
                                        <Label htmlFor="volume-slider" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            Volume
                                        </Label>
                                        <div className="flex items-center mt-2">
                                            <Volume2 className="w-4 h-4 mr-2" />
                                            <Slider.Root
                                                className="relative flex items-center select-none touch-none w-full h-5"
                                                value={[volume]}
                                                onValueChange={handleVolumeChange}
                                                max={100}
                                                step={1}
                                                aria-label="Volume"
                                            >
                                                <Slider.Track className="bg-secondary relative grow rounded-full h-1">
                                                    <Slider.Range className="absolute bg-primary rounded-full h-full" />
                                                </Slider.Track>
                                                <Slider.Thumb
                                                    className="block w-4 h-4 bg-primary rounded-full focus:outline-none"
                                                />
                                            </Slider.Root>
                                            <span className="ml-2 text-sm">{volume}%</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <AnimatePresence>
                {showCredits && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-transparent backdrop-blur-sm z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed inset-0 md:inset-10 bg-transparent rounded-lg shadow-lg overflow-auto"
                        >
                            <div className="p-6 w-full">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-white">Credits</h2>
                                    <Button variant="secondary" className="" size="icon" onClick={() => setShowCredits(false)}>
                                        <X className="h-4 w-4" />
                                        <span className="sr-only">Close</span>
                                    </Button>
                                </div>
                                <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-6">
                                    {teamMembers.map((member, index) => (
                                        <a href={member.linkedin} key={index} className="flex flex-col items-center p-4 bg-muted rounded-lg">
                                            <Image
                                                src={member.image}
                                                alt={member.name}
                                                width={100}
                                                height={100}
                                                className="rounded-full mb-4"
                                            />
                                            <h3 className="text-lg font-semibold text-center">{member.name}</h3>
                                            <p className="text-sm text-muted-foreground mb-2 text-balance text-center">{member.position}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <audio
                ref={audioRef}
                src="/climate_change.mp3"
                loop
            />
        </>
    );
};

export default SettingsComponent;