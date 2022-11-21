const Course = ({ name, parts }) => {
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

const Header = ({ name }) => <h2>{name}</h2>;

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((element) => (
        <Part
          key={element.id}
          coursename={element.name}
          numberExercise={element.exercises}
        />
      ))}
    </div>
  );
};

const Part = ({ coursename, numberExercise }) => (
  <p>
    {coursename} {numberExercise}
  </p>
);

const Total = ({ parts }) => {
  const sum = parts.reduce((sumValue, part) => {
    return sumValue + part.exercises;
  }, 0);
  return <strong>Total of {sum} exercises</strong>;
};

export default Course;
