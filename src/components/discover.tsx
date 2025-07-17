"use client";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from 'react';
export interface ISound {
    soundEnabled: boolean;
    setSoundEnabled: (volume: boolean) => void;
}
export interface IVolume {
    volume: number;
    setVolume: (volume: number) => void;
}
const Discover: React.FC<ISound> = ({ setSoundEnabled }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        // enable sound when is open is set to false
        if (!isOpen) {
            setSoundEnabled(true);
        }
    }, [isOpen, setSoundEnabled]);

    return (
        <div className={`z-50 transition-all duration-300 ${isOpen ? 'blur-sm' : ''}`}>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className="z-50 absolute top-4 left-4 bg-white text-black hover:bg-gray-100 hover:text-black"
                    >
                        Hello!
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Hello!</DialogTitle>
                        <DialogDescription>
                            If you are reading this, humans have perished and this is a record of what happened to humanity&apos;s legacy.                         </DialogDescription>
                    </DialogHeader>
                    <p className="text-justify">
                        Records reveal an unsettling upward trend in greenhouse gas emissions over time. CO2 levels were meticulously documented in regions like Texas, Tutuila, the Republic of Korea, Indonesia, and Algeria, showing a persistent rise in carbon emissions due to industrialization, energy production, and transportation. Meanwhile, methane emissions were recorded in places such as Taipei, Guam, Israel, and Mexico, driven by agricultural practices, waste management, and fossil fuel extraction.
                    </p>
                    <p className="text-justify"> These documented trends underscore the growing environmental challenge posed by rising greenhouse gases, painting a stark picture of humanity&apos;s impact on the planet. This message serves as a testament to our actions and their consequences. May you learn from our past and forge a path toward a better future.</p>
                    {/* <div className="max-w-20">
                        <ResponsiveNarrationPlayer narrationPath="/narration/intro.mp3" />
                    </div> */}
                    {/* infor thath music will play on initial close of the toggle */}
                    <p className="text-center text-sm">Music will play on initial close.</p>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Discover;