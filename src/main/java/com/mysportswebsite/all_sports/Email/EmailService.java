package com.mysportswebsite.all_sports.Email;

import java.util.concurrent.atomic.AtomicLong;
import com.amazonaws.services.dynamodbv2.AmazonDynamoDB;
import com.amazonaws.services.dynamodbv2.model.AttributeValue;
import com.amazonaws.services.dynamodbv2.model.PutItemRequest;
import com.amazonaws.services.dynamodbv2.model.PutItemResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private AmazonDynamoDB dynamoDBClient;

    private final String TABLE_NAME = "users_subscribed";

    // Atomic counter for generating unique numeric IDs
    private static final AtomicLong idCounter = new AtomicLong();

    // Method to generate a unique numeric ID
    private String generateUniqueId() {
        return String.valueOf(idCounter.incrementAndGet()); // Increment and return as a string
    }

    public void saveDetails(String email, String sport) {
        // Generate a unique ID
        String uniqueId = generateUniqueId();

        // Construct the item to be inserted
        Map<String, AttributeValue> item = new HashMap<>();
        item.put("id", new AttributeValue().withN(uniqueId)); // Use .withN() for numbers
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
}
