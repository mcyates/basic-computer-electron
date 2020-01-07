import Cpu from "basic-computer";
import React from "react";

import binToString, { boolToBinary } from "./utils/utils";

const cpu = new Cpu();

const Computer = () => {
  const regs = cpu.dumpRegs();
  const mem = cpu.dumpMem().flat(1);

  return (
    <div>
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
