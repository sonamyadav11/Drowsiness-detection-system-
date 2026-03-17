const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const alarmSound = document.getElementById("alarmSound");
const stopAlarmBtn = document.getElementById("stopAlarmBtn");

let stream = null;
let cameraOn = false;

let drowsyCount = 0;
let threshold = 15;

// CAMERA TOGGLE
startBtn.addEventListener("click", async () => {

    if (!cameraOn) {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            video.srcObject = stream;
            cameraOn = true;
            startBtn.innerText = "Stop Camera";
            statusText.innerText = "Driver Status: Camera Started";
            statusText.className = "safe";
        } catch (err) {
            alert("Camera access denied!");
        }
    } else {
        stream.getTracks().forEach(track => track.stop());
        video.srcObject = null;
        cameraOn = false;
        startBtn.innerText = "Start Camera";
        statusText.innerText = "Driver Status: Camera Stopped";
        statusText.className = "safe";

        alarmSound.pause();
        alarmSound.currentTime = 0;
    }
});

// MANUAL ALARM STOP
stopAlarmBtn.addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
});

// SEND FRAME TO BACKEND
function sendFrameToBackend() {

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL("image/jpeg");

    fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => {

        if (data.status === "Drowsy") {

            drowsyCount++;
            console.log("Drowsy count:", drowsyCount);

            if (drowsyCount >= threshold) {
                statusText.innerText = "Driver Status: DROWSY!";
                statusText.className = "alert";
                alarmSound.play();
            }

        } else {

            drowsyCount = 0;
            statusText.innerText = "Driver Status: Alert";
            statusText.className = "safe";
            alarmSound.pause();
            alarmSound.currentTime = 0;
        }

    })
    .catch(err => console.error(err));
}

// CHECK EVERY 0.5 SECOND
setInterval(() => {
    if (cameraOn) {
        sendFrameToBackend();
    }
}, 500);