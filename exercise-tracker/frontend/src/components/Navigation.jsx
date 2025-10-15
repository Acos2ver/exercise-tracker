import { Link } from 'react-router-dom';

export default function Navigation() {
    return (
        <nav style={{ padding: '1rem', borderBottom: '1px solid #grey' }}>
            <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
            <Link to="/create">Create</Link>
        </nav>
    );
}