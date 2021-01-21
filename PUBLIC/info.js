geoData();
async function geoData() {
  const response = await fetch("/api");
  const data = await response.json();

  for (item of data) {
    const parent = document.createElement("p");
    const hobby = document.createElement("p");
    const geo = document.createElement("p");
    const date = document.createElement("p");
    const image = document.createElement("img");

    hobby.textContent = `Hobbies: ${item.hobbies}`;
    geo.textContent = `${item.latitude}, ${item.longitude}`;
    const dateString = new Date(item.timestamp).toLocaleString();
    date.textContent = dateString;
    image.setAttribute("src", item.image64);
    parent.append(geo, date, hobby, image);
    document.body.append(parent);
  }
  console.log(data);
}
