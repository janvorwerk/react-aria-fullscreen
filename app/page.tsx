"use client";

import { Maximize, Minimize, X } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { UNSAFE_PortalProvider } from "react-aria";
import { Button, Dialog, DialogTrigger, Heading, Modal } from "react-aria-components";

/**
 * This is where you can switch the behavior:
 *   - with `true` => the dialog opens when 'main' is fullscreen
 *   - with `false` => the video in the dialog can turn fullscreen
 * 
 * But you cannot have both with this pattern alone.
 */
const ENABLE_PORTAL_PROVIDER = true;

export default function Home() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const toggleFullscreen = async () => {
    if (!mainRef.current) return;

    if (!document.fullscreenElement) {
      try {
        await mainRef.current.requestFullscreen();
        setIsFullscreen(true);
      } catch (error) {
        console.error("Error attempting to enable fullscreen:", error);
      }
    } else {
      try {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } catch (error) {
        console.error("Error attempting to exit fullscreen:", error);
      }
    }
  };

  // Listen for fullscreen changes (e.g., user pressing ESC)
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return (
    <SkPortalProvider enabled={ENABLE_PORTAL_PROVIDER}>
      <main
        ref={mainRef}
        className="flex flex-col gap-4 w-full h-full rounded-2xl bg-zinc-200 p-8 shadow-xl dark:bg-zinc-800 relative"
      >
        <Button
          onPress={toggleFullscreen}
          aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
          className="absolute top-4 right-4 rounded-lg p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 dark:focus:ring-offset-zinc-800"
        >
          {isFullscreen ? <Minimize size={20} aria-hidden /> : <Maximize size={20} aria-hidden />}
        </Button>
        <div className="">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">React Aria Demo</h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            A simple example showcasing React Aria components with fullscreen API
          </p>
        </div>

        <DialogTrigger>
          <Button className="rounded-lg max-w-sm bg-blue-600 px-4 py-2 font-medium text-white transition-colors hover:bg-blue-700 pressed:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-zinc-400 dark:focus:ring-offset-zinc-800">
            Open Dialog
          </Button>
          <Modal className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
            <Dialog className="relative max-w-2xl rounded-2xl bg-white p-6 shadow-2xl outline-none dark:bg-zinc-800">
              <div className="flex items-start justify-between mb-4">
                <Heading slot="title" className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
                  Welcome Video
                </Heading>
                <Button
                  slot="close"
                  className="rounded-lg p-1 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-50 dark:focus:ring-offset-zinc-800"
                  aria-label="Close dialog"
                >
                  <X size={20} />
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                <p className="text-zinc-700 dark:text-zinc-300">
                  Check out this excellent video and try to switch it to fullscreen:
                </p>
                <iframe
                  className="  rounded-lg relative w-[624px] h-[351px]"
                  src="https://www.youtube.com/embed/dxDcBB7Xoxs"
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </Dialog>
          </Modal>
        </DialogTrigger>
        <p className="text-zinc-700 dark:text-zinc-300">
          Check out this excellent video and try to switch it to fullscreen:
        </p>
        <iframe
          className="rounded-lg relative min-h-0 flex-1 aspect-video mx-auto"
          src="https://www.youtube.com/embed/dxDcBB7Xoxs"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </main>
    </SkPortalProvider>
  );
}

export function SkPortalProvider(props: { children: ReactNode; enabled: boolean }) {
  return (
    <UNSAFE_PortalProvider getContainer={() => (props.enabled ? getDomRoot() : document.body)}>
      {props.children}
    </UNSAFE_PortalProvider>
  );
}

function getDomRoot(): HTMLElement | null {
  return document?.fullscreenElement instanceof HTMLElement ? document.fullscreenElement : document.body;
}
