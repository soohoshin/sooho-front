import React from "react";
import { useWindowScroll, useAudio } from "react-use";
import styled, { css, keyframes } from "styled-components";

const MusicPlayer = () => {
  const [audio, state, controls, ref] = useAudio({
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    autoPlay: false,
  });

  return (
    <MusicBox>
      {audio}
      <p>음악플레이어</p>
      <button onClick={controls.pause}>Pause</button>
      <button onClick={controls.play}>Play</button>
      <button onClick={controls.mute}>Mute</button>
      <button onClick={controls.unmute}>Un-mute</button>
      <button onClick={() => controls.volume(0.1)}>Volume: 10%</button>
      <button onClick={() => controls.volume(0.5)}>Volume: 50%</button>
      <button onClick={() => controls.volume(1)}>Volume: 100%</button>
      <button onClick={() => controls.seek(state.time - 5)}>-5 sec</button>
      <button onClick={() => controls.seek(state.time + 5)}>+5 sec</button>
    </MusicBox>
  );
};
const ani = keyframes`
0%{
    color:red;
}
100%{
    color:green;
}
`;
const MusicBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 100px;
  border: 1px solid #000;
  background: white;
  z-index: 500;

  p {
    padding-top: 10px;
    padding-bottom: 10px;
    animation: ${ani} 300ms alternate infinite;
  }
  button {
    width: 100%;
    padding: 4px 0;
    border-top: 1px solid #000;
  }
`;

export default MusicPlayer;
