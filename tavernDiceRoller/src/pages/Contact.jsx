import { Link } from "react-router-dom";
export default function Contact() {
  return (
    <>
      <main className="container ">
        <article className="body1">
          <h3>Feedback</h3>
          <p>
            If you find any issues or have any ideas, feel free to reach out to
            me. I'll get back to you when I can. The easiest is my email, but if
            it is taking too long you an try an instagram dm or a linkedIn
            message.
          </p>
          <hr />
          <div>
            <Link href="https://www.instagram.com/t.c.long?igsh=NjBhY3FjY2F4anI0&utm_source=qr">
              {" "}
              My Instagram
            </Link>
            <hr />
            <Link href="https://www.linkedin.com/in/thomaschristopherlong/">
              {" "}
              My linkedIn
            </Link>
            <hr />
            <h5> My Email</h5>
            <p> thomaschristopherlong@gmail.com </p>
          </div>
        </article>
      </main>
    </>
  );
}
