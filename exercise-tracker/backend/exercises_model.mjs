/**
 * Olivia Choi
 */
import mongoose from 'mongoose';
import 'dotenv/config';

const EXERCISE_DB_NAME = 'exercise_db';

let connection = undefined;

/**
 * This function connects to the MongoDB server and to the database
 *  'exercise_db' in that server.
 */
async function connect(){
    try{
        connection = await mongoose.connect(process.env.MONGODB_CONNECT_STRING, 
                {dbName: EXERCISE_DB_NAME});
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(error){
        console.log(error);
        throw Error(`Could not connect to MongoDB ${error.message}`)
    }
}

/**
 * Schema of Exercises
 */
const SchemaExercise = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, enum: ['kgs','lbs'], required: true },
    date: { type: String, required: true }
});

SchemaExercise.index({ name: 1, date: 1 }, { unique: true });

const Exercise = mongoose.model('Exercise', SchemaExercise);

/**
 * Creating a new exercise
 */
async function createExer(exerciseDate) {
    const newExer = new Exercise(exerciseDate);
    return await newExer.save();
}

/**
 * Retrieve all exercises
 */
async function getAllExer() {
    return await Exercise.find({});
}

/**
 * Retrieve specific exercise using its ID
 */
async function getExerById(id) {
    return await Exercise.findById(id);
}

/**
 * Updating exercise using its Id
 */
async function updateExerById(id, updatedData) {
    return await Exercise.findByIdAndUpdate(id, updatedData, {
        new: true,
        runValidators: true
    });
}

/**
 * Delete specific exercise using its ID
 */
async function deleteExerById(id) {
    return await Exercise.findByIdAndDelete(id);
}

export { connect, createExer, getAllExer, getExerById, updateExerById, deleteExerById };