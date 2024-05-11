import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../App";

function Footer() {
  const { theme } = useContext(GlobalContext);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const isDarkMode = theme === "dark";

  const style = {
    backgroundColor: isDarkMode ? "#1c1c1c" : "#f8f9fa",
    color: isDarkMode ? "#ffffff" : "#333333",
  };

  const linkStyle = {
    color: isDarkMode ? "#ffffff" : "#333333",
  };

  const borderBottomStyle = {
    borderColor: isDarkMode ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
  };

  const socials = [
    { iconName: "facebook-f", link: "https://www.facebook.com/rei.hajdari.5" },
    { iconName: "twitter", link: "https://twiter.com" },
    { iconName: "google", link: "https://google.com" },
    {
      iconName: "instagram",
      link: "https://www.instagram.com/rei__hajdari/?hl=af",
    },
    {
      iconName: "linkedin",
      link: "https://www.linkedin.com/in/rei-hajdari-74a9bab8/",
    },
    { iconName: "github", link: "https://github.com/reihajdari" },
  ];

  const d = new Date();
  let year = d.getFullYear();

  return (
    <MDBFooter style={style} className={`text-center text-lg-start`}>
      <section
        className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
        style={borderBottomStyle}
      >
        <div className="me-5 d-none d-lg-block">
          <span>Connect with us on social networks:</span>
        </div>

        <div>
          {socials.map((social) => (
            <a
              href={social.link}
              target="blank"
              className="me-4 text-reset"
              key={social.iconName}
            >
              <MDBIcon fab icon={social.iconName} style={linkStyle} />
            </a>
          ))}
        </div>
      </section>

      <section>
        <MDBContainer className="text-center text-md-start mt-5">
          <MDBRow className="mt-3">
            <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">
                <MDBIcon icon="gem" className="me-3" style={linkStyle} />
                Cinema+
              </h6>
              <p>Find the latest movies on our platform.</p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Products</h6>
              <p>
                <a
                  href="https://angular.io/"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Angular
                </a>
              </p>
              <p>
                <a
                  href="https://react.dev/"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  React
                </a>
              </p>
              <p>
                <a
                  href="https://vuejs.org/"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Vue
                </a>
              </p>
              <p>
                <a
                  href="https://laravel.com/"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Laravel
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
              <p>
                <a
                  href="#!"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Pricing
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Settings
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Orders
                </a>
              </p>
              <p>
                <a
                  href="#!"
                  target="blank"
                  className="text-reset"
                  style={linkStyle}
                >
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" style={linkStyle} />
                Tirana, Albania
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" style={linkStyle} />
                reihajdari03@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" style={linkStyle} />
                +355692640063
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div
        className="text-center p-4"
        style={{
          backgroundColor: isDarkMode
            ? "rgba(255, 255, 255, 0.05)"
            : "rgba(0, 0, 0, 0.05)",
        }}
      >
        © {year} Copyright:
        <a className="text-reset fw-bold" href="#!" style={linkStyle}>
          Rei Hajdari - All Rights Reserved
        </a>
      </div>
    </MDBFooter>
  );
}

export default Footer;
