const formJson1 = {
  "form": {
    "title": "Post Your Ad",
    "fields": [
      {
        "label": "Product Name",
        "type": "text",
        "name": "productName",
        "placeholder": "e.g., Pink shoes",
        "required": true
      },
      {
        "label": "Category",
        "type": "select",
        "name": "category",
        "options": [
          "Fashion",
          "Electronics",
          "Motors",
          "Real Estate"
        ],
        "required": true
      },
      {
        "label": "Price",
        "type": "number",
        "name": "price",
        "placeholder": "e.g., 175",
        "required": false
      },
      {
        "label": "Phone Number",
        "type": "tel",
        "name": "phone",
        "placeholder": "e.g., 123-456-7890",
        "required": false
      },
      {
        "label": "Description",
        "type": "textarea",
        "name": "description",
        "placeholder": "e.g., Kai bicchoba",
        "required": true
      }
    ],
    "submit": {
      "text": "POST NOW",
      "action": "http://your-api-endpoint.com/submit-form",
      "method": "POST"
    },
    "terms": {
      "text": "Agree With Terms And Conditions",
      "required": true
    }
  }
}
;
const formJson2 = {
    "form": {
      "sections": [
        {
          "title": "What Are You Looking For",
          "fields": [
            {
              "type": "radio",
              "name": "lookingFor",
              "options": [
                {
                  "label": "To Suggest My Service",
                  "value": "suggestService",
                  "selected": false
                },
                {
                  "label": "To Find Someone Who Can Help Me",
                  "value": "findHelp",
                  "selected": true
                }
              ],
              "required": true
            }
          ]
        },
        {
          "title": "Choose Niche",
          "fields": [
            {
              "type": "radio",
              "name": "niche",
              "options": [
                {
                  "label": "Start Up(Not in touch with university subj.)",
                  "value": "startup",
                  "selected": false
                },
                {
                  "label": "University Subjects",
                  "value": "universitySubjects",
                  "selected": true
                }
              ],
              "required": true
            }
          ]
        },
        {
          "title": "Advertisement Details",
          "fields": [
            {
              "label": "Title (Service/Needs)",
              "type": "text",
              "name": "title",
              "placeholder": "e.g., Pink shoes",
              "required": true
            },
            {
              "label": "Faculty",
              "type": "select",
              "name": "faculty",
              "options": [
                "Every Faculty",
                "Engineering",
                "Business",
                "Arts",
                "Science"
              ],
              "required": false
            },
            {
              "label": "Category",
              "type": "select",
              "name": "category",
              "options": [
                "Fashion",
                "Electronics",
                "Motors",
                "Real Estate"
              ],
              "required": true
            },
            {
              "label": "Price",
              "type": "number",
              "name": "price",
              "placeholder": "e.g., 175",
              "required": false
            },
            {
              "label": "Phone Number",
              "type": "tel",
              "name": "phone",
              "placeholder": "e.g., 123-456-7890",
              "required": false
            },
            {
              "label": "Description",
              "type": "textarea",
              "name": "description",
              "placeholder": "e.g., Kai bicchoba",
              "required": true
            }
          ]
        }
      ],
      "agreement": {
        "label": "Agree With Terms And Conditions",
        "type": "checkbox",
        "name": "agreeTerms",
        "required": true
      },
      "submit": {
        "text": "POST NOW",
        "action": "http://your-api-endpoint.com/submit-form",
        "method": "POST"
      }
    }
  }
  ;