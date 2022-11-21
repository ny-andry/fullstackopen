// Filter to find a person query component
const Filter = ({ handle }) => {
  return (
    <div>
      Filter shown with <input onChange={handle} />
    </div>
  );
};

export default Filter