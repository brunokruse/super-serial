void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ;  // wait for serial port to connect. Needed for native USB port only
  }

  Serial.println("Starting ASCII Matrix Effect");
}

// first visible ASCII character '!' is number 33:
int thisByte = 33;

void loop() {
  // Send the current ASCII character to the serial port
  Serial.write(thisByte);
  
  // Print a new line for clarity
  Serial.println();

  // Increment the character
  thisByte++;

  // Reset to '!' after reaching '~' (126)
  if (thisByte > 126) {
    thisByte = 33;
  }

  // Short delay to control the speed of data sending
  delay(100);  // Adjust this for faster/slower updates
}
