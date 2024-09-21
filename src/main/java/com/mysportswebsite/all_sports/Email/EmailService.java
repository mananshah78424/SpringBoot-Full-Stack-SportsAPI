package com.mysportswebsite.all_sports.Email;

import java.util.*;
import java.util.concurrent.atomic.AtomicLong;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private AmazonDynamoDB dynamoDBClient;

    private final String TABLE_NAME = "users_subscribed";

    // Atomic counter for generating unique numeric IDs
    private static final AtomicLong idCounter = new AtomicLong();

    private String generateUniqueId() {
        return UUID.randomUUID().toString(); // Generate a random UUID
    }

    public void saveDetails(String email, String sport) {
        // Generate a unique ID
        String uniqueId = generateUniqueId();

        // Construct the item to be inserted
        Map<String, AttributeValue> item = new HashMap<>();
        item.put("id", new AttributeValue().withS(uniqueId)); // Use .withN() for numbers
        item.put("email", new AttributeValue().withS(email));
        item.put("sport", new AttributeValue().withS(sport));

        // Create a PutItemRequest with the table name and item
        PutItemRequest putItemRequest = new PutItemRequest()
                .withTableName(TABLE_NAME)
                .withItem(item);

        try {
            // Execute the PutItemRequest
            PutItemResult result = dynamoDBClient.putItem(putItemRequest);
            // Log or handle the result if needed
            System.out.println("Item saved successfully: " + result);
        } catch (Exception e) {
            // Handle the exception or log the error
            System.err.println("Failed to save item: " + e.getMessage());
        }
    }


    // Method to get all users from the table
    public List<Map<String, String>> getAllUsers() {
        List<Map<String, String>> users = new ArrayList<>();

        ScanRequest scanRequest = new ScanRequest().withTableName(TABLE_NAME);

        try {
            ScanResult result = dynamoDBClient.scan(scanRequest);

            for (Map<String, AttributeValue> item : result.getItems()) {
                Map<String, String> user = new HashMap<>();
                user.put("id", item.get("id").getS());
                user.put("email", item.get("email").getS());
                user.put("sport", item.get("sport").getS());
                users.add(user);
            }
            System.out.println("Retrieved users successfully: " + users.size());
        } catch (Exception e) {
            System.err.println("Failed to retrieve users: " + e.getMessage());
        }

        return users;
    }
}
