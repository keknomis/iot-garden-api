require('dotenv').config();
const cors = require('cors')

const express = require('express');

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const app = express();
app.use(cors());

const PORT =  3000;

app.get('/', (req, res) => {
    res.send('hello world')
})

app.get('/sensor-readings', async (req, res) => {
    const { data: sensorReadings, error } = await supabase
        .from('sensor_readings')
        .select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(sensorReadings);
});


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})



// app.use(cors({
//   origin: 'http://localhost:5173'
// }));