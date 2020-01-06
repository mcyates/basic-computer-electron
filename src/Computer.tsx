import Cpu from "basic-computer";
import React from "react";

const cpu = new Cpu();

const Computer = () => {
  console.log(cpu.dumpRegs());
  return (
    <div>
      <p>Flags</p>
    </div>
  );
};

export default Computer;
