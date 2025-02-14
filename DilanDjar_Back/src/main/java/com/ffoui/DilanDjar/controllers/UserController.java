package com.ffoui.DilanDjar.controllers;

import com.ffoui.DilanDjar.daos.UserDao;
import com.ffoui.DilanDjar.entities.User;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserDao userDao;

    public UserController(UserDao userDao) {
        this.userDao = userDao;
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userDao.getAllUsers();
    }

    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return ResponseEntity.ok(userDao.getUserByEmail(email));
    }

    @PostMapping
    public ResponseEntity<String> createUser(@Valid @RequestBody User user) {
        return userDao.createUser(user) ?
                ResponseEntity.ok("User created")
                :
                ResponseEntity.badRequest().body("User not created");
    }

    @PutMapping
    public ResponseEntity<String> updateUser(@Valid @RequestBody User user) {
        return userDao.updateUser(user) ?
                ResponseEntity.ok("User updated")
                :
                ResponseEntity.badRequest().body("User not updated");
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Integer id) {
        return userDao.deleteUser(id) ?
                ResponseEntity.ok("User deleted")
                :
                ResponseEntity.badRequest().body("User not deleted");
    }
}
