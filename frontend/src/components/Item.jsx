import { useDispatch } from 'react-redux';
import { removeExistingItem, toggleExistingItem } from '../features/lists/listSlice';

export default function Item({ item, listId }) {
  const dispatch = useDispatch();

  return (
    <li className="flex items-center mt-1">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => dispatch(toggleExistingItem({ listId, itemId: item._id }))}
        className="mr-2"
      />
      <span className={item.checked ? 'line-through text-gray-500' : ''}>
        {item.name}
      </span>
      <button
        onClick={() => dispatch(removeExistingItem({ listId, itemId: item._id }))}
        className="ml-auto text-red-500"
      >
        ×
      </button>
    </li>
  );
}
