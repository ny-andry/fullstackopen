// Filtering component
const Filter = ({ handle }) => {
  return (
    <div>
      Find countries <input onChange={handle} />
    </div>
  );
};

export default Filter;
