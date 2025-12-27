package com.exam.bookcrud.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.bookcrud.model.Book;

public interface BookRepository extends JpaRepository<Book, Long> {
}
