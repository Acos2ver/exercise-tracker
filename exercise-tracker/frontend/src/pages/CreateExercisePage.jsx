import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdLibraryAddCheck } from "react-icons/md";

export default function CreateExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');
    const navigate = useNavigate();

    const controlSubmit = async (e) => {
        e.preventDefault();

        const newExer = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date
        };

        try {
            const response = await fetch('/exercises', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newExer)
            });

            if (response.status === 201) {
                alert('Successfully created exercise!');
                navigate('/');
            } else {
                alert('Failed to create exercise! Status code: 400');
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Exercise creation failed due to server error.')
            navigate('/');
        }
    };

    return (
        <section>
            <h2 class="homeTitle">Input Exercise Details</h2>
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

                <button type="submit" title="Create Exercise">
                    <MdLibraryAddCheck size={20}/>
                </button>
            </form>
        </section>
    );
}