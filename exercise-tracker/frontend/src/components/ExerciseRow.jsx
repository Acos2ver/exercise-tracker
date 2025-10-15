import { RiEditFill } from "react-icons/ri";
import { FaTrash } from "react-icons/fa6";

export default function ExerciseRow({ exercise, onDelete, onEdit }) {
    const { name, reps, weight, unit, date } = exercise;

    return (
        <tr>
            <td>{name}</td>
            <td>{reps}</td>
            <td>{weight}</td>
            <td>{unit}</td>
            <td>{date}</td>
            <td className="actionButton">
                <button onClick={() => onEdit(exercise)} aria-label="Edit exercise" className="actionIcon">
                    <RiEditFill />
                </button>
                <button onClick={() => onDelete(exercise._id)} aria-label="Delete exercise" className="actionIcon">
                    <FaTrash />
                </button>
            </td>
        </tr>
    );
}