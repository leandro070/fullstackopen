# Part 0

## Exercise 0.4: new note

Create a similar diagram depicting the situation where the user creates a new note on page https://studies.cs.helsinki.fi/exampleapp/notes when writing something into the text field and clicking the submit button.

If necessary, show operations on the browser or on the server as comments on the diagram.

The diagram does not have to be a sequence diagram. Any sensible way of presenting the events is fine.

All necessary information for doing this, and the next two exercises, can be found from the text of this part. The idea of these exercises is to read the text through once more, and to think through what is going on there. Reading the application code is not necessary, but it is of course possible.

```mermaid
sequenceDiagram
participant B as Browser
participant S as Server

B->>S: [POST] https://studies.cs.helsinki.fi/exampleapp/new_note (form=new+note+content)
activate S

Note over S: The server adds a new note to the "notes" array

S-->>B: [HTTP code] 302 { location: /exampleapp/notes }
deactivate S

Note over B: Browser makes a new HTTP GET request and redirect to the URL defined in "location"

B->>S: [GET] https://studies.cs.helsinki.fi/exampleapp/notes
activate S
S-->>B: [HTTP code] 200 { HTML-code }
deactivate S

B->>S: [GET] https://studies.cs.helsinki.fi/exampleapp/main.css
activate S
S-->>B: [HTTP code] 200 { CSS-code }
deactivate S

B->>S: [GET] https://studies.cs.helsinki.fi/exampleapp/main.js
activate S
S-->>B: [HTTP code] 200 { JS-code }
deactivate S

Note over B: Browser start executing js code that request JSON data from server

B->>S: [GET] https://studies.cs.helsinki.fi/exampleapp/data.json
activate S
S-->>B: [{"content":"test","date":"2022-03-20T23:01:16.481Z"}, ...}]
deactivate S

Note over B: Browser executes the event handler that renders notes to display
```
