import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../components/Spinner'
import ShoppingListForm from '../components/ShoppingListForm'
import ShoppingListItem from '../components/ShoppingListItem'
import { getLists } from '../features/lists/listSlice'

export default function Dashboard() {
  console.log('全局 state:', useSelector(state => state))
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { lists, isLoading } = useSelector(state => state.lists)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    dispatch(getLists())
  }, [user, navigate, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Your Shopping Lists</p>
      </section>

      <ShoppingListForm />

      <section className="content">
        {lists.length > 0 ? (
          <div className="lists">
            {lists.map(list => (
              <ShoppingListItem key={list._id} list={list} />
            ))}
          </div>
        ) : (
          <h3>You have no shopping lists</h3>
        )}
      </section>
    </>
  )
}
