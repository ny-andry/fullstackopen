// Persons component to display
const Persons = ({ data }) => {
  const personList = data.map((x) => (
    <li key={x.id}>
      {x.name} {x.number}
    </li>
  ));
  return personList;
};

export default Persons