# ps-multimedia

## screens

- Show current state
- Apply for multimedia class seat.
- Cancel

## api

- get current state("/", GET) --> {students:[[이름1, 이름2, 이름3, ...],[이름5, 이름6, 이름7, ...]], isAvailable: Boolean}
- apply("/apply", POST) --> studentNumber, period
- cancel("/apply", POST) --> studentNumber
