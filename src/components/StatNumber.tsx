import React from "react";
import CountUp from "react-countup";

interface StatNumberProps {
  value: string; // "4+", "500+", "15+", "10+"
  className?: string;
}

const StatNumber: React.FC<StatNumberProps> = ({ value, className = "" }) => {
  const numericPart = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  return (
    <p className={className}>
      <CountUp
        start={0}
        end={numericPart}
        duration={2.5}
        separator=" "
        suffix={suffix}
        enableScrollSpy={true}
        scrollSpyOnce={false}
        scrollSpyDelay={100}
      />
    </p>
  );
};

export default StatNumber;
