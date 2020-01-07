const binToString = (binary: number) => {
  return binary.toString(2).padStart(8, "0");
};

export const binToBool = (binary: string) => {
  return binary.split("").map(x => x === "1");
};

export const boolToBinary = (boolArr: boolean[]) => {
  // @ts-ignore
  let data = boolArr.reduce((res, x) => (res << 1) | x, 0).toString(2);
  data = data.padStart(8, "0");
  return data;
};

export default binToString;
