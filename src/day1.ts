import { readFileFromPath } from "./utils/functions";

//SECTION - PART 1
function quickSortArray(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  let pivot = arr[0];
  let leftArr: number[] = [];
  let rightArr: number[] = [];

  arr.forEach((_, idx) => {
    if (idx === 0) return;

    arr[idx] < pivot ? leftArr.push(arr[idx]) : rightArr.push(arr[idx]);
  });

  return [...quickSortArray(leftArr), pivot, ...quickSortArray(rightArr)];
}

function quickSortMultipleArrays(arrays: number[][]) {
  return [...arrays.map((arr) => quickSortArray(arr))];
}

function calculateDistanceBetweenLists(
  listA: number[],
  listB: number[]
): number {
  if (listA.length !== listB.length) throw "Lists must be the same size!";

  return listA.reduce((acc, curr, idx) => {
    const distance = Math.abs(curr - listB[idx]);

    return acc + distance;
  }, 0);
}

const text = await readFileFromPath("./src/inputs/day1.txt");

const [firstList, secondList] = text
  .replaceAll("\n", "   ")
  .split("   ")
  .reduce(
    (acc, curr, idx) => {
      idx % 2 === 0 ? acc[0].push(+curr) : acc[1].push(+curr);
      return acc;
    },
    [[], []] as number[][]
  );

const [sortedFirstList, sortedSecondList] = quickSortMultipleArrays([
  firstList,
  secondList,
]);

console.log(calculateDistanceBetweenLists(sortedFirstList, sortedSecondList));

//SECTION - PART 2
function findHowManyTimesNumberAppearsInList(
  list: number[],
  entry: number
): number {
  return list.reduce((acc, curr) => {
    if (curr === entry) return acc + 1;
    return acc;
  }, 0);
}

function calculateSimilarityScore(listA: number[], listB: number[]): number {
  if (listA.length !== listB.length) throw "Lists must be the same size!";

  return listA.reduce((acc, curr) => {
    return acc + curr * findHowManyTimesNumberAppearsInList(listB, curr);
  }, 0);
}

console.log(calculateSimilarityScore(sortedFirstList, sortedSecondList));
