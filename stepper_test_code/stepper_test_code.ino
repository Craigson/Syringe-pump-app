const int dirPin = 2;
const int stepPin = 3;
const int m0 = 7;
const int m1 = 6;

void setup(){
  pinMode(dirPin, OUTPUT);
  pinMode(stepPin, OUTPUT);
  pinMode(m0, OUTPUT);
  pinMode(m1, OUTPUT);
  
  //set microstep resolution - m0 and m1 set to low is a full step
  digitalWrite(m0, LOW);
  digitalWrite(m1, LOW);
  
  //set initial direction of rotation
  digitalWrite(dirPin, HIGH);
}


void loop(){
  for (int i = 0; i < 200; i++){
    digitalWrite(stepPin, HIGH);
    delay(0.005);
    digitalWrite(stepPin, LOW);
    delay(0.005);
    delay(10);
  }
  
  delay(2000);
}
