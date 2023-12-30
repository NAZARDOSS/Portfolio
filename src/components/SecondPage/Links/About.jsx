import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";

const chartSetting = {
  xAxis: [
    {
      label: "From 1 to 10", // Изменили подпись оси X
    },
  ],
  width: 500,
  height: 400,
};

const dataset = [
  {
    value: 5,
    month: "SQL",
  },
  {
    value: 3,
    month: "C++",
  },
  {
    value: 10,
    month: "React",
  },
  {
    value: 8,
    month: "Redux",
  },
  {
    value: 10,
    month: "JS",
  },
  {
    value: 8,
    month: "MobX",
  },
  {
    value: 8,
    month: "GIT",
  },
];

const valueFormatter = (value) => `${value} `; // Изменяем формат значения для оси Y

function About(props) {
  return (
    <div className="about">
      <div className="title_block">
        <h1 className="projects_title">About Me</h1>
        <p className="about_title_text">Information | Introduction | Ambitions </p>
      </div>
      <span> Greetings! </span>
      <p>
        At 19 y.o, I'm not just a developer; I'm an emerging force in the world
        of web development. Proficient in crafting responsive and elegant
        frontend solutions using React, I'm on a mission to elevate user
        experiences. Beyond the frontend, I'm actively expanding my skill set
        into backend technologies, aspiring to become a versatile full-stack
        developer. Eager to contribute innovative solutions and drive success
        for your team, I bring passion, fresh ideas, and a relentless pursuit of
        excellence.
      </p>
      <div className="skills">
        <h1>
          My <br /> Skills
        </h1>
        <div>
          <BarChart
            dataset={dataset}
            yAxis={[{ scaleType: "band", dataKey: "month" }]}
            series={[
              { dataKey: "value", label: "The grade", valueFormatter }, // Изменяем подпись и значение
            ]}
            layout="horizontal"
            {...chartSetting}
          />
        </div>
      </div>
    </div>
  );
}

export default About;
