const express=require("express")
const cors=require("cors")
const axios=require("axios")
require("dotenv").config()

const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hello")
})

app.post("/convert",async (req,res)=>{

    try {
        const {code,targetedlanguage}=req.body

      
        const openaiApiKey=process.env.OPENAI_API_KEY
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions', 
            {
                model: "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": "you are a code converter who can convert code from any programming language to another programming language. For example, from JavaScript to Python. The response should contain only the converted code."
                    },
                    {
                        "role": "user",
                        "content": `convert ${code} into ${targetedlanguage}`
                    }
                ]
                
                    
            },
            {
              headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const convertedCode=openaiResponse.data.choices[0].message.content
          
          res.status(200).send(convertedCode)
    } catch (error) {
        res.status(500).send(error)
        // console.log(error);
    }

})



app.post("/debugger",async (req,res)=>{

    try {
        const {code}=req.body

      
        const openaiApiKey=process.env.OPENAI_API_KEY
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions', 
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                      "role": "system",
                      "content": "you are a code debugger who can debug a given piece of code. in response it should be only converted code .in response first you need to highlight the issues pointwise. and then provide the corrected code with comment where you have corrected. add fix comments only those lines where you have corrected or added extra."
                    },
                    {
                      "role": "user",
                      "content": code
                    }
                  ]
                
                    
            },
            {
              headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const debuggedCode=openaiResponse.data.choices[0].message.content
          
          res.status(200).send(debuggedCode)
    } catch (error) {
        res.status(500).send(error)
        // console.log(error);
    }

})



app.post("/quality",async (req,res)=>{

    try {
        const {code}=req.body

        const qualityPromt="you are a code code quality checker who can check a given piece of code on this following parameter: Code Quality Review:1. Code Consistency: Evaluate the code for consistent coding style, naming conventions, and formatting. 2. Code Performance: Assess the code for efficient algorithms, optimized data structures, and overall performance considerations. Identify potential bottlenecks and provide recommendations for enhancing performance.3. Code Readability: Analyze the code for readability and comprehensibility. Suggest improvements to make the code more understandable and well-documented.4. Error Handling: Review the code's error-handling practices, including exception handling and error messages. Highlight any potential issues and suggest robust error-handling strategies.5. Security: Examine the code for security vulnerabilities, such as SQL injection, cross-site scripting, and data validation. Identify potential security risks and propose security enhancements.6. Code Documentation: Evaluate the code's documentation, including comments and documentation strings. Recommend improvements for more informative and well-documented code.7. Testing: Review the code's testing practices, including unit tests, integration tests, and test coverage. Suggest improvements to enhance code reliability and testing completeness.8. Code Structure: Analyze the code's overall structure, including modularization and organization. Provide feedback on code organization and suggest structural improvements. 9. Maintainability: Assess the code's maintainability, considering factors like code complexity and code smells. Identify areas that may pose future maintenance challenges and provide recommendations. in response you have to give a short the feedback based on these parameter. each feedback should be within 20 words and give a score percentage wise for each parameter like:code structure:20% etc.."
      
        const openaiApiKey=process.env.OPENAI_API_KEY
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions', 
            {
                model: "gpt-3.5-turbo",
                messages: [
                    {
                      "role": "system",
                      "content": qualityPromt
                    },
                    {
                      "role": "user",
                      "content": code
                    }
                  ]
                
                    
            },
            {
              headers: {
                'Authorization': `Bearer ${openaiApiKey}`,
                'Content-Type': 'application/json',
              },
            }
          );
          const qualityResponse=openaiResponse.data.choices[0].message.content
          
          res.status(200).send(qualityResponse)
    } catch (error) {
        res.status(500).send(error)
        // console.log(error);
    }

})

app.listen(8000,()=>{
    console.log("server is running");
})

