
# p5js + Arduino serial communication with nodejs
https://github.com/brunokruse/super-serial

Tutorial for downloading and running the p5js <-> Arduino serial communication examples, using nodejs and p5js. Here is what we are building:
![flow](https://github.com/user-attachments/assets/d7c9a283-bd7d-44c5-95de-53fa8c8f2fb4)

<br>

# Download Repository
## 1. Clone Repo with GitHub Desktop
<img width="1173" alt="Screenshot 2024-10-15 at 2 54 17 PM" src="https://github.com/user-attachments/assets/04a8ea30-e249-4dc4-a180-a2bfefd40841">

# Setup Arduino
## 1. Upload code to Arduino
* Navigate to the project folder you just downloaded and select the appropriate arduino file.
* Remember to get your Arduino name from the IDE, this will be important next steps
* Close Arduino when you are finished.
<img width="1188" alt="Screenshot 2024-10-15 at 3 01 18 PM" src="https://github.com/user-attachments/assets/32974a4e-584d-49a8-8d67-f43143ff946f">

## 2. Add your Arduino name to the server.js
<img width="1251" alt="Screenshot 2024-10-15 at 2 45 54 PM" src="https://github.com/user-attachments/assets/25af4e3b-b546-4d25-bc81-4b0990660ea0">

<br>

# Installing and Running 
## 1. npm install
* Navigate to the project folder: cd project-folder
* Install dependencies (once): npm install
* Start the project: npm start
<img width="1446" alt="Screenshot 2024-10-15 at 2 44 51 PM" src="https://github.com/user-attachments/assets/e71098ca-a9e1-4392-a183-1b9e86acda13">

## 2. npm start
* Start the project: npm start
* Use [localhost:3000](http://localhost:3000/) or your assigned IP in your browser
<img width="1083" alt="Screenshot 2024-10-15 at 3 04 03 PM" src="https://github.com/user-attachments/assets/42501281-65a5-451f-b044-3079ff33452e">

* Your server (backend) should now launch handling the data and sending it to your browser (frontend)
* You can stop your server any time with ctrl+c
<img width="1478" alt="Screenshot 2024-10-15 at 3 06 53 PM" src="https://github.com/user-attachments/assets/0553740a-a875-496e-a3a7-b232514ef74a">

<br>
<br>

# Additional Notes
## Check for Arduino communication errors
If you don't see any data comming in check for this error in your console.
* Your arduino name has not been correctly added to serverjs
* Arduino IDE is open causing a conflict with the serial port.
<img width="1076" alt="Screenshot 2024-10-15 at 2 47 30 PM" src="https://github.com/user-attachments/assets/3dc08a09-602b-4a41-b27f-fdca725f55f7">

<br>

## Troubleshooting
* P5js reference is a great place to start: https://p5js.org/reference/
* Always make sure you are in the correct folder before typing ANY commands in terminal:
    * cd: Change directory
    * pwd: Print working directory
    * ls: List contents of current directory
* Read your error messages carefully. They are usually very helpful and point you in the right direction. Getting errors and debugging is part of the programming process.
* Make a drawing, flowchart, or outline before starting your project. Choose whichever method inspires you to be creative in coming up with your logic.
* After planning, try coming up with names for your functions and adding them to your code one by one. Once your code matches your flowchart, you can start to see patterns of flow and where your variables might go.
* If you're having trouble with program flow, scope, and classes, your outline will help you visualize the structure and relationships in your code.

<br>

## Glossary
* Node.js 
  * A JavaScript runtimeallowing JavaScript to run on the server-side.
  * https://nodejs.org/en

* NVM (Node Version Manager)
  * A tool for managing multiple Node.js versions on a single machine.
  * (mac) https://github.com/nvm-sh/nvm?tab=readme-ov-file#about
  * (windows) https://github.com/coreybutler/nvm-windows
    
* NPM (Node Package Manager)
  * The default package manager for Node.js, used for installing and managing project dependencies. 
  * It allows us to use 'npm install' to easily install required libraries and dependencies in one command.
  * https://www.npmjs.com/

* React with p5.js
  * What is it? The practice of using React as a framework to build applications that incorporate p5.js sketches and interactions.
  * https://github.com/P5-wrapper/react
  * Provides a structured approach to building larger applications with creative coding elements
  * Bridges the gap between creative coding and web applications
