import Cpu from "basic-computer";
import React, { useState } from "react";

import binToString, { boolToBinary, binToBool } from "./utils/utils";

const cpu = new Cpu();

const Computer = () => {
  const [code, setCode] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const regs = cpu.dumpRegs();
  const mem = cpu.dumpMem().flat(1);
  let cycles = 0;
  let counter = 0;

  const run = (e: any) => {
    e.preventDefault();
    if (!isRunning) {
      disassemble();
      setIsRunning(true);
      while (counter <= cycles) {
        cpu.cycle();
        counter++;
      }
    } else {
      setIsRunning(false);
    }
  };

  const disassemble = () => {
    const assembly = code.split("\n");
    const mCode = assembly.map((instruction: string) => {
      return instruction.split(" ");
    });

    const byteCode: boolean[][] = [];

    const registerSelect = (register: string) => {
      let result = "";
      switch (register.toUpperCase()) {
        case "R0":
          result = "00";
          break;
        case "R1":
          result = "01";
          break;
        case "R2":
          result = "10";
          break;
        case "R3":
          result = "11";
          break;
        default:
          break;
      }
      return result;
    };
    console.log(mCode);

    for (let i = 0; i < mCode.length; i++) {
      let ra, rb;
      if (mCode[i][0] !== "") {
        if (mCode[i][0] !== "CLF") {
          mCode[i][1] = mCode[i][1].slice(0, 2);
          ra = registerSelect(mCode[i][1]);
          if (mCode[i][1] === mCode[i][2] || mCode[i].length < 3) {
            rb = registerSelect(mCode[i][1]);
          } else {
            rb = registerSelect(mCode[i][2]);
          }
        }

        switch (mCode[i][0]) {
          case "ADD":
            byteCode.push(binToBool(`1000${ra}${rb}`));
            break;
          case "SHR":
            byteCode.push(binToBool(`1001${ra}${rb}`));
            break;
          case "SHL":
            byteCode.push(binToBool(`1010${ra}${rb}`));
            break;
          case "NOT":
            byteCode.push(binToBool(`1011${ra}${rb}`));
            break;
          case "AND":
            byteCode.push(binToBool(`1100${ra}${rb}`));
            break;
          case "OR":
            byteCode.push(binToBool(`1101${ra}${rb}`));
            break;
          case "XOR":
            byteCode.push(binToBool(`1110${ra}${rb}`));
            break;
          case "CMP":
            byteCode.push(binToBool(`1111${ra}${rb}`));
            break;
          case "LD":
            byteCode.push(binToBool(`0000${ra}${rb}`));
            break;
          case "ST":
            byteCode.push(binToBool(`0001${ra}${rb}`));
            break;
          case "DATA":
            rb = registerSelect(mCode[i][1]);
            byteCode.push(binToBool(`001000${rb}`));
            byteCode.push(binToBool(binToString(parseInt(mCode[i][2], 10))));
            break;
          case "JMPR":
            byteCode.push(binToBool(`001100${rb}`));
            break;
          case "JMP":
            byteCode.push(binToBool(`01000000`));
            byteCode.push(binToBool(binToString(parseInt(mCode[i][1], 10))));
            break;
          case "JCAEZ":
            mCode[i][1] = mCode[i][1].slice(0, 1);
            switch (mCode[i][1].toUpperCase()) {
              case "C":
                byteCode.push(binToBool(`01011000`));
                break;
              case "A":
                byteCode.push(binToBool(`01010100`));
                break;
              case "E":
                byteCode.push(binToBool(`01010010`));
                break;
              case "Z":
                byteCode.push(binToBool(`01010001`));
                break;
              default:
                break;
            }
            byteCode.push(binToBool(binToString(parseInt(mCode[i][2], 10))));
            break;
          case "CLF":
            byteCode.push(binToBool(`01100000`));
            break;
          default:
            break;
        }
      }
    }
    cycles = byteCode.length - 1;
    console.log(byteCode);
    console.log(cycles);
  };

  return (
    <div>
      <form id="inputs" onSubmit={e => run(e)}>
        <h3>Assembly</h3>
        <textarea onChange={e => setCode(e.target.value)}></textarea>
        <button>{!isRunning ? "Run" : "stop"}</button>
      </form>
      <div id="flags">
        <h3>flags register</h3>
        {`${boolToBinary(regs.flags)}`}
      </div>

      <div id="acc">
        <h3>acc reg</h3>
        {`${boolToBinary(regs.acc)}`}
      </div>
      <div id="tmp">
        <h3>Tmp reg</h3>
        {`${boolToBinary(regs.tmp)}`}
      </div>

      <div id="gp">
        <h3>General purpose registers</h3>
        <p>{`${boolToBinary(regs.gp[0])}`}</p>
        <p>{`${boolToBinary(regs.gp[1])}`}</p>
        <p>{`${boolToBinary(regs.gp[2])}`}</p>
        <p>{`${boolToBinary(regs.gp[3])}`}</p>
      </div>

      <div id="memory">
        <h3>Memory</h3>
        {mem.map((cell, index) => {
          return (
            <div key={index}>
              <h4>Cell: {index}</h4>
              {`${boolToBinary(cell.read())}`}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Computer;
