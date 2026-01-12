import React, {useState} from 'react'
import {Card, Typography, Flex, Button, Spin} from 'antd'
import './Services.css'
import axios from 'axios'

function Services() {

    const [predictionText, setPredictionText] = useState('')
    const [paraphraseText, setParaphraseText] = useState('')
    const [plagiarismText, setPlagiarismText] = useState('')


    const [predictionResult, setPredictionResult] = useState('')
    const [paraphraseResult, setParaphraseResult] = useState('')
    const [plagiarismResult, setPlagiarismResult] = useState('')

    const handlePredictionSubmit = (event) => {
        event.preventDefault()
        setPredictionResult(<Spin/>)
        axios.post('http://localhost:2000/prediction', { text: predictionText})
        .then(result => {
            setPredictionResult("Result: " + result.data)
        })
    }

    const handleParaphraseSubmit = (event) => {
        event.preventDefault()
        setParaphraseResult(<Spin/>)
        axios.post('http://localhost:2000/paraphrase', { text: paraphraseText})
        .then(result => {
            setParaphraseResult("Result: " + result.data)
        })
    }

    const handlePlagiarismSubmit = (event) => {
        event.preventDefault()
        setPlagiarismResult(<Spin/>)
        axios.post('http://localhost:2000/plagiarism', { text: plagiarismText})
        .then(result => {
            setPlagiarismResult(
                <div>
                    <p><u>Result:</u></p>
                    <p><u>AI Percentage:</u> {result.data.ai_percentage}</p>
                    <p><u>Average Score:</u> {result.data.average_score}</p>
                    <p><u>Content label:</u> {result.data.content_label}</p>
                    <p><u>GPT-Zero label:</u> {result.data.gptzero_me_label}</p>
                </div>
            );
        })
    }

    return (
        <div className='services-container'>

            <Card style={{ padding: '20px'}} >
                <Flex vertical gap='50px'>
                    <Flex vertical align='flex-start'>
                        <Typography.Title level={2} strong>
                        Grade Prediction
                        </Typography.Title>
                        <Typography.Text type='secondary' strong>
                        Leveraging BrainJS's LSTM architecture, our system can accurately predict the grade for user-passed text. 
                        This cutting-edge technology enables predictive modeling, allowing us to capture intricate relationships and patterns in past sequential data. 
                        By training the neural network on sample data and relevant grades, our system ensures instant responses to grade prediction requests.
                        </Typography.Text>
                    </Flex>
                    <Flex gap='large'>
                        <Button type='primary' size='large' onClick={handlePredictionSubmit}>Submit</Button>
                        <input className='services-input' placeholder='Text...' type="text" onChange={(e) => setPredictionText(e.target.value)}/>
                    </Flex>

                    <Typography.Text type='secondary' strong>
                        {predictionResult}
                    </Typography.Text>
                </Flex>
            </Card>


            <Card style={{padding: '20px', marginTop: '30px'}} >
                <Flex vertical gap='35px'>
                    <Flex vertical align='flex-start'>
                        <Typography.Title level={2} strong>
                        Paraphrase
                        </Typography.Title>
                        <Typography.Text type='secondary' strong>
                        Through our integration with RapidAPI, we offer users access to cutting-edge paraphrasing AI tools. 
                        RapidAPI serves as the gateway to a multitude of APIs, including those tailored for app development and machine learning. 
                        In our project, we have seamlessly connected two APIs from RapidAPI on the server side, allowing users to effortlessly rephrase their text. 
                        The user's input is transmitted to the RapidAPI server for processing, and the resulting paraphrased text is swiftly returned to the user. 
                        </Typography.Text>
                    </Flex>
                    
                    <Flex gap='large'>
                        <Button type='primary' size='large' onClick={handleParaphraseSubmit}>Submit</Button>
                        <input className='services-input' placeholder='Text...' type="text" onChange={(e) => setParaphraseText(e.target.value)}/>
                    </Flex>

                    <Typography.Text type='secondary' strong>
                        {paraphraseResult}
                    </Typography.Text>
                    
                    
                </Flex>
            </Card>

            <Card style={{padding: '20px', marginTop: '30px'}}>
                <Flex vertical gap='50px'>
                    <Flex vertical align='flex-start'>
                        <Typography.Title level={2} strong>
                        Plagiarism checking
                        </Typography.Title>
                        <Typography.Text type='secondary' strong>
                        Our web application harnesses the power of external APIs through RapidAPI, seamlessly integrating plagiarism detection functionalities into our platform. 
                        By connecting with RapidAPI's diverse range of APIs, including those for machine learning and data analysis, we offer users a comprehensive plagiarism checking tool. 
                        Users simply submit their text, which is then routed to the RapidAPI server for analysis.
                        </Typography.Text>
                    </Flex>
                    <Flex gap='large'>
                        <Button type='primary' size='large' onClick={handlePlagiarismSubmit}>Submit</Button>
                        <input className='services-input' placeholder='Text...' type="text" onChange={(e) => setPlagiarismText(e.target.value)}/>
                    </Flex>

                    <Typography.Text type='secondary' strong>
                        {plagiarismResult}
                    </Typography.Text>
                </Flex>
            </Card>
        </div>
    )
}

export default Services