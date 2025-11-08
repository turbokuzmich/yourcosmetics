"use client";

import Player from "next-video/player";
import Chrome from "./chrome";
import { type FC } from "react";
import reachGoal from "../helpers/metrika";

export default function PlayerComponent() {
  const handlePlay = () => {
    reachGoal("play_video");
  };

  return (
    <div>
      <Player
        src="/video/video.mp4"
        theme={Chrome as FC}
        muted
        onPlay={handlePlay}
      />
    </div>
  );
}
