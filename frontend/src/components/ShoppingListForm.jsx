import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNewList } from '../features/lists/listSlice';

export default function ShoppingListForm() {
  const [name, setName] = useState('');
  const dispatch = useDispatch();

  const onSubmit = e => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch(addNewList(name));
    setName('');
  };

  return (
    <form onSubmit={onSubmit} className="flex mb-4">
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="New list name"
        className="flex-grow p-2 border rounded"
        required
      />
      <button type="submit" className="ml-2 p-2 rounded bg-blue-500 text-white">
        Add List
      </button>
    </form>
  );
}
