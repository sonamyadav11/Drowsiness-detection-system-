# 😴 Drowsiness Detection System

A real-time drowsiness detection web application built using **Deep Learning** and **Computer Vision** that monitors eye state and triggers an alarm when drowsiness is detected.

---

## 📌 Features

- 🎥 Real-time webcam feed analysis
- 👁️ Detects eye state — **Open** or **Closed**
- 🔔 Audio alarm triggered after **15 consecutive closed eye frames**
- 🌐 Web interface built with **Flask**
- ⚡ Fast and lightweight using **MobileNetV2** architecture

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Language | Python |
| Deep Learning | TensorFlow, Keras |
| Computer Vision | OpenCV |
| Web Framework | Flask |
| Frontend | HTML, CSS, JavaScript |
| Model Architecture | MobileNetV2 (Transfer Learning) |

---

## 📁 Project Structure

```
drowsiness-detection-system/
│
├── app.py                  # Flask backend
├── final_drowsiness_model.h5  # Trained model
├── requirements.txt        # Dependencies
├── templates/
│   └── index.html          # Frontend UI
└── static/
    └── (css, js)
```

---

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/sonamyadav11/drowsiness-detection-system.git
cd drowsiness-detection-system
```

### 2. Install dependencies
```bash
pip install -r requirements.txt
```

### 3. Run the app
```bash
python app.py
```

### 4. Open in browser
```
http://localhost:5000
```

---

## 🧠 How It Works

1. Webcam captures real-time video frames
2. Each frame is sent to the Flask backend
3. The **MobileNetV2** model predicts eye state (Open/Closed)
4. If eyes are closed for **15+ consecutive frames**, an alarm is triggered
5. Counter resets when eyes open again

---

## 📊 Model Details

- **Architecture**: MobileNetV2 (Transfer Learning)
- **Input Size**: 224 x 224 x 3
- **Output**: Binary classification (Open / Closed)
- **Training**: Google Colab
- **Activation**: Sigmoid

---

## 🔧 Requirements

```
flask
tensorflow
numpy
opencv-python
Pillow
```

---

## 🎯 Use Cases

- 🚗 Driver drowsiness detection in vehicles
- 🏭 Workplace fatigue monitoring
- 📚 Student attention tracking

---
