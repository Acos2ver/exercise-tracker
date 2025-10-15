import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable.jsx';

export default function HomePage() {
    const [exercises, setExercises] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Mounting (load data)
    useEffect(() => {
        loadExer();
    }, []);

    // Retrieve all exercises
    const loadExer = async () => {
        try {
            const response = await fetch('/exercises');

            if (response.ok) {
                const data = await response.json();
                setExercises(data);
            } else {
                console.error('Failed to find exercises');
            }
        } catch (error) {
            console.error('Error finding exercises:', error);
        } finally {
            setLoading(false);
        }
    }

    const deleteExer = async (id) => {
        try {
            const response = await fetch(`/exercises/${id}`, {
                method: 'DELETE'
            });
            
            if (response.status === 204) {
                setExercises(prev => prev.filter(ex => ex._id !== id));
            } else {
                alert('Failed to delete exercise');
            }
        } catch (error) {
            console.error('Error deleting exercise:', error);
            alert('Error deleting exercise');
        }
    };

    const editExer = (exercise) => {
        navigate(`/edit/${exercise._id}`);
    };

    if (loading) return <p>Loading exercises...</p>;

    return (
        <section>
            <h2 class="homeTitle">Exercise Log</h2>

            <div style={{ marginBottom: '1rem' }}>
                <Link to="/create" className="btn">+ Create New Exercise</Link>
            </div>

            {exercises.length === 0 ? (
                <p>No exercises found. <Link to="/create">Create your first exercise!</Link></p>
            ) : (
                <ExerciseTable exercises={exercises} onDelete={deleteExer} onEdit={editExer} />
            )}
        </section>
    );
}