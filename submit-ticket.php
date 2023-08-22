<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $data = [
        "name" => $_POST["name"],
        "email" => $_POST["email"],
        "phone" => $_POST["phone"],
        "comment" => $_POST["comment"],
        // ... add more properties based on your form fields
    ];

    $jsonFile = "data.json";

    $jsonData = file_get_contents($jsonFile);
    $tickets = json_decode($jsonData, true);
    $tickets[] = $data;

    $updatedData = json_encode($tickets, JSON_PRETTY_PRINT);

    file_put_contents($jsonFile, $updatedData);

    // Return a response indicating success or any relevant data
    echo json_encode(["message" => "Ticket submitted successfully"]);
} else {
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}
?>