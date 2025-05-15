import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewItem } from '../features/lists/listSlice';

export default function ItemForm({ listId }) {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addNewItem({ listId, name }));
    setName('');
  };

  return (
    <form onSubmit={onSubmit} className="flex mt-2">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Add item"
        className="flex-grow p-1 border rounded"
        required
      />
      <button type="submit" className="ml-2 p-1 rounded bg-green-500 text-white">
        +
      </button>
    </form>
  );
}
