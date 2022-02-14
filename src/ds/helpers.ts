import { Tile } from "./tile";
import seedrandom from "seedrandom";
const characters =
  "jjkkqqxxzzbbbcccfffhhhmmmpppvvvwwwyyygggglllllddddddssssssuuuuuunnnnnnnntttttttttrrrrrrrrroooooooooooiiiiiiiiiiiiaaaaaaaaaaaaaeeeeeeeeeeeeeeeeee";
export const getRandomLetter = (pos: number, seed: number) => {
  const charactersLength = characters.length;
  const random = seedrandom(`${pos * seed}`);
  const result = characters.charAt(Math.floor(random() * charactersLength));
  return result;
};

export const sameLocation = (tileA: Tile, tileB: Tile) => {
  const locA = tileA.getLocation();
  const locB = tileB.getLocation();
  if (locA.i === locB.i && locA.j === locB.j) return true;
  else return false;
};

export const sameGridLocation = (
  gridLocation: { i: number; j: number },
  tileB: Tile
) => {
  const locA = gridLocation;
  const locB = tileB.getLocation();
  if (locA.i === locB.i && locA.j === locB.j) return true;
  else return false;
};

export const timer =
  (deadline: any, remainingTime: number, callback: any) =>
  (nextFrame: boolean) => {
    if (remainingTime > 50 && nextFrame) {
      return requestAnimationFrame(() => {
        const currentTime = new Date().getTime();
        callback(deadline - currentTime);
      });
    }
  };

export const MINUTE = 60 * 60 * 1000;
export const SECOND = 60 * 1000;
