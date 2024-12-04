import { readFileFromPath } from "./utils/functions";

//SECTION - PART 1

const mulRegex = /mul\(\d{1,3},\d{1,3}\)/gm;

const executeStringAsCode = (str: string, additionalCode?: string) =>
  eval(`${additionalCode} ${str}`);

const addMultiplications = (mulArr: string[]): number =>
  mulArr.reduce(
    (acc, curr) =>
      (acc +
        executeStringAsCode(
          curr,
          `const mul = (num1, num2) => num1 * num2;`
        )) as number,
    0
  );

const text = await readFileFromPath("./src/inputs/day3.txt");

const multiplications = (text.match(mulRegex) as string[]) || [];

console.log(addMultiplications(multiplications));

//SECTION - PART 2

const mulsDosAndDontsRegex = /mul\(\d{1,3},\d{1,3}\)|do(?:n't)?\(\)/gm;

const multiplicationsAndDosAndDonts =
  (text.match(mulsDosAndDontsRegex) as string[]) || [];

console.log(
  addMultiplications(
    (() => {
      let allowMultiplication: boolean = true;
      return multiplicationsAndDosAndDonts.filter((str) => {
        if (str === "don't()") {
          allowMultiplication = false;
        }

        if (str === "do()") {
          allowMultiplication = true;
        }

        if (allowMultiplication && !["do()", "don't()"].includes(str)) {
          return str;
        }
      });
    })()
  )
);
