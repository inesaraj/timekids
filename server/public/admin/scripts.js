// Login form
document.getElementById("login-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = e.target[0].value;
  const password = e.target[1].value;
  fetch("/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) window.location.href = data.redirect;
      else alert("Login failed!");
    });
});

// Load blogs
function loadBlogs() {
  fetch("/blogs")
    .then((res) => res.json())
    .then((blogs) => {
      const tableBody = document.getElementById("blog-table-body");
      tableBody.innerHTML = blogs
        .map(
          (blog) => `
            <tr>
                <td>${blog.id}</td>
                <td><img src="${blog.image}" width="50"></td>
                <td>${blog.title}</td>
                <td>${blog.content.substring(0, 50)}...</td>
                <td><button>Edit</button><button>Delete</button></td>
            </tr>
        `
        )
        .join("");
    });
}

// Add Blog form
document.getElementById("add-blog-form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {
    title: formData.get("title"),
    image: URL.createObjectURL(formData.get("image")),
    content: formData.get("content"),
  };
  fetch("/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then(() => {
      loadBlogs();
      document.getElementById("add-blog-modal").style.display = "none";
    });
});

// Open/close modal
document.getElementById("add-blog-btn")?.addEventListener("click", () => {
  document.getElementById("add-blog-modal").style.display = "block";
});
document.getElementById("close-modal")?.addEventListener("click", () => {
  document.getElementById("add-blog-modal").style.display = "none";
});
