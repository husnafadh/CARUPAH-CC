from fastapi import FastAPI
import tensorflow as tf
import nltk
import json
import pickle
import random
import string
from nltk.stem import WordNetLemmatizer
from pydantic import BaseModel
from fastapi import FastAPI, UploadFile, File
import uvicorn
import carupai


nltk.download('punkt')
nltk.download('wordnet')

# Load words and classes
words = pickle.load(open('./ml_models/data_words_carupai.pkl', 'rb'))
classes = pickle.load(open('./ml_models/data_classes_carupai.pkl', 'rb'))

# Load model
model = tf.keras.models.load_model('./ml_models/chatbot_model.h5')

# Load intents data
with open('./ml_models/chatbot-carupai.json') as f:
    intents = json.load(f)

# Lemmatizer
lemmatizer = WordNetLemmatizer()

# Preprocess input text
def preprocess_input(text):
    words_in_sentence = nltk.word_tokenize(text)
    words_in_sentence = [lemmatizer.lemmatize(word.lower()) for word in words_in_sentence if word not in string.punctuation]
    return words_in_sentence

# Bag of words from sentence
def bow(sentence, words):
    words_in_sentence = preprocess_input(sentence)
    bag = [0] * len(words)

    for word in words_in_sentence:
        for i, w in enumerate(words):
            if w == word:
                bag[i] = 1

    return bag

# Predict the intent class for the user message
def predict_class(sentence):
    input_data = bow(sentence, words)
    input_tensor = tf.convert_to_tensor([input_data], dtype=tf.float32)
    predictions = model.predict(input_tensor).flatten()
    class_index = tf.argmax(predictions).numpy()
    return classes[class_index]

# Generate a response based on the predicted intent class
def generate_response(intent_class):
    intent = next((i for i in intents['intents'] if i['tag'] == intent_class), None)
    responses = intent['responses'] if intent else []
    response = random.choice(responses) if responses else 'Sorry, I am not sure how to respond.'
    return response

app = FastAPI()

class UserMessage(carupai.BaseModel):
    message: str

@app.post('/carupai')
def chat(user_message: UserMessage):
    message = user_message.message
    intent_class = carupai.predict_class(message)
    response = carupai.generate_response(intent_class)
    return {'message': response}

if __name__ == "__main__":
    uvicorn.run(app, port=8080, host='127.0.0.1')