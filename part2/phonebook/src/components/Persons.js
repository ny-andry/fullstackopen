const Persons = ({ data, handle }) => {
  return (
    <li className="list">
      {data.name} {data.number}
      <button onClick={() => handle(data)}> delete</button>
    </li>
  );
};

export default Persons;
