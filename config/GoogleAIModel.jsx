const {
    GoogleGenerativeAI,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  export const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };

  export const chatSession = model.startChat({
      generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "reference to : {\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}\n\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"time\": 1687637186479,\n  \"blocks\": [\n    {\n      \"id\": \"grocery-list-header\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Grocery List\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"list-block\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"Milk\",\n          \"Eggs\",\n          \"Bread\",\n          \"Cheese\"\n        ]\n      }\n    },\n    {\n      \"id\": \"add-item-section\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Add new item:\"\n      }\n    },\n    {\n      \"id\": \"input-field\",\n      \"type\": \"simple-input\",\n      \"data\": {\n        \"placeholder\": \"Enter item...\",\n        \"input\": \"\"\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\n**Explanation:**\n\n- **grocery-list-header:** A level 1 header for the grocery list title.\n- **list-block:** An unordered list to hold the grocery items. It starts with some example items.\n- **add-item-section:** A paragraph to indicate where to add new items.\n- **input-field:** A simple input field (you'd likely use a custom Editor.js plugin for this, but this example uses the \"simple-input\" placeholder) to allow users to type in a new item.\n\n**How to Use:**\n\n1. **Install Editor.js:** Follow the instructions at [https://editorjs.com/](https://editorjs.com/) to set up Editor.js in your project.\n2. **Implement Plugins:**  You'll need to find or create plugins that handle:\n    - **List Editing:**  The `list` block is used, but you'll need a plugin to allow editing items within the list.\n    - **Input Field:**  You'll likely need a custom plugin to create the input field, handle user input, and add new items to the list.\n3. **Integration:** Connect the Editor.js instance to your JSON structure and use the plugins to provide the functionality.\n\n**Important Note:** This template is a starting point. You'll need to develop or find plugins that allow user interaction with the list, handle adding items, and potentially even implement features like:\n\n- **Checkboxes:**  Allow items to be marked as complete.\n- **Quantity/Notes:**  Let users specify how many items they need or add notes.\n- **Sorting/Deleting:**  Allow users to rearrange or remove items from the list.\n"},
          ],
        },
      ],
    });
