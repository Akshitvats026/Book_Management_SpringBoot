const API = "http://localhost:8085/books";

let editId = null;

function loadBooks() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const list = document.getElementById("bookList");
            list.innerHTML = "";
            data.forEach(book => {
                list.innerHTML += `
                    <tr>
                        <td>${book.id}</td>
                        <td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editBook(${book.id}, '${book.title}', '${book.author}')">Edit</button>
                            <button class="action-btn delete-btn" onclick="deleteBook(${book.id})">Delete</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    if (!title || !author) {
        alert("Please enter both Title and Author!");
        return;
    }

    if (editId) {
        fetch(`${API}/${editId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title, author })
        }).then(() => {
            editId = null;
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            loadBooks();
        });
    } else {
        fetch(API, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ title, author })
        }).then(() => {
            document.getElementById("title").value = "";
            document.getElementById("author").value = "";
            loadBooks();
        });
    }
}

function editBook(id, title, author) {
    document.getElementById("title").value = title;
    document.getElementById("author").value = author;
    editId = id;
}

function deleteBook(id) {
    if (confirm("Are you sure you want to delete this book?")) {
        fetch(`${API}/${id}`, { method: "DELETE" })
            .then(() => loadBooks());
    }
}

// Initial load
loadBooks();
