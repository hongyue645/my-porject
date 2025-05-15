import { useDispatch } from 'react-redux';
import { removeExistingList } from '../features/lists/listSlice';
import ItemForm from './ItemForm';
import Item from './Item';

export default function ShoppingListItem({ list }) {
  const dispatch = useDispatch();

  const onDelete = () => {
    dispatch(removeExistingList(list._id));
  };

  return (
    <div className="mb-6 p-4 border rounded">
      <div className="flex justify-between items-center">
        <h2 className="text-xl">{list.name}</h2>
        <button onClick={onDelete} className="text-red-500">
          Delete
        </button>
      </div>
      <ItemForm listId={list._id} />
      {list.items?.length > 0 ? (
        <ul className="mt-2">
          {list.items.map(item => (
            <Item key={item._id} item={item} listId={list._id} />
          ))}
        </ul>
      ) : (
        <p className="mt-2 italic text-gray-500">no</p>
      )}
    </div>
  );
}
