import './Contact.css'; // Importing the CSS file for styling

const Contact = () => { // Functional component Contact
  return (
    <div className="contact"> {/* Container div with class 'contact' */}
      <h2>Contact Us</h2> {/* Heading for the contact section */}
      <p>
        If you have any questions or inquiries, please feel free to reach out to us.
      </p> {/* Paragraph describing the purpose of the contact form */}
      <form> {/* Form for submitting contact information */}
        <label htmlFor="name">Name:</label> {/* Label for the name input */}
        <input type="text" id="name" name="name" placeholder="Your name" required /> {/* Input field for name with placeholder and required attribute */}

        <label htmlFor="email">Email:</label> {/* Label for the email input */}
        <input type="email" id="email" name="email" placeholder="Your email" required /> {/* Input field for email with placeholder and required attribute */}

        <label htmlFor="message">Message:</label> {/* Label for the message textarea */}
        <textarea id="message" name="message" rows="4" placeholder="Your message" required></textarea> {/* Textarea for message with placeholder and required attribute */}

        <button type="submit">Submit</button> {/* Submit button for form submission */}
      </form>
    </div>
  );
};

export default Contact; // Exporting Contact component as default for use in other parts of the application
