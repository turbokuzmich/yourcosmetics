"use client";

import {
  MediaController,
  MediaControlBar,
  MediaTimeRange,
  MediaVolumeRange,
  MediaPlayButton,
  MediaMuteButton,
  MediaPreviewThumbnail,
  MediaFullscreenButton,
} from "media-chrome/react";
import { FC } from "react";
import poster from "./poster.jpg";
import { PlayIcon } from "@heroicons/react/24/outline";

export type Props = {
  children: React.ReactNode;
};

const Player: FC<Props> = ({ children }) => {
  return (
    <MediaController
      className="grid bg-transparent group/controller"
      breakpoints="xs:360 sm:600 md:760 lg:960 xl:1100"
      defaultStreamType="on-demand"
      style={{
        "--media-primary-color": "black",
        "--media-tertiary-color": "var(--media-accent-color, #7596CC)",
        "--media-text-color": "white",
        "--media-control-hover-background": "transparent",
        "--media-range-track-height": "6px",
        "--media-range-bar-color": "white",
        "--media-range-track-background": "rgba(0,0,0,0.4)",
        "--media-range-track-border-radius": "9999px",
        "--media-range-thumb-background": "var(--media-tertiary-color)",
        "--media-range-thumb-width": "14px",
        "--media-range-thumb-height": "14px",
        "--media-tooltip-display": "none",
      }}
    >
      <div slot="poster" className="bg-white">
        <img
          src={poster.src}
          title="Твоя Косметика"
          className="group-[[mediahasplayed]]/controller:blur-none md:rounded-4xl blur-[2px] opacity-70"
        />
      </div>
      {children}
      <div
        slot="centered-chrome"
        className="hidden group-[[mediahasplayed]]/controller:block"
      >
        <MediaPlayButton className="relative flex flex-none md:h-[96px] md:w-[96px] h-[64px] w-[64px] items-center justify-items-center rounded-[9999px] bg-[rgb(0_0_0_/_0.8)] hover:shadow-[0_0_0_2px_#7596CC]">
          <div slot="play" key="play">
            <svg
              viewBox="0 0 16 16"
              className="fill-white w-[32px] h-[32px] md:w-[64px] md:h-[64px]"
            >
              <path d="M13.6 7.2 5.1 3c-.6-.3-1.2.1-1.2.7v8.5c0 .6.7 1 1.2.7l8.5-4.2c.6-.3.6-1.1 0-1.5z" />
            </svg>
          </div>
          <div slot="pause" key="pause">
            <svg
              viewBox="0 0 16 16"
              className="fill-white w-[32px] h-[32px] md:w-[64px] md:h-[64px]"
            >
              <path d="M11.8 14c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9s.9.4.9.9v10.2c0 .5-.4.9-.9.9zM4.1 14c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9s.9.4.9.9v10.2c-.1.5-.5.9-.9.9z" />
            </svg>
          </div>
        </MediaPlayButton>
      </div>
      <MediaControlBar className="relative md:m-[30px] py-[10px] px-[14px] md:rounded-[9999px] bg-[rgb(0_0_0_/_0.2)] hidden group-[[mediahasplayed]]/controller:flex">
        <MediaPlayButton className="relative flex-none mr-[5px] flex items-center justify-items-center h-[32px] w-[32px] bg-white rounded-[9999px]">
          <div slot="play" key="play">
            <svg viewBox="0 0 16 16" width="20" height="20">
              <path d="M13.6 7.2 5.1 3c-.6-.3-1.2.1-1.2.7v8.5c0 .6.7 1 1.2.7l8.5-4.2c.6-.3.6-1.1 0-1.5z" />
            </svg>
          </div>
          <div slot="pause" key="pause">
            <svg viewBox="0 0 16 16" width="20" height="20">
              <path d="M11.8 14c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9s.9.4.9.9v10.2c0 .5-.4.9-.9.9zM4.1 14c-.5 0-.9-.4-.9-.9V2.9c0-.5.4-.9.9-.9s.9.4.9.9v10.2c-.1.5-.5.9-.9.9z" />
            </svg>
          </div>
        </MediaPlayButton>
        <div className="relative pl-[6px] group/volume">
          <MediaMuteButton className="relative flex-none mr-[5px] flex items-center justify-items-center h-[32px] w-[32px] bg-white rounded-[9999px]">
            <div slot="off" key="off">
              <svg viewBox="0 0 16 16" width="20" height="20">
                <path
                  d="M7 2.2 4.2 5.1v.1H1.4c-.5 0-.9.4-.9.9V10c0 .5.4.9.9.9h2.8L7 13.8c.3.3.8.1.8-.3v-11c0-.4-.5-.6-.8-.3ZM13.4 8l2-2"
                  fillRule="nonzero"
                />
                <path d="M15.622 5.479a.606.606 0 0 1 0 .857l-4.286 4.286a.606.606 0 1 1-.857-.857l4.286-4.286a.606.606 0 0 1 .857 0Z" />
                <path d="M10.479 5.479a.606.606 0 0 0 0 .857l4.286 4.286a.606.606 0 1 0 .857-.857l-4.286-4.286a.606.606 0 0 0-.857 0Z" />
              </svg>
            </div>
            <div slot="low" key="low">
              <svg viewBox="0 0 16 16" width="20" height="20">
                <path d="m7.1 2.2-2.8 3H1.5c-.5 0-.9.4-.9.9V10c0 .5.4.9.9.9h2.8l2.8 2.9c.3.3.8.1.8-.3v-11c0-.4-.5-.6-.8-.3zM10.3 11.4c-.2 0-.3-.1-.4-.2-.3-.3-.3-.6 0-.9.6-.6 1-1.4 1-2.3s-.4-1.6-1-2.3c-.3-.3-.3-.6 0-.9.3-.3.6-.3.9 0 .9.8 1.4 2 1.4 3.2s-.5 2.3-1.4 3.2c-.2.2-.4.2-.5.2z" />
              </svg>
            </div>
            <div slot="medium" key="medium">
              <svg viewBox="0 0 16 16" width="20" height="20">
                <path d="m7.1 2.2-2.8 3H1.5c-.5 0-.9.4-.9.9V10c0 .5.4.9.9.9h2.8l2.8 2.9c.3.3.8.1.8-.3v-11c0-.4-.5-.6-.8-.3zM12.6 13.8c-.2 0-.3-.1-.4-.2-.3-.3-.3-.6 0-.9 1.3-1.2 2-2.8 2-4.5s-.7-3.3-2-4.5c-.3-.3-.3-.6 0-.9.3-.3.6-.3.9 0 1.5 1.5 2.3 3.4 2.3 5.4 0 2.1-.8 4-2.3 5.4-.2.1-.4.2-.5.2z" />
                <path d="M10.3 11.4c-.2 0-.3-.1-.4-.2-.3-.3-.3-.6 0-.9.6-.6 1-1.4 1-2.3s-.4-1.6-1-2.3c-.3-.3-.3-.6 0-.9.3-.3.6-.3.9 0 .9.8 1.4 2 1.4 3.2s-.5 2.3-1.4 3.2c-.2.2-.4.2-.5.2z" />
              </svg>
            </div>
            <div slot="high" key="high">
              <svg viewBox="0 0 16 16" width="20" height="20">
                <path d="m7.1 2.2-2.8 3H1.5c-.5 0-.9.4-.9.9V10c0 .5.4.9.9.9h2.8l2.8 2.9c.3.3.8.1.8-.3v-11c0-.4-.5-.6-.8-.3zM12.6 13.8c-.2 0-.3-.1-.4-.2-.3-.3-.3-.6 0-.9 1.3-1.2 2-2.8 2-4.5s-.7-3.3-2-4.5c-.3-.3-.3-.6 0-.9.3-.3.6-.3.9 0 1.5 1.5 2.3 3.4 2.3 5.4 0 2.1-.8 4-2.3 5.4-.2.1-.4.2-.5.2z" />
                <path d="M10.3 11.4c-.2 0-.3-.1-.4-.2-.3-.3-.3-.6 0-.9.6-.6 1-1.4 1-2.3s-.4-1.6-1-2.3c-.3-.3-.3-.6 0-.9.3-.3.6-.3.9 0 .9.8 1.4 2 1.4 3.2s-.5 2.3-1.4 3.2c-.2.2-.4.2-.5.2z" />
              </svg>
            </div>
          </MediaMuteButton>
          <div className="w-[147px] h-[32px] overflow-hidden opacity-0 group-hover/volume:opacity-100 transform -rotate-90 absolute top-[-85px] left-[-52px] border-l-[16px] border-solid border-transparent">
            <MediaVolumeRange className="h-full rounded-[9999px] bg-[rgb(0_0_0_/_0.2)]" />
          </div>
        </div>
        <MediaTimeRange
          className="h-[32px] m-[0_8px_0_0]"
          style={{
            "--media-secondary-color": "transparent",
          }}
        >
          <MediaPreviewThumbnail slot="preview"></MediaPreviewThumbnail>
        </MediaTimeRange>
        <MediaFullscreenButton className="relative flex-none mr-[5px] flex items-center justify-items-center h-[32px] w-[32px] bg-white rounded-[9999px]">
          <div slot="enter" key="enter">
            <svg viewBox="0 0 16 16" width="20" height="20">
              <path d="M2.9 6.6c-.4 0-.7-.3-.7-.7v-3c0-.4.3-.7.7-.7h3c.4 0 .7.3.7.7s-.2.7-.6.7H3.6V6c0 .3-.3.6-.7.6zM13.1 6.6c-.4 0-.7-.3-.7-.7V3.6H10c-.4 0-.7-.3-.7-.7s.3-.7.7-.7h3c.4 0 .7.3.7.7v3c.1.4-.2.7-.6.7zM6 13.8H3c-.4 0-.7-.3-.7-.7v-3c0-.4.3-.7.7-.7.4 0 .7.3.7.7v2.4H6c.4 0 .7.3.7.7-.1.3-.4.6-.7.6zM13.1 13.8h-3c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7h2.4V10c0-.4.3-.7.7-.7.4 0 .7.3.7.7v3c-.1.5-.4.8-.8.8z" />
            </svg>
          </div>
          <div slot="exit" key="exit">
            <svg viewBox="0 0 16 16" width="20" height="20">
              <path d="M2.9 6.6c-.4 0-.7-.3-.7-.7v-3c0-.4.3-.7.7-.7h3c.4 0 .7.3.7.7s-.2.7-.6.7H3.6V6c0 .3-.3.6-.7.6zM13.1 6.6c-.4 0-.7-.3-.7-.7V3.6H10c-.4 0-.7-.3-.7-.7s.3-.7.7-.7h3c.4 0 .7.3.7.7v3c.1.4-.2.7-.6.7zM6 13.8H3c-.4 0-.7-.3-.7-.7v-3c0-.4.3-.7.7-.7.4 0 .7.3.7.7v2.4H6c.4 0 .7.3.7.7-.1.3-.4.6-.7.6zM13.1 13.8h-3c-.4 0-.7-.3-.7-.7 0-.4.3-.7.7-.7h2.4V10c0-.4.3-.7.7-.7.4 0 .7.3.7.7v3c-.1.5-.4.8-.8.8z" />
            </svg>
          </div>
        </MediaFullscreenButton>
      </MediaControlBar>
      <MediaPlayButton className="cursor-pointer bg-transparent opacity-80 hover:opacity-100 absolute top-0 left-0 flex items-center justify-center text-center w-full h-full group-[[mediahasplayed]]/controller:hidden">
        <div className="flex flex-col gap-4 items-center" slot="play">
          <PlayIcon className="w-[50px] stroke-[var(--color-base-content)]" />
          <span className="text-xl font-medium md:text-2xl text-base-content ">
            Производство вашей косметики
          </span>
        </div>
      </MediaPlayButton>
    </MediaController>
  );
};

export default Player;
