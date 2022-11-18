const Header = (props) => <h1>{props.name}</h1>;

const Part = (props) => (
  <p>
    {props.part.coursename} {props.part.exo}
  </p>
);

const Content = (props) => (
  <>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
  </>
);

const Total = (props) => {
  let sum = props.parts[0].exo + props.parts[1].exo + props.parts[2].exo;
  return <p>Number of exercices {sum}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        coursename: "Fundamentals of React",
        exo: 10,
      },
      {
        coursename: "Using props to pass data",
        exo: 7,
      },
      {
        coursename: "State of a component",
        exo: 14,
      },
    ],
  };

  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </>
  );
};

export default App;
