import {Link} from 'react-router-dom'

function Error() {
  return (
    <div>
        <p>Page Not Found</p>
        <Link to='/'>Visit Our Page</Link>
    </div>
  )
}

export default Error
