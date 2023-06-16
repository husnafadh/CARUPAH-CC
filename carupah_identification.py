from fastapi import FastAPI, UploadFile, File
from PIL import Image
import numpy as np
import tensorflow as tf
import uvicorn

app = FastAPI()

# Load the saved TensorFlow Lite model
# interpreter = lite.Interpreter(model_path='carupah_model_2.tflite')
# interpreter.allocate_tensors()
# input_details = interpreter.get_input_details()
# output_details = interpreter.get_output_details()

#Load the saved keras module
model = tf.keras.models.load_model('identification_model.h5')

# Load the class labels
# class_labels = ['class1', 'class2', 'class3', 'class4', 'class5', 'class6']
class_labels = ['Alumunium', 'Cardboard', 'Detergent', 'Glass', 'HDPEM', 'PET']

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    # Read the image file
    image = Image.open(file.file)
    image = image.resize((256, 256))  
    image = np.array(image) / 255.0  

    # Save the image
    save_path = f"saved_images/{file.filename}"
    image_pil = Image.fromarray((image * 255).astype(np.uint8))
    image_pil.save(save_path)

    # Preprocess the input image for TensorFlow Lite model
    # input_image = np.expand_dims(image, axis=0).astype(input_details[0]['dtype'])
    # interpreter.set_tensor(input_details[0]['index'], input_image)

    # Run inference
    # interpreter.invoke()

    # Get the output tensor
    # output = interpreter.get_tensor(output_details[0]['index'])
    # predicted_class = class_labels[np.argmax(output)]

    # Preprocess the input image
    input_image = np.expand_dims(image, axis=0)

    # Perform inference
    predictions = model.predict(input_image)
    predicted_class_index = np.argmax(predictions)
    predicted_class = class_labels[predicted_class_index]

    return {"predicted_class": predicted_class}

if __name__ == "__main__":
    uvicorn.run(app, port=8080, host='0.0.0.0')
