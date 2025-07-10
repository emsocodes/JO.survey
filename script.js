// Replace with the Web App URL you copied from Google Apps Script deployment
const GOOGLE_SHEET_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbw5NkVZJdYyxkuwLSPTcvEdWmbRflIWZloDerLDiDJuoRsTGApPAjN0jvisdP0sHRxiww/exec';

const groupSelect = document.getElementById('groupSelect');
const sections = document.querySelectorAll('.section');
const form = document.getElementById('surveyForm');

groupSelect.addEventListener('change', () => {
  sections.forEach(section => section.style.display = 'none');

  const selectedValue = groupSelect.value;
  if (selectedValue) {
    const selectedSection = document.getElementById(selectedValue);
    selectedSection.style.display = 'block';

    // Scroll smoothly to the section
    selectedSection.scrollIntoView({ behavior: 'smooth' });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = {};

  // Convert FormData to a plain object
  for (let [key, value] of formData.entries()) {
    data[key] = value;
  }

  console.log("Survey Data:", data);

  try {
    const response = await fetch(GOOGLE_SHEET_WEB_APP_URL, {
      method: 'POST',
      mode: 'no-cors', // Required for simple GET/POST from web app without complex CORS
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(), // Send data as URL-encoded form data
    });

    // Since we are using 'no-cors', we cannot directly read the response JSON.
    // We assume success if the fetch operation itself doesn't throw an error.
    // The Apps Script will still write the data.
    console.log("Form submission sent to Google Sheet. Assuming success due to no-cors mode.");
    alert("Thank you! Your survey has been submitted.");

    form.reset();
    sections.forEach(section => section.style.display = 'none');
    groupSelect.value = ''; // reset select
  } catch (error) {
    console.error("Error submitting survey:", error);
    alert("Error submitting survey. Please try again. Check your browser console for details.");
  }
});