const urlInput = document.querySelector("#url");
const downloadBtn = document.querySelector("#download-btn");
const thumbnailImg = document.querySelector("#thumbnail-img");
const title = document.querySelector(".title");
const size = document.querySelector(".size");
const video720 = document.querySelector("#video-720");
const video360 = document.querySelector("#video-360");
const audio48 = document.querySelector("#audio-48");
const audio128 = document.querySelector("#audio-128");
const server = "http://localhost:5000";
const toast = document.querySelector(".toast");
const details = document.querySelector(".show-details");


urlInput.onchange = () => {
    details.style.visibility = "hidden";
};

downloadBtn.addEventListener("click", async (e) => {
    const link = urlInput.value;
    const res = await fetch(`${server}/verify`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "link": link
        })
    });
    const data = await res.json()
    if (data == "200") {
        getData(link);
    }
    else {
        showToast("Invalid Link", "red");
    }
});

video720.addEventListener("click", async (e) => {
    const link = urlInput.value;
    showToast("Downloading...","#03a9f4")
    const res = await fetch(`${server}/download/video720`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "link": link
        })
    });
    const data = await res.json();
    if (data == "200"){
        showToast("Downloaded Successfully","#03a9f4");
    }
    else {
        showToast("Something went wrong","red");
    }
});

video360.addEventListener("click", async (e) => {
    const link = urlInput.value;
    showToast("Downloading...","#03a9f4");
    const res = await fetch(`${server}/download/video360`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "link": link
        })
    });
    const data = await res.json();
    if (data == "200"){
        showToast("Downloaded Successfully","#03a9f4");
    }
    else {
        showToast("Something went wrong","red");
    }
});

audio48.addEventListener("click", async (e) => {
    const link = urlInput.value;
    showToast("Downloading...","#03a9f4");
    const res = await fetch(`${server}/download/audio48`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "link": link
        })
    });
    const data = await res.json();
    if (data == "200"){
        showToast("Downloaded Successfully","#03a9f4");
    }
    else {
        showToast("Something went wrong","red");
    }
});

audio128.addEventListener("click", async (e) => {
    const link = urlInput.value;
    showToast("Downloading...","#03a9f4");
    const res = await fetch(`${server}/download/audio128`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "link": link
        })
    });
    const data = await res.json();
    if (data == "200"){
        showToast("Downloaded Successfully","#03a9f4")
    }
    else {
        showToast("Something went wrong","red");
    }
});

const getData = async (link) => {
    const res = await fetch(`${server}/getData`, {
        method: "POSt",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "link": link
        })
    });
    const data = await res.json();
    details.style.visibility = "visible";
    thumbnailImg.setAttribute("src", data.thumbnail);
    thumbnailImg.setAttribute("alt", data.title);
    title.innerText = data.title;
    size.innerText = data.length;
};

let toastTimer;
// the toast function
const showToast = (msg , bg) => {
  clearTimeout(toastTimer);
  toast.innerText = msg;
  toast.style.background = bg;
  toast.classList.add("show");
  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2000);
};