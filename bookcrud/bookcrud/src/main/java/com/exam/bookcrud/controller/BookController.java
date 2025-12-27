package com.exam.bookcrud.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.exam.bookcrud.model.Book;
import com.exam.bookcrud.repository.BookRepository;

@RestController
@RequestMapping("/books")
@CrossOrigin("*")
public class BookController {

    private final BookRepository repo;

    public BookController(BookRepository repo) {
        this.repo = repo;
    }

    // CREATE
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return repo.save(book);
    }

    // READ
    @GetMapping
    public List<Book> getBooks() {
        return repo.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        Book existing = repo.findById(id).orElseThrow();
        existing.setTitle(book.getTitle());
        existing.setAuthor(book.getAuthor());
        return repo.save(existing);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted";
    }
}
