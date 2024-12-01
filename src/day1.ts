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
    const distance =
      curr > listB[idx]
        ? curr - listB[idx]
        : curr < listB[idx]
        ? listB[idx] - curr
        : 0;

    return acc + distance;
  }, 0);
}

const path = "./inputs/day1.txt";
const file = Bun.file(path);

const text = await file.text();

const [firstList, secondList] = text
  .trim()
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
  return list.reduce((acc, curr, idx) => {
    if (curr === entry) return acc + 1;
    return acc;
  }, 0);
}

function calculateSimilarityScore(listA: number[], listB: number[]): number {
  if (listA.length !== listB.length) throw "Lists must be the same size!";

  return listA.reduce((acc, curr, idx) => {
    return acc + curr * findHowManyTimesNumberAppearsInList(listB, curr);
  }, 0);
}

console.log(calculateSimilarityScore(sortedFirstList, sortedSecondList));
