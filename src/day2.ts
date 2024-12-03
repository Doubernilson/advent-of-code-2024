import { readFileFromPath } from "./utils/functions";

//SECTION - PART 1
type TRateOfChange = "inc" | "dec";

function isReportSafe(arr: number[], useProblemDampener?: boolean): boolean {
  if (arr[0] === arr[1] && !useProblemDampener) return false;

  let rateOfChange: TRateOfChange = arr[1] > arr[0] ? "inc" : "dec";

  const absDiffInterval = [1, 2, 3];

  return arr.every((num, idx) => {
    if (idx === 0) return true;

    const isSafe =
      (rateOfChange === "inc" ? num > arr[idx - 1] : num < arr[idx - 1]) &&
      absDiffInterval.includes(Math.abs(num - arr[idx - 1]));

    if (useProblemDampener && !isSafe) {
      return arr.some((_, someIdx) => {
        let splicedArr = [...arr];
        splicedArr.splice(someIdx, 1);

        return isReportSafe(splicedArr);
      });
    }

    return isSafe;
  });
}

function countSafeReports(
  reports: number[][],
  useProblemDampener?: boolean
): number {
  if (!reports.length) return 0;
  return reports.reduce((acc, curr) => {
    if (isReportSafe(curr, useProblemDampener)) return acc + 1;
    return acc;
  }, 0);
}

const text = await readFileFromPath("./src/inputs/day2.txt");

const reports = text
  .split("\n")
  .map((value) => value.split(" ").map((value) => +value));

console.log(countSafeReports(reports));

//SECTION - PART 2
console.log(countSafeReports(reports, true));
