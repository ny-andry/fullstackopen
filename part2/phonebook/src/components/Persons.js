// Persons component to display
// const Persons = ({ data, handlerDelete}) => {
//   const personList = data.map((x) => (
//     <li key={x.id}>
//       {x.name} {x.number} <button onClick={handlerDelete} >delete</button>
//     </li>
//   ));
//   return personList;
// };

const Persons = ({ data, handle }) => {
  return (
    <li>
      {data.name} {data.number}
      <button onClick={() => handle(data)}> delete</button>
    </li>
  );
};

export default Persons;
