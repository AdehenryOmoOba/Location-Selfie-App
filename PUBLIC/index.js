if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    document.getElementById("lat").textContent = latitude;
    document.getElementById("lon").textContent = longitude;
  });
}

function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(320, 240);

  const button = document.getElementById("btn");
  button.addEventListener("click", async (event) => {
    event.preventDefault();

    const hobbies = document.getElementById("likes").value;
    video.loadPixels();
    const image64 = video.canvas.toDataURL();

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        document.querySelector("form").reset();
        // console.log(position.coords.latitude)
        // console.log(position.coords.longitude)

        //    console.log(position);
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const timestamp = position.timestamp;
        const hobby = hobbies;

        const data = {
          latitude,
          longitude,
          accuracy,
          timestamp,
          hobbies,
          image64,
        };

        // console.log(data)
        const options = {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(data),
        };

        const response = await fetch("/api", options);
        const info = await response.json();
        console.log(info);
      });
    } else {
    }
  });
}
