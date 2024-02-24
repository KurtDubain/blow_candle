const startButton = document.getElementById("startButton");
const candle = document.querySelector(".candle");
const flame = document.querySelector(".flame");
const message = document.getElementById("message");

let isBlown = false;
// 吹灭蜡烛触发
function extinguishCandle() {
  if (!isBlown) {
    isBlown = true;
    // for (let candle of candles) {
    //   setTimeout(() => {
    //     candle.style.background = "#ccc";
    //   }, 1000);
    // }
    // for (let flame of flames) {
    //   setTimeout(() => {
    //     flame.style.display = "none";
    //   }, 1000);
    // }
    // for (let i = 1; i <= candles.length; i++) {
    //   let candle = candles[i - 1];
    //   let flame = flames[i - 1];
    //   setTimeout(() => {
    //     candle.style.background = "#ccc";
    //     flame.style.display = "none";
    //   }, 300 * i);
    // }
    candle.style.background = "#ccc";
    flame.style.display = "none";
    message.textContent = "生日快乐！";
    message.style.opacity = 1;
  }
}

startButton.addEventListener("click", function () {
  // 在用户点击按钮时请求麦克风权限
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      microphone.connect(analyser);
      // 更新麦克风获取到的内容
      function update() {
        analyser.getByteFrequencyData(dataArray);
        const average =
          dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
        // 声音起始值
        const threshold = 16;

        // if (average > threshold) {
        // //   flame.style.display = "block";
        // } else {
        // //   flame.style.display = "none";
        // }
        // 当所获取的分贝平均值大于了阈值,触发吹灭蜡烛
        if (average > threshold) {
          extinguishCandle();
          //   flame.style.display = "none";
        }
        // 定期执行更新操作
        requestAnimationFrame(update);
      }

      update();
    })
    .catch(function (err) {
      console.log("Error:", err);
    });
});
