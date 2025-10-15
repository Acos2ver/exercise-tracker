import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RiEditFill } from "react-icons/ri";

export default function EditExercisePage() {
    const{ id } = useParams();
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadExer = async () => {
            try {
                const response = await fetch(`/exercises/${id}`);
                if (response.ok) {
                    const data = await response.json();
                    setName(data.name);
                    setReps(data.reps);
                    setWeight(data.weight);
                    setUnit(data.unit);
                    setDate(data.date);
                } else {
                    alert('Failed to load exercise.');
                    navigate('/');
                }
            } catch (error) {
                console.error('Error to find exercise:', error);
                alert('Loading error due to server error.');
                navigate('/');
            }
        };
        loadExer();
    }, [id, navigate]);

    const controlSubmit = async (e) => {
        e.preventDefault();

        const updatedExer = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date
        };

        try {
            const response = await fetch(`/exercises/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedExer)
            });

            if (response.status === 200) {
                alert('Successfully edited exercise!');
                navigate('/');
            } else {
                alert('Failed to edit exercise! Status code: 400');
                navigate('/');
            }
        } catch (error) {
            console.error('Error updating exercise:', error);
            alert('Failed updating due to server error.');
            navigate('/');
        }
    };

    return (
        <section>
            <h2 class="homeTitle">Edit Exercise</h2>
            <form onSubmit={controlSubmit} className="form-layout">
                <label>
                    Name:
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)}
                        required />
                </label>

                <label>
                    Reps:
                    <input type="number" value={reps} onChange={(e) => setReps(e.target.value)}
                        required />
                </label>

                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)}
                        required />
                </label>

                <label>
                    Unit:
                    <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
                        <option value="">Select unit</option>
                        <option value="kgs">kgs</option>
                        <option value="lbs">lbs</option>
                    </select>
                </label>

                <label>
                    Date:
                    <input type="text" value={date} onChange={(e) => setDate(e.target.value)}
                        placeholder="MM-DD-YY" required />
                </label>

                <button type="submit" title="Update Exercise">
                    <RiEditFill size={20} />
                </button>
            </form>
        </section>
    );
}