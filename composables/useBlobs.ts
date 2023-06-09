import { onMounted, reactive } from 'vue'

interface Img {
  src: string,
  width: number,
  height: number,
  type: string,
  position: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }
}

export function useBlob(smallNum:number,  largeNum: number, mediumNum?: number): Img[] {
  const outArray: Img[] = reactive([])

  onMounted(() => {
    for (let i = 0; i < smallNum; i++) {
      const img: Img = generateImage(`small/${getSingleRandomNumber(5)}.png`, getRandomNumber(60, 160) + 90, getRandomNumber(60, 160) + 90, 'small')
      outArray.push(img)
    }

    for (let i = 0; i < largeNum; i++) {
      const img: Img = generateImage(`large/${getSingleRandomNumber(5)}.png`, getRandomNumber(200, 240) + 250, getRandomNumber(200, 240) + 250, 'large')
      outArray.push(img)
    }

    if (mediumNum) {
      for (let i = 0; i < mediumNum; i++) {
        const img: Img = generateImage(`large/${getSingleRandomNumber(5)}.png`, getRandomNumber(120, 360) + 125, getRandomNumber(60, 160) + 125, 'medium')
        outArray.push(img)
      }
    }
  })

  return outArray
}

function getSingleRandomNumber (multiplier: number):number {
  return Math.floor((Math.random() * multiplier )+ 1 )
}

const getRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function generateImage (path: string, height: number, width: number, type: string) {
  const img: Img = {src: path, width: width, height: height, position: generateRandomPosition(type), type: type}
  return img
}

const generateRandomPosition = (type: string) => {
  const randomPosition: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  } = {};

  if (type === 'small') {
    if (Math.floor(Math.random() * 2) === 1) {
      randomPosition.top = getRandomNumber(36, 98) + "%";
    } else {
      randomPosition.bottom = getRandomNumber(36, 98) + "%";
    }
    
    if (Math.floor(Math.random() * 2) === 1) {
      randomPosition.right = getRandomNumber(36, 98) + "%";
    } else {
      randomPosition.left = getRandomNumber(36, 98) + "%";
    }
  } else {
    if (Math.floor(Math.random() * 2) === 1) {
      randomPosition.top = getRandomNumber(2, 36) + "%";
    } else {
      randomPosition.bottom = getRandomNumber(2, 36) + "%";
    }
    
    if (Math.floor(Math.random() * 2) === 1) {
      randomPosition.right = getRandomNumber(2, 36) + "%";
    } else {
      randomPosition.left = getRandomNumber(2, 36) + "%";
    }
  }

  return randomPosition;
};