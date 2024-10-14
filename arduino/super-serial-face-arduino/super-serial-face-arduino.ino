const int ledPin = 13;  // Built-in LED on most Arduino boards

void setup() {
  Serial.begin(9600);  // Start serial communication at 9600 baud
  pinMode(ledPin, OUTPUT);  // Set the LED pin as an output
  digitalWrite(ledPin, LOW);  // Initially turn off the LED
}

void loop() {
  if (Serial.available() > 0) {  // Check if data is available to read
    String data = Serial.readStringUntil('\n');  // Read the incoming data until newline
    data.trim();  // Remove any leading/trailing whitespace

    if (data == "true") {
      digitalWrite(ledPin, HIGH);  // Turn on the LED if a face is detected
      Serial.println("Face detected, LED ON");
    } else if (data == "false") {
      digitalWrite(ledPin, LOW);  // Turn off the LED if no face is detected
      Serial.println("No face detected, LED OFF");
    }
  }
}
