// import required packages
const express = require("express");
const Groq = require("groq-sdk");
const cors = require("cors");
const path = require('path');

require("dotenv").config();

// create necessary variables
const app = express();
const groq = new Groq({
    apiKey: process.env.API_KEY
});
const PORT = process.env.PORT || 5000;
app.use(cors());

// Serve static files from the React app (Vite's `dist` folder)
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// define middleware - parse string into json for server to use
app.use(express.json());

// create routes and have route handler handle the API request
// test route
const messages = [{
    role: "system",
    content: "I will give you a question and the answer. In one sentence, explain why the answer is correct or give more details."
},
{
    role: "user",
    content: "Question: What was the third country to have a McDonald's restaurant? Answer: Costa Rica"
}]

app.get("/ai/test", async (req, res) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: messages,
            model: "llama3-8b-8192",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: true,
            stop: null
          });
      
          // you need to do this loop because you want to concat each separate chunk received as a complete response
          let response = '';
          for await (const chunk of chatCompletion) {
            response += chunk.choices[0]?.delta?.content || '';
          }
          console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
})

// route that takes in client input and parses it into desired format
app.post("/ai/data", async (req, res) => {
    try {
        const inputMessages = [{
            role: "system",
            content: "I will give you a question and the answer. In one sentence, explain why the answer is correct or give more details."
        },{
            role: "user",
            content: req.body.questionAnswer // in client code, this is the property name
        }]
        const chatCompletion = await groq.chat.completions.create({
            messages: inputMessages,
            model: "llama3-8b-8192",
            temperature: 1,
            max_tokens: 1024,
            top_p: 1,
            stream: true,
            stop: null
          });
      
          // you need to do this loop because you want to concat each separate chunk received as a complete response
          let response = '';
          for await (const chunk of chatCompletion) {
            response += chunk.choices[0]?.delta?.content || '';
          }
          console.log(response);
        res.json(response);
    } catch (error) {
        console.error('Error fetching data:', error.message);
        res.status(500).json({ error: 'Error fetching data' });
    }
})

// start server / have it listen to requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
