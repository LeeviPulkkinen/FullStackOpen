const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <p>Total of {sum} exercises</p>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  let total = parts.reduce((s, p) => s + p.exercises, 0);

  return (
    <>
      {parts.map((part) => {
        return <Part key={part.id} part={part} />;
      })}

      <Total sum={total} />
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

export default Course;
