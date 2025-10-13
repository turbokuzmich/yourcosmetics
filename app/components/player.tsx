"use client";

import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaTimeDisplay,
  MediaVolumeRange,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaMuteButton,
} from "media-chrome/react";

export default function Player(props: {
  style: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <MediaController
      breakpoints="xs:360 sm:600 md:760 lg:960 xl:1100"
      defaultStreamType="on-demand"
      style={props.style}
    >
      {props.children}
      <div slot="centered-chrome">
        <MediaPlayButton className="relative flex flex-none mb-[10px] h-[96px] w-[96px] items-center justify-items-center rounded-[9999px]">
          <div slot="play">
            <svg viewBox="0 0 16 16">
              <path d="M13.6 7.2 5.1 3c-.6-.3-1.2.1-1.2.7v8.5c0 .6.7 1 1.2.7l8.5-4.2c.6-.3.6-1.1 0-1.5z" />
            </svg>
          </div>
          <div slot="pause">
            <svg viewBox="0 0 16 16">
              <path d="M11.8 14c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9s.9.4.9.9v10.2c0 .5-.4.9-.9.9zM4.1 14c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9s.9.4.9.9v10.2c-.1.5-.5.9-.9.9z" />
            </svg>
          </div>
        </MediaPlayButton>
      </div>
      <MediaControlBar></MediaControlBar>
    </MediaController>
  );
}
