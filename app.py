from flask import Flask, render_template, request, jsonify
import tensorflow as tf
import tf_keras as keras
import numpy as np
import cv2
import base64
from PIL import Image
import io
app = Flask(__name__)

# Load model once at startup
model = keras.models.load_model(
    "final_drowsiness_model.h5",
    compile=False
)

# Global counter for consecutive closed eyes
closed_count = 0
THRESHOLD = 15

@app.route("/")
def home():
    return render_template("index.html")


@app.route("/predict", methods=["POST"])
def predict():
    global closed_count

    data = request.json["image"]

    # Remove base64 header
    image_data = data.split(",")[1]

    # Decode image
    image_bytes = base64.b64decode(image_data)
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    # Resize to model input size
    image = image.resize((224, 224))

    # Convert to array
    image = np.array(image)

    # Normalize (IMPORTANT – adjust if you trained differently)
    image = image / 255.0

    # Add batch dimension
    image = np.expand_dims(image, axis=0)

    # Prediction
    prediction = model.predict(image)[0][0]

    # Since sigmoid → output between 0 and 1
    if prediction > 0.5:
        status = "Closed"
        closed_count += 1
    else:
        status = "Open"
        closed_count = 0

    # Check threshold
    if closed_count >= THRESHOLD:
        alarm = True
    else:
        alarm = False

    return jsonify({
        "status": status,
        "confidence": float(prediction),
        "closed_count": closed_count,
        "alarm": alarm
    })


if __name__ == "__main__":
    app.run(debug=True)