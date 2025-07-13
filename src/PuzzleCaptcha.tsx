import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface PuzzleCaptchaProps {
  imageURL?: string;
  width?: string | number;
  height?: string | number;
  columns?: number;
  rows?: number;
  targetInput?: string | null;
  targetVal?: string | null;
  targetButton?: string | null;
  onSuccess?: () => void;
}

const Wrapper = styled.div.attrs({ className: 'puzzleCAPTCHA' })`
  display: table;
`;

const Box = styled.div.attrs({ className: 'pcBox' })<{
  boxWidth: number;
  boxHeight: number;
}>`
  overflow: hidden;
  position: relative;
  border-radius: 4px;
  border: 1px solid #ccc;
  float: left;
  margin-right: 50px;
  margin-bottom: 30px;
  width: ${({ boxWidth }) => boxWidth}px;
  height: ${({ boxHeight }) => boxHeight}px;

  &:hover .pcBoxItem {
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const BoxBG = styled.div.attrs({ className: 'pcBoxBG' })`
  display: block;
  margin: 0;
  padding: 0;
`;

const BoxItem = styled.div.attrs({ className: 'pcBoxItem' })<{
  solved: boolean;
  itemW: number;
  itemH: number;
  left: number;
  top: number;
}>`
  display: ${({ solved }) => (solved ? 'none' : 'block')};
  position: absolute;
  border-right: 1px solid rgba(255, 255, 255, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  overflow: hidden;
  width: ${({ itemW }) => itemW}px;
  height: ${({ itemH }) => itemH}px;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top}px;

  img {
    position: absolute;
    display: none;
    opacity: 0.7;
  }

  &:hover img {
    display: block;
  }
`;

const BoxBGImage = styled.img<{ imgw: string | number; imgh: string | number }>`
  width: ${({ imgw }) => imgw};
  height: ${({ imgh }) => imgh};
`;

const Answer = styled.div.attrs({ className: 'pcAnswer' })<{
  itemW: number;
  itemH: number;
  mt: number;
}>`
  overflow: hidden;
  position: relative;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: ${({ itemW }) => itemW}px;
  height: ${({ itemH }) => itemH}px;
  margin-top: ${({ mt }) => mt}px;
`;

const CropImage = styled.img<{
  left: number;
  top: number;
  imgw: number;
  imgh: number;
}>`
  margin-left: ${({ left }) => -left}px;
  margin-top: ${({ top }) => -top}px;
  width: ${({ imgw }) => imgw}px;
  height: ${({ imgh }) => imgh}px;
`;

/**
 * React version of the original jQuery PuzzleCAPTCHA plugin.
 */
function PuzzleCaptcha({
  imageURL = 'http://www.choikangstory.com/test-image.jpg',
  width = 'auto',
  height = 'auto',
  columns = 3,
  rows = 2,
  targetInput = null,
  targetVal = null,
  targetButton = null,
  onSuccess,
}: PuzzleCaptchaProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [imgSize, setImgSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [answer, setAnswer] = useState(0);
  const [solved, setSolved] = useState(false);

  const itemW = imgSize.width ? Math.round(imgSize.width / columns) : 0;
  const itemH = imgSize.height ? Math.round(imgSize.height / rows) : 0;
  const answerLeft = (answer % columns) * itemW;
  const answerTop = Math.floor(answer / columns) * itemH;

  useEffect(() => {
    if (imgRef.current && imgRef.current.complete) {
      handleLoad();
    }
  }, []);

  const handleLoad = () => {
    const w = width === 'auto' ? (imgRef.current?.width || 0) : parseInt(width as string, 10);
    const h = height === 'auto' ? (imgRef.current?.height || 0) : parseInt(height as string, 10);
    setImgSize({ width: w, height: h });
    setAnswer(Math.floor(Math.random() * columns * rows));
    setLoaded(true);
  };

  const handleClick = (idx: number) => {
    if (idx === answer) {
      setSolved(true);
      if (targetInput) {
        const el = document.querySelector(targetInput) as HTMLInputElement | null;
        if (el) el.value = targetVal ?? '';
      }
      if (targetButton) {
        const el = document.querySelector(targetButton) as HTMLButtonElement | null;
        if (el) el.disabled = false;
      }
      if (onSuccess) onSuccess();
    }
  };

  const pieces: { index: number; left: number; top: number }[] = [];
  if (loaded) {
    for (let x = 0; x < columns; x++) {
      for (let y = 0; y < rows; y++) {
        const index = x * rows + y;
        pieces.push({
          index,
          left: itemW * x,
          top: itemH * y
        });
      }
    }
  }

  const cropProps: { left: number; top: number; imgw: number; imgh: number } = {
    left: answerLeft,
    top: answerTop,
    imgw: imgSize.width,
    imgh: imgSize.height
  };

  return (
    <Wrapper>
      <Box boxWidth={imgSize.width - 1} boxHeight={imgSize.height - 1}>
        <BoxBG>
          <BoxBGImage
            ref={imgRef}
            src={imageURL}
            onLoad={handleLoad}
            imgw={width}
            imgh={height}
            alt="Puzzle"
          />
        </BoxBG>
        {loaded &&
          pieces.map((p) => (
            <BoxItem
              key={p.index}
              itemW={itemW}
              itemH={itemH}
              left={p.left}
              top={p.top}
              solved={solved}
              onClick={() => handleClick(p.index)}
            >
              <CropImage src={imageURL} {...cropProps} alt="" />
            </BoxItem>
          ))}
      </Box>
      <Answer itemW={itemW} itemH={itemH} mt={imgSize.height / 2 - itemH / 2}>
        {loaded && <CropImage src={imageURL} {...cropProps} alt="" />}
      </Answer>
    </Wrapper>
  );
}

if (typeof window !== 'undefined') {
  (window as any).PuzzleCaptcha = PuzzleCaptcha;
}

export default PuzzleCaptcha;
