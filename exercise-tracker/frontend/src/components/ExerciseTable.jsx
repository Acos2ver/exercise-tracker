import ExerciseRow from './ExerciseRow.jsx';

export default function ExerciseTable({ exercises, onDelete, onEdit }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Reps</th>
                    <th>Weight</th>
                    <th>Unit</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {exercises.map(ex => (
                    <ExerciseRow key={ex._id} exercise={ex} onDelete={onDelete} onEdit={onEdit} />
                ))}
            </tbody>
        </table>
    );
}