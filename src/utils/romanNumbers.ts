

export function roman(value: number): string {
  if (value < 1 || value > 3999) {
    throw new Error("Value must be between 1 and 3999");
  }

  const romanNumerals: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"]
  ];

  let result = "";
  for (const [num, numeral] of romanNumerals) {
    while (value >= num) {
      result += numeral;
      value -= num;
    }
  }

  return result;

}