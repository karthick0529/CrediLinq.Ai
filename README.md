# Credilinq.ai Assignment - SME Health Check

This application is a replica of Credilinq.ai SME Health Check. The app is built using React.js, Node.js, and MongoDB. It provides a stepper-based form with validation and document upload functionalities.

# Features
The application consists of four steps:

## Section 1: Company Information

Company UEN: Validates against the format 8 digits followed by an alphabet (e.g., 23141543L).
Company Name: String input.

## Section 2: Applicant Information

Email: Validates using standard email validation.
Phone Number: Must pass Singapore’s phone number validation.

## Section 3: Upload Documents

Users can upload a maximum of 6 PDF files.
Displays a success message in green chips for successful uploads or red chips for failed uploads.

## Section 4: Terms & Conditions

Links to Terms and Conditions.
On clicking Submit, redirects the user to a page showing all submitted entries in a table, sorted by the submitted date.
The table displays fields from Sections 1 and 2.

## Tech Stack:
Frontend: React.js
Backend: Node.js
Database: MongoDB

## Deployment Links
Frontend: https://grand-blancmange-57a299.netlify.app/
Backend: https://credilinq-ai.onrender.com
