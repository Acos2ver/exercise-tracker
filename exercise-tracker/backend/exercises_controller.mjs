/**
 * Olivia Choi
 */
import 'dotenv/config';
import express, { response } from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercises_model.mjs';

const PORT = process.env.PORT;
const app = express();

app.use(express.json());

app.listen(PORT, async () => {
    await exercises.connect()
    console.log(`Server listening on port ${PORT}...`);
});

// POST /exercises creates a new valid exercise
app.post('/exercises', asyncHandler(async (request, response) => {
    const exercise = request.body

    // Check if fields are valid by conditions
    const fields = ['name', 'reps', 'weight', 'unit', 'date'];
    const hasAll = fields.every(key => key in exercise);
    const noAddition = Object.keys(exercise).every(key => fields.includes(key));

    if (!hasAll || !noAddition) {
        return response.status(400).json({ Error: "Invalid request" });
    }

    const { name, reps, weight, unit, date } = exercise;

    // Check valid individual fields
    const validName = typeof name === 'string' && name.trim().length > 0;
    const validReps = Number.isInteger(reps) && reps > 0;
    const validWeight = Number.isInteger(weight) && weight > 0;
    const validUnit = unit === 'kgs' || unit === 'lbs';
    const validDate = /^\d{2}-\d{2}-\d{2}$/.test(date);

    if (!validName || !validReps || !validWeight || !validUnit || !validDate) {
        return response.status(400).json({ Error: "Invalid request" });
    }

    try {
        const newExer = await exercises.createExer(exercise);
        return response.status(201).json(newExer);
    } catch (error) {
        if (error.code === 11000) {
            return response.status(400).json({ Error: "Invalid request" })
        }
        throw error;
    }
}));

// Get /exercises retrieves all exercises
app.get('/exercises', asyncHandler(async (request, response) => {
    const allExers = await exercises.getAllExer();
    return response.status(200).json(allExers);
}));

// Get /exercises/:_id retrieves specific exercise using its ID
app.get('/exercises/:_id', asyncHandler(async (request, response) => {
    const { _id } = request.params;

    try {
        const found = await exercises.getExerById(_id);

        if (!found) {
            return response.status(404).json({ Error: "Not found"})
        } 
        return response.status(200).json(found);
    } catch (error) {
        return response.status(404).json({ Error: "Not found" });    // Wrong ObjectID
    }
}));

// PUT /exercises/:_id updates exercise using its ID
app.put('/exercises/:_id', asyncHandler(async (request, response) => {
    const { _id } = request.params;
    const exercise = request.body;

    // Check if fields are valid by conditions
    const fields = ['name', 'reps', 'weight', 'unit', 'date'];
    const hasAll = fields.every(key => key in exercise);
    const noAddition = Object.keys(exercise).every(key => fields.includes(key));

     if (!hasAll || !noAddition) {
        return response.status(400).json({ Error: "Invalid request" });
    }

    const { name, reps, weight, unit, date } = exercise;

    // Check valid individual fields
    const validName = typeof name === 'string' && name.trim().length > 0;
    const validReps = Number.isInteger(reps) && reps > 0;
    const validWeight = Number.isInteger(weight) && weight > 0;
    const validUnit = unit === 'kgs' || unit === 'lbs';
    const validDate = /^\d{2}-\d{2}-\d{2}$/.test(date);

    if (!validName || !validReps || !validWeight || !validUnit || !validDate) {
        return response.status(400).json({ Error: "Invalid request" });
    }

    // Update valid exercise 
    try {
        const updatedExer = await exercises.updateExerById(_id, exercise);

        if (!updatedExer) {
            return response.status(404).json({ Error: "Not found" });
        }
        return response.status(200).json(updatedExer);
    } catch (error) {
        return response.status(404).json({ Error: "Not found"});
    }
}));


// DELETE /exercises/:_id deletes specific exercise with target ID
app.delete('/exercises/:_id', asyncHandler(async (request, response) => {
    const { _id } = request.params;

    try {
        const deletedExer = await exercises.deleteExerById(_id);

        if (!deletedExer) {
            return response.status(404).json({ Error: "Not found"});
        }
        return response.sendStatus(204);
    } catch (error) {
        return response.status(404).json({ Error: "Not found" });    // Wrong ObjectID 
    }
}));

